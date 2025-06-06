import Property from "@/models/property";
import Room from "@/models/room";
import Tenant from "@/models/tenant";
import Rent from "@/models/rent";
import { RENT_STATUS, PENDING, PAID, CANCELLED } from "@/types/rent";
import Cost from "@/models/cost";
import { COST_TP_MAP } from "@/types/cost";
import { ROOM_TP_MAP } from "@/types/room";
import { PROPERTY_PTYPE_MAP } from "@/types/property";

const getCurrentYearMonth = (date: string | undefined) => {
  if (date) {
    const currentYearMonth = date;
    let [year, month] = date.split("-");
    if (month === "12") {
      month = "01";
      year = String(Number(year) + 1);
    } else {
      const nextMonth = Number(month) + 1;
      month = nextMonth > 9 ? nextMonth.toString() : `0${nextMonth}`;
    }
    const nextYearMonth = year + "-" + month;
    return { currentYearMonth, nextYearMonth };
  } else {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const currentYearMonth = `${year}-${month > 9 ? month : "0" + month}`;

    let nextYearMonth = `${year}-${month + 1 > 9 ? month + 1 : "0" + (month + 1)}`;
    if (month === 12) {
      nextYearMonth = `${year + 1}-01`;
    }
    return { currentYearMonth, nextYearMonth };
  }
};

interface Stats {
  date?: string;
  userId?: string;
  propertyId?: string;
  roomId?: string;
  tenantId?: string;
}

export const getStats = async ({
  date,
  userId,
  propertyId,
  roomId,
  tenantId,
}: Stats) => {
  const { currentYearMonth, nextYearMonth } = getCurrentYearMonth(date);

  const propertiesResults = await Property.find({ user: userId });
  const properties = propertiesResults.map((p) => {
    return {
      _id: p._id,
      name: p.name,
      address: p.address,
      ptype: p.ptype,
      ptypeTxt: PROPERTY_PTYPE_MAP[p.ptype] || p.ptype,
    };
  });

  let curProperty = null;
  if (propertyId) {
    curProperty = properties.find((p) => p._id == propertyId);
  } else if (roomId) {
    const room = await Room.findOne({ _id: roomId });
    propertyId = room?.property.toString();
    curProperty = properties.find((p) => p._id == propertyId);
  } else if (tenantId) {
    const tenant = await Tenant.findOne({ _id: tenantId });
    const room = await Room.findOne({ _id: tenant.room });
    roomId = room?._id.toString();
    propertyId = room?.property.toString();
    curProperty = properties.find((p) => p._id == propertyId);
  }

  const roomsQuery: any = {};
  const costQuery: any = {};
  if (!propertyId) {
    const propertyIds = properties.map((prop: any) => prop._id);
    roomsQuery.property = { $in: propertyIds };
    costQuery.property = { $in: propertyIds };
  } else {
    roomsQuery.property = propertyId;
    costQuery.property = propertyId;
  }

  costQuery.date = { $gte: currentYearMonth, $lt: nextYearMonth };

  const costsResult = await Cost.find(costQuery);
  const costs = costsResult.map((cost) => {
    return {
      _id: cost._id,
      amount: cost.amount,
      date: cost.date,
      tp: cost.tp,
      tpTxt: COST_TP_MAP[cost.tp] || cost.tp,
    };
  });
  const totalCost = costs.reduce((acc, cost) => acc + cost.amount, 0);

  const roomsResult = await Room.find(roomsQuery);
  const roomIds = roomsResult.map((room) => room._id);

  const tenantsResult = await Tenant.find({ room: { $in: roomIds } }).sort({
    startDate: -1,
  });
  
  const currentTenantsMap: { [key: string]: any } = {};
  tenantsResult.forEach((tenant) => {
    if (tenant.isCurrent) {
      currentTenantsMap[tenant.room] = tenant;
    }
  });
  
  const tenantIds = tenantsResult.map((tenant) => tenant._id);
  // let tenants = [];
  // if (roomId) {
  //   tenants = tenantsResult.filter((tenant) => tenant.room == roomId);
  // } else {
  //   tenants = tenantsResult;
  // }

  const rentResult = await Rent.find({
    tenant: { $in: tenantIds },
    startDate: { $gte: currentYearMonth, $lt: nextYearMonth },
  });

  let totalRents = 0;
  let receivedRents = 0;
  let pendingRents = 0;
  const pendingRentTenants: any[] = [];

  const rentsMap: { [key: string]: any } = {};
  rentResult.forEach((rent) => {
    const status = RENT_STATUS[rent.status] || rent.status;
    if (status === PAID) {
      receivedRents += rent.amount;
    } else if (status === PENDING) {
      pendingRents += rent.amount;

      pendingRentTenants.push({
        tenant: currentTenantsMap[rent.room] || null,
        amount: rent.amount,
      });
    }
    totalRents += rent.amount;

    rent.status = status;
    rentsMap[rent.room] = rent;
    
  });

  const rooms = roomsResult.map(({ _id, name, tp, property }) => {
    return {
      _id,
      name,
      tp,
      tenant: currentTenantsMap[_id],
      rent: rentsMap[_id],
      tpTxt: ROOM_TP_MAP[tp] || tp,
      property,
    };
  });

  return {
    date: currentYearMonth,
    properties,
    curProperty,
    rooms,
    costs,
    totalCost,
    totalRents,
    receivedRents,
    pendingRents,
    pendingRentTenants,
  };
};

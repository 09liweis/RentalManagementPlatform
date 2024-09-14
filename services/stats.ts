import Property from "@/models/property";
import Room from "@/models/room";
import Tenant from "@/models/tenant";
import Rent from "@/models/rent";

const getCurrentYearMonth = (date: string | null) => {
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

export const getStats = async ({ date, userId, propertyId }) => {
  const { currentYearMonth, nextYearMonth } = getCurrentYearMonth(date);

  let property;
  const propertyQuery = {};
  if (userId) {
    propertyQuery.user = userId;
    property = await Property.find(propertyQuery);
  } else {
    propertyQuery._id = propertyId;
    property = await Property.findOne(propertyQuery);
  }

  const roomsQuery = {};
  if (userId) {
    const propertyIds = property.map((prop) => prop._id);
    roomsQuery.property = { $in: propertyIds };
  } else {
    roomsQuery.property = propertyId;
  }

  const rooms = await Room.find(roomsQuery);
  const roomIds = rooms.map((room) => room._id);
  const tenants = await Tenant.find({ room: { $in: roomIds } });
  const tenantIds = tenants.map((tenant) => tenant._id);
  const rents = await Rent.find({
    tenant: { $in: tenantIds },
    startDate: { $gte: currentYearMonth, $lt: nextYearMonth },
  });

  let totalRents = 0;
  let receivedRents = 0;
  let pendingRents = 0;
  rents.forEach((rent) => {
    if (rent.status === "paid") {
      receivedRents += rent.amount;
    } else if (rent.status === "pending") {
      pendingRents += rent.amount;
    }
    totalRents += rent.amount;
  });

  return { property, rooms, rents, totalRents, receivedRents, pendingRents };
};

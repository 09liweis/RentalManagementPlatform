import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/jwt";
import Property from "@/models/property";
import Room from "@/models/room";
import Tenant from "@/models/tenant";
import Rent from "@/models/rent";
import { RENT_STATUS } from "@/types/rent";
import connect from "@/config/db";
import { getStats } from "@/services/stats";
import { ROOM_TP_MAP } from "@/types/room";
import { PROPERTY_PTYPE_MAP } from "@/types/property";
import { updateTenantRents } from "@/services/rents";

interface ParamsProps {
  params: Promise<{
    tenantId: string;
  }>;
}

export async function GET(request: NextRequest, props: ParamsProps) {
  const params = await props.params;
  const { tenantId } = params;

  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  try {
    await connect();
    let rents = [];
    const rentsResult = await Rent.find({ tenant: tenantId }).sort({
      startDate: -1,
    });

    rents = rentsResult.map((rent) => {
      return {
        _id:rent._id,
        amount:rent.amount,
        startDate:rent.startDate,
        status:rent.status,
        statusTxt:RENT_STATUS[rent.status] || rent.status
      }
    });

    const tenant = await Tenant.findOne({ _id: tenantId });
    let room = await Room.findOne({ _id: tenant.room });
    room = room.toObject();
    room.tpTxt = ROOM_TP_MAP[room.tp];

    let property = await Property.findOne({ _id: room.property });
    property = property.toObject();
    property.ptypeTxt = PROPERTY_PTYPE_MAP[property.ptype] || property.ptype;

    return NextResponse.json(
      {rents, curTenant:tenant, curRoom: room, curProperty: property},
      { status: 200 },
    );
  } catch (err:any) {
    return NextResponse.json({ err:err.toString() }, { status: 500 });
  }
}

export async function POST(request: NextRequest, props: ParamsProps) {
  const params = await props.params;
  const { tenantId } = params;

  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  try {
    await connect();
    const { amount, startDate, status } = await request.json();
    const tenant = await Tenant.findOne({ _id: tenantId });
    const newRent = new Rent({
      amount,
      startDate,
      status,
      tenant: tenantId,
      room: tenant.room,
    });
    await newRent.save();
    await updateTenantRents(tenantId);
    return NextResponse.json({ msg: "added" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

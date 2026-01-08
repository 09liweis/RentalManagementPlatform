import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/jwt";
import Room from "@/models/room";
import Tenant from "@/models/tenant";
import Rent from "@/models/rent";
import connect from "@/config/db";

interface ParamsProps {
  params: Promise<{
    roomId: string;
  }>;
}

export async function GET(request: NextRequest, props: ParamsProps) {
  const params = await props.params;
  const { roomId } = params;
  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }
  try {
    await connect();
    const room = await Room.findOne({ _id: roomId });
    return NextResponse.json({ room }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, props: ParamsProps) {
  const params = await props.params;
  const { roomId } = params;
  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  try {
    await connect();
    const {name,tp} = await request.json();
    const room = await Room.findOne({ _id: roomId });
    room.name = name;
    room.tp = tp;
    await room.save();
    return NextResponse.json({ msg: "updated" }, { status: 200});
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, props: ParamsProps) {
  const params = await props.params;
  const { roomId } = params;
  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  try {
    await connect();

    // Find all tenants in this room
    const tenants = await Tenant.find({ room: roomId });

    // Delete all rents associated with each tenant
    for (const tenant of tenants) {
      await Rent.deleteMany({ tenant: tenant._id });
    }

    // Delete all tenants in this room
    await Tenant.deleteMany({ room: roomId });

    // Delete the room
    await Room.deleteOne({ _id: roomId });

    return NextResponse.json({ msg: "Room, tenants, and associated rents deleted successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

import Room from "@/models/room";
import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/jwt";

interface ParamsProps {
  params: {
    propertyId: string;
  };
}

export async function GET(request: NextRequest, { params }: ParamsProps) {
  try {
    const { propertyId } = params;
    
    const verified = decodeToken(request);
    if (!verified) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }

    const rooms = await Room.find({ property: propertyId });
    
    return NextResponse.json({ rooms }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: ParamsProps) {
  const { propertyId } = params;

  const verified = decodeToken(request);

  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  const { name } = await request.json();
  const newRoom = new Room({ name, property: propertyId });
  await newRoom.save();

  return NextResponse.json({ msg: "added" }, { status: 200 });
}

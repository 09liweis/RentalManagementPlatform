import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/jwt";
import Room from "@/models/room";

interface ParamsProps {
  params: {
    roomId: string;
  };
}

export async function GET(request: NextRequest, { params }: ParamsProps) {
  const { roomId } = params;
  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }
  try {
    const room = await Room.findOne({ _id: roomId });
    return NextResponse.json({ room }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

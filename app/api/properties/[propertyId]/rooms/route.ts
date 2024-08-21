import Room from "@/models/room";
import { NextRequest, NextResponse } from "next/server";

interface ParamsProps {
  params: {
    propertyId: string;
  };
}

export async function GET(request: NextRequest, { params }: ParamsProps) {
  try {
    const { propertyId } = params;
    const rooms = Room.find({ property: propertyId });
    return NextResponse.json({ rooms }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: ParamsProps) {
  const { propertyId } = params;

  return NextResponse.json({ msg: "added" }, { status: 200 });
}

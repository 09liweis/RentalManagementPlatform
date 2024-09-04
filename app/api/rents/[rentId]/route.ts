import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/jwt";
import Property from "@/models/property";
import Room from "@/models/room";
import Tenant from "@/models/tenant";
import Rent from "@/models/rent";

interface ParamsProps {
  params: {
    rentId: string;
  };
}

export async function GET(request: NextRequest, { params }: ParamsProps) {
  const { rentId } = params;

  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  try {
    
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: ParamsProps) {
  const { rentId } = params;

  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  try {
    const { amount, startDate } = await request.json();
    
    return NextResponse.json({ msg: "added" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: ParamsProps) {
  const {rentId} = params;

  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  if (!rentId) {
    return NextResponse.json({ err: "Rent Id is required" }, { status: 400 });
  }

  try {
    const foundRent = await Rent.findOne({ _id: rentId });
    if (!foundRent) {
      return NextResponse.json({ err: "Rent not found" }, { status: 404 });
    }

    await Rent.deleteOne({ _id: rentId });
    return NextResponse.json({ msg: "deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
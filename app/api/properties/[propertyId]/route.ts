import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/jwt";
import Property from "@/models/property";

interface ParamsProps {
  params: {
    propertyId: string;
  };
}

export async function GET(request: NextRequest, { params }: ParamsProps) {
  const { propertyId } = params;
  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }
  try {
    const property = await Property.findOne({ _id: propertyId });
    return NextResponse.json({ property }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: ParamsProps) {
  const { propertyId } = params;
  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  try {
    const {name} = await request.json();
    const property = await Property.findOne({ _id: propertyId });
    property.name = name;
    await property.save();
    return NextResponse.json({ msg: "updated" }, { status: 200});
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

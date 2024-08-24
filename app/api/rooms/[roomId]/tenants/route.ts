import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/jwt";
import Tenant from "@/models/tenant";

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
    const tenants = await Tenant.find({ room: roomId });
    return NextResponse.json({ tenants }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: ParamsProps) {
  const { roomId } = params;

  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  try {
    const { name } = await request.json();
    const newTenant = new Tenant({ name, room: roomId });
    await newTenant.save();
    return NextResponse.json({ msg: "added" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

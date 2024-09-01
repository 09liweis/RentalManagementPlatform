import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import Property from "@/models/property";
import { decodeToken } from "@/utils/jwt";

export async function GET(request: NextRequest) {
  try {
    const verified = decodeToken(request);

    if (!verified) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }

    const properties = await Property.find({ user: verified.userId });
    return NextResponse.json({ properties }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const verified = decodeToken(request);
    if (!verified) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }

    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ err: "Property name is required" }, { status: 400 })
    }

    const newProperty = new Property({ name, user: verified.userId });
    await newProperty.save();
    return NextResponse.json({ msg: "added" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { name, _id } = await request.json();

    const verified = decodeToken(request);
    if (!verified) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }

    await Property.updateOne({ _id }, { name, user: verified.userId });
    return NextResponse.json({ msg: "updated" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { _id } = await request.json();

    const verified = decodeToken(request);
    if (!verified) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }

    await Property.deleteOne({ _id, user: verified.userId });
    return NextResponse.json({ msg: "deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

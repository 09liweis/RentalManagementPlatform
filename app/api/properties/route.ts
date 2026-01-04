import { NextRequest, NextResponse } from "next/server";
import Property from "@/models/property";
import User from "@/models/user";
import { decodeToken } from "@/utils/jwt";
import connect from "@/config/db";

export async function GET(request: NextRequest) {
  try {
    const verified = decodeToken(request);

    if (!verified) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }

    await connect();

    const properties = await Property.find({ user: verified.userId });
    return NextResponse.json({ properties }, { status: 200 });
  } catch (err) {
    console.error(err);
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
    if (!name?.trim()) {
      return NextResponse.json(
        { err: "Property name is required" },
        { status: 400 },
      );
    }

    await connect();

    // Check user's plan and property count
    const user = await User.findById(verified.userId);
    if (user.plan === 'free') {
      const propertyCount = await Property.countDocuments({ user: verified.userId });
      if (propertyCount >= 1) {
        return NextResponse.json(
          { err: "Free plan users can only have one property. Upgrade to add more." },
          { status: 403 }
        );
      }
    }

    const newProperty = new Property({ name, user: verified.userId });
    await newProperty.save();
    return NextResponse.json({ msg: "added", property: newProperty }, { status: 200 });
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

    await connect();

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

    await connect();

    await Property.deleteOne({ _id, user: verified.userId });
    return NextResponse.json({ msg: "deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
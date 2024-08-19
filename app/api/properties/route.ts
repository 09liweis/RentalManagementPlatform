import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import Property from "@/models/property";

export async function GET(request: NextRequest) {
  try {
    const headersList = headers();
    const authorization = headersList.get("Authorization");
    const authToken = authorization?.split(" ")[1];
    if (!authToken) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }
    const tokenSecret = process.env.TOKEN_SECRET!;
    const decoded = jwt.verify(authToken, tokenSecret) as { userId: string };

    const properties = await Property.find({});
    return NextResponse.json({ properties }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, token } = await request.json();
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      userId: string;
    };
    const newProperty = new Property({ name, user: decoded.userId });
    await newProperty.save();
    return NextResponse.json({ msg: "added" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { name, token, _id } = await request.json();
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      userId: string;
    };
    await Property.updateOne({ _id }, { name, user: decoded.userId });
    return NextResponse.json({ msg: "updated" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { _id } = await request.json();

    const headersList = headers();
    const authorization = headersList.get("Authorization");
    const authToken = authorization?.split(" ")[1];
    if (!authToken) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }
    const tokenSecret = process.env.TOKEN_SECRET!;
    const decoded = jwt.verify(authToken, tokenSecret) as { userId: string };

    await Property.deleteOne({ _id, user: decoded.userId });
    return NextResponse.json({ msg: "deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

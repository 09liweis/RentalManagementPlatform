import { NextRequest, NextResponse } from "next/server";
import Property from "@/models/property";

export async function GET(request: NextRequest) {
  try {
    // const reqBody = await request.json();
    const properties = await Property.find({});
    return NextResponse.json({properties}, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const {name} = await request.json();
    const newProperty = new Property({name});
    await newProperty.save();
    return NextResponse.json({msg:"added"}, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
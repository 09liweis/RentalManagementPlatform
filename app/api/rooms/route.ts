import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/jwt";
import Room from "@/models/room";
import Property from "@/models/property";
import connect from "@/config/db";


export async function GET(request: NextRequest) {
  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }
  try {
    await connect();
    const properties = await Property.find({user: verified.userId});
    const propertyMap:{[key:string]:any} = {};
    properties.forEach(property => {
      propertyMap[property._id] = property;
    });

    const roomsResult = await Room.find();
    const rooms = roomsResult.map(({_id,name,tp,property})=> {
      return {
        _id,name,tp,property: propertyMap[property]
      }
    });
    return NextResponse.json({ rooms }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

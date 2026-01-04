import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/jwt";
import connect from "@/config/db";
import Property from "@/models/property";
import Room from "@/models/room";
import Tenant from "@/models/tenant";
import { PROPERTY_PTYPE_MAP } from "@/types/property";
import { ROOM_TP_MAP } from "@/types/room";

export async function GET(request: NextRequest) {
  try {
    const verified = decodeToken(request);
    if (!verified) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const limit = parseInt(searchParams.get("limit") || "20");

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { err: "Search query must be at least 2 characters" },
        { status: 400 },
      );
    }

    await connect();

    const searchRegex = new RegExp(query.trim(), "i"); // Case-insensitive search
    const results: any[] = [];

    // Search Properties
    const properties = await Property.find({
      user: verified.userId,
      $or: [
        { name: { $regex: searchRegex } },
        { address: { $regex: searchRegex } },
      ],
    }).limit(Math.ceil(limit / 3));

    properties.forEach((property) => {
      results.push({
        id: property._id.toString(),
        title: property.name,
        subtitle: property.address || "No address",
        type: "property",
        href: `/dashboard/properties/${property._id}`,
        metadata: {
          ptype: property.ptype,
          ptypeTxt: PROPERTY_PTYPE_MAP[property.ptype] || property.ptype,
        },
      });
    });

    // Search Rooms
    const propertyIds = await Property.find({ user: verified.userId }).distinct(
      "_id",
    );

    const rooms = await Room.find({
      property: { $in: propertyIds },
      name: { $regex: searchRegex },
    })
      .populate("property", "name address")
      .limit(Math.ceil(limit / 3));

    rooms.forEach((room: any) => {
      results.push({
        id: room._id.toString(),
        title: room.name,
        subtitle: `${room.property?.name || "Unknown Property"} - ${
          ROOM_TP_MAP[room.tp] || "Room"
        }`,
        type: "room",
        href: `/dashboard/rooms/${room._id}`,
        metadata: {
          tp: room.tp,
          tpTxt: ROOM_TP_MAP[room.tp] || room.tp,
          propertyName: room.property?.name,
        },
      });
    });

    // Search Tenants
    const roomIds = await Room.find({
      property: { $in: propertyIds },
    }).distinct("_id");

    const tenants = await Tenant.find({
      landlord: verified.userId,
      room: { $in: roomIds },
      name: { $regex: searchRegex },
    })
      .populate({
        path: "room",
        populate: {
          path: "property",
          select: "name",
        },
      })
      .limit(Math.ceil(limit / 3));

    tenants.forEach((tenant: any) => {
      results.push({
        id: tenant._id.toString(),
        title: tenant.name,
        subtitle: `${tenant.room?.property?.name || "Unknown Property"} - $${
          tenant.deposit || 0
        } deposit`,
        type: "tenant",
        href: `/dashboard/tenants/${tenant._id}`,
        metadata: {
          deposit: tenant.deposit,
          startDate: tenant.startDate,
          endDate: tenant.endDate,
          isCurrent: tenant.isCurrent,
          roomName: tenant.room?.name,
          propertyName: tenant.room?.property?.name,
        },
      });
    });

    // Sort results by relevance (exact matches first, then partial matches)
    const sortedResults = results.sort((a, b) => {
      const queryLower = query.toLowerCase();
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();

      // Exact matches first
      if (aTitle === queryLower && bTitle !== queryLower) return -1;
      if (bTitle === queryLower && aTitle !== queryLower) return 1;

      // Starts with query
      if (aTitle.startsWith(queryLower) && !bTitle.startsWith(queryLower))
        return -1;
      if (bTitle.startsWith(queryLower) && !aTitle.startsWith(queryLower))
        return 1;

      // Alphabetical order
      return aTitle.localeCompare(bTitle);
    });

    // Limit total results
    const limitedResults = sortedResults.slice(0, limit);

    return NextResponse.json(
      {
        results: limitedResults,
        total: limitedResults.length,
        query: query.trim(),
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json({ err: "Internal server error" }, { status: 500 });
  }
}

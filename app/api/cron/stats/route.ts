import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import User from "@/models/user";
import Property from "@/models/property";
import Room from "@/models/room";
import Tenant from "@/models/tenant";
import Rent from "@/models/rent";
import { updateTenantRents } from "@/services/rents";

export async function GET() {
  try {
    await dbConnect();

    const tenants = await Tenant.find();
    tenants.forEach(async (tenant)=>{
      await updateTenantRents(tenant._id.toString());
    });
    return NextResponse.json({tenants});

  } catch (err: any) {
    return NextResponse.json({});
  }
}
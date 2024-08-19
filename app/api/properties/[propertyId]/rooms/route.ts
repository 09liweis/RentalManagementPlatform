import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { propertyId: string } },
) {
  const { propertyId } = params;

  return NextResponse.json({ propertyId }, { status: 200 });
}

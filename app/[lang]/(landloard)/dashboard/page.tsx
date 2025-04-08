"use client";

import { useEffect, useState } from "react";
import Map from "@/components/common/Map";
import RentCards from "@/components/dashboard/RentCards";
import Properties from "@/components/dashboard/Properties";

export default function Dashboard() {
  return (
    <>
      <h1 className="page-title">Dashboard</h1>

      <RentCards propertyId={""} />

      <Properties />
      {/* <Map /> */}
    </>
  );
}

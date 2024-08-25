"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Map from "@/components/common/Map";

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>

      <section className="flex gap-5 flex-wrap">
        <article className="shadow p-2 w-full sm:w-1/2 md:w-1/4 lg:1/5">
          <p>2 Properties</p>
          <p>8 Rooms</p>
          <p>7 Tenants</p>
        </article>
        <article className="shadow p-2 w-full sm:w-1/2 md:w-1/4 lg:1/5">
          <h3>Total Profit</h3>
          <p>$500</p>
        </article>
        <article className="shadow p-2 w-full sm:w-1/2 md:w-1/4 lg:1/5">
          <h3>Rent received</h3>
          <p>$3000</p>
        </article>
        <article className="shadow p-2 w-full sm:w-1/2 md:w-1/4 lg:1/5">
          <h3>Overdue rent</h3>
          <p>$300</p>
        </article>
        <article className="shadow p-2 w-full sm:w-1/2 md:w-1/4 lg:1/5">
          <h3>Utility Cost</h3>
          <p>$700</p>
        </article>
      </section>
      <Map />
    </>
  );
}

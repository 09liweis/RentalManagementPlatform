"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Map from "@/components/common/Map";

export default function Dashboard() {
  return (
    <>
      <h1 className="page-title">Dashboard</h1>

      <section className="card-container">
        <article className="card">
          <p>2 Properties</p>
          <p>8 Rooms</p>
          <p>7 Tenants</p>
        </article>
        <article className="card">
          <h3>Total Profit</h3>
          <p>$500</p>
        </article>
        <article className="card">
          <h3>Rent received</h3>
          <p>$3000</p>
        </article>
        <article className="card">
          <h3>Overdue rent</h3>
          <p>$300</p>
        </article>
        <article className="card">
          <h3>Utility Cost</h3>
          <p>$700</p>
        </article>
      </section>
      <Map />
    </>
  );
}

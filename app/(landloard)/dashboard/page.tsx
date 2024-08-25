"use client";

import { useEffect, useState } from "react";
import PropertyForm from "@/components/property/propertyForm";
import Link from "next/link";
import Map from "@/components/common/Map";

interface Property {
  _id?: string;
  name: string;
}

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showPropertyForm, setShowPropertyForm] = useState(false);

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/properties", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      });
      const { properties, err } = await response.json();
      if (properties) {
        setProperties(properties);
      } else {
        //TODO:handle err
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchProperties();
  }, []);
  return (
    <>
      <h1>Dashboard</h1>
      {showPropertyForm && (
        <PropertyForm showPropertyForm={setShowPropertyForm} />
      )}
      <a onClick={() => setShowPropertyForm(true)}>Add Property</a>
      {properties.map((p) => (
        <Link href={`/dashboard/properties/${p._id}`} key={p.name}>
          {p.name}
        </Link>
      ))}

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

"use client";
import { useEffect, useState } from "react";
import PropertyForm from "@/components/property/propertyForm";
import Link from "next/link";

interface Property {
  _id?: string;
  name: string;
}

export default function PropertiesPage() {
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
      <h1>Properties</h1>
      {showPropertyForm && (
        <PropertyForm showPropertyForm={setShowPropertyForm} />
      )}
      <a onClick={() => setShowPropertyForm(true)}>Add Property</a>
      {properties.map((p) => (
        <Link href={`/dashboard/properties/${p._id}`} key={p.name}>
          {p.name}
        </Link>
      ))}
    </>
  );
}

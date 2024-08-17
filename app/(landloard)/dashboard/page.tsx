"use client";

import { useEffect, useState } from "react";
import PropertyForm from "@/components/property/propertyForm";

interface Property {
  name: string;
}

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showPropertyForm, setShowPropertyForm] = useState(false);

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/properties");
      const jsonResponse = await response.json();
      setProperties(jsonResponse.properties);
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
        <p key={p.name}>{p.name}</p>
      ))}
    </>
  );
}

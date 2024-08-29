"use client";
import { useEffect, useState } from "react";
import PropertyForm from "@/components/property/propertyForm";
import Link from "next/link";
import { Property } from "@/types/property";
import { fetchData } from "@/utils/http";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showPropertyForm, setShowPropertyForm] = useState(false);

  const fetchProperties = async () => {
    try {
      const { properties, err } = await fetchData({url:'/api/properties'});
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
      <h1 className="page-title">Properties</h1>
      {showPropertyForm && (
        <PropertyForm showPropertyForm={setShowPropertyForm} />
      )}
      <a onClick={() => setShowPropertyForm(true)}>Add Property</a>
      <section className="card-container">
        {properties.map((p) => (
          <Link className="card" href={`/dashboard/properties/${p._id}`} key={p.name}>
            {p.name}
          </Link>
        ))}
      </section>
    </>
  );
}

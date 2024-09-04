"use client";
import { useEffect, useState } from "react";
import PropertyForm from "@/components/property/propertyForm";
import Link from "next/link";
import { Property } from "@/types/property";
import { fetchData } from "@/utils/http";
import LoadingSection from "@/components/common/LoadingSection";
import { showToast } from "@/components/common/Toast";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const { properties, err } = await fetchData({ url: "/api/properties" });
      if (properties) {
        setProperties(properties);
      } else {
        showToast(err.toString());
      }
    } catch (err) {
      
    }
    setLoading(false);
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
      <LoadingSection loading={loading}>
        <section className="card-container">
          {properties.map((p) => (
            <Link
              className="card"
              href={`/dashboard/properties/${p._id}`}
              key={p.name}
            >
              {p.name}
            </Link>
          ))}
        </section>
      </LoadingSection>
    </>
  );
}

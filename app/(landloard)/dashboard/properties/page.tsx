"use client";
import { useEffect, useState } from "react";
import PropertyForm from "@/components/property/propertyForm";
import Link from "next/link";
import LoadingSection from "@/components/common/LoadingSection";
import usePropertyStore from "@/stores/propertyStore";

export default function PropertiesPage() {
  const {properties,propertiesFetched,fetchProperties} = usePropertyStore();
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPropertiesAsync = async () => {
    setLoading(true);
    await fetchProperties()
    setLoading(false);
  };

  useEffect(() => {
    if (!propertiesFetched) {
      fetchPropertiesAsync();
    }
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

"use client";
import { useEffect, useState } from "react";
import PropertyForm from "@/components/property/propertyForm";
import Link from "next/link";
import LoadingSection from "@/components/common/LoadingSection";
import usePropertyStore from "@/stores/propertyStore";
import { EMPTY_PROPERTY, Property } from "@/types/property";
import Button from "@/components/common/Button";

export default function PropertiesPage() {
  const { properties, propertiesFetched, fetchProperties } = usePropertyStore();
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPropertiesAsync = async () => {
    setLoading(true);
    await fetchProperties();
    setLoading(false);
  };

  useEffect(() => {
    if (!propertiesFetched) {
      fetchPropertiesAsync();
    }
  }, []);

  const [property, setProperty] = useState<Property>(EMPTY_PROPERTY);
  const handlePropertyEdit = (property: any) => {
    setProperty(property);
    setShowPropertyForm(true);
  };

  return (
    <>
      <h1 className="page-title">Properties</h1>
      {showPropertyForm && (
        <PropertyForm
          property={property}
          showPropertyForm={setShowPropertyForm}
        />
      )}
      <LoadingSection loading={loading}>
        <section className="card-container">
          {properties.map((p) => (
            <article key={p._id} className="card">
              <div className="flex justify-between items-center">
                <Link className="property-name" href={`/dashboard/properties/${p._id}`}>{p.name}</Link>
                <Button handleClick={() => handlePropertyEdit(p)} tl="edit"/>                
              </div>
            </article>
          ))}
        </section>
      </LoadingSection>

      <Button tl={"Add New"} handleClick={() => setShowPropertyForm(true)} />
    </>
  );
}

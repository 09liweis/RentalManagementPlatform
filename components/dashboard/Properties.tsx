"use client";
import { useEffect, useState } from "react";
import PropertyForm from "@/components/property/propertyForm";
import LoadingSection from "@/components/common/LoadingSection";
import usePropertyStore from "@/stores/propertyStore";
import { EMPTY_PROPERTY, Property } from "@/types/property";
import Button from "@/components/common/Button";
import useAppStore from "@/stores/appStore";
import PropertyCard from "../property/PropertyCard";

export default function Properties() {
  const {t} = useAppStore();
  const { properties } = usePropertyStore();
  const [showPropertyForm, setShowPropertyForm] = useState(false);

  const [property, setProperty] = useState<Property>(EMPTY_PROPERTY);
  const handlePropertyEdit = (property: any) => {
    setProperty(property);
    setShowPropertyForm(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mt-5 mb-3">
        <h1 className="page-title">Properties</h1>
        <Button tl={t('dashboard.AddNew')} handleClick={() => setShowPropertyForm(true)} />
      </div>
      {showPropertyForm && (
        <PropertyForm
          property={property}
          showPropertyForm={setShowPropertyForm}
        />
      )}
      <LoadingSection loading={false}>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((p) => (
            <PropertyCard p={p} key={p._id} handlePropertyEdit={handlePropertyEdit} />
          ))}
        </section>
      </LoadingSection>
    </>
  );
}

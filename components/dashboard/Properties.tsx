"use client";
import { useEffect, useState } from "react";
import PropertyForm from "@/components/property/propertyForm";
import LoadingSection from "@/components/common/LoadingSection";
import usePropertyStore from "@/stores/propertyStore";
import { EMPTY_PROPERTY, Property } from "@/types/property";
import Button from "@/components/common/Button";
import useAppStore from "@/stores/appStore";
import PropertyCard from "../property/PropertyCard";
import LinkText from "../common/LinkText";

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
      <div className="flex justify-between items-center mt-8 pt-4 mb-4 border-t-4 border-sky-800">
        <LinkText text="Properties" href="/dashboard" className="page-title" />
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

"use client";
import { useEffect, useState } from "react";
import PropertyForm from "@/components/property/propertyForm";
import Link from "next/link";
import LoadingSection from "@/components/common/LoadingSection";
import usePropertyStore from "@/stores/propertyStore";
import { EMPTY_PROPERTY, Property } from "@/types/property";
import Button from "@/components/common/Button";
import useAppStore from "@/stores/appStore";
import LinkText from "@/components/common/LinkText";

export default function PropertiesPage() {
  const {t} = useAppStore();
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
      <div className="flex justify-between">
        <h1 className="page-title">Properties</h1>
        <Button tl={t('dashboard.AddNew')} handleClick={() => setShowPropertyForm(true)} />
      </div>
      {showPropertyForm && (
        <PropertyForm
          property={property}
          showPropertyForm={setShowPropertyForm}
        />
      )}
      <LoadingSection loading={loading}>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((p) => (
            <article key={p._id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <LinkText className="text-lg font-semibold text-gray-800" href={`/dashboard/properties/${p._id}`} text={p.name} />
                <div>
                  <Button handleClick={() => handlePropertyEdit(p)} tl={t('dashboard.Edit')} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">{p.address}</p>
              </div>
            </article>
          ))}
        </section>
      </LoadingSection>
    </>
  );
}

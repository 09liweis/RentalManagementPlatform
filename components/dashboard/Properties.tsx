"use client";
import { useState } from "react";
import PropertyForm from "@/components/property/propertyForm";
import usePropertyStore from "@/stores/propertyStore";
import { EMPTY_PROPERTY, Property } from "@/types/property";
import Button from "@/components/common/Button";
import useAppStore from "@/stores/appStore";
import { motion } from "framer-motion";
import PropertiesEmptyState from "./PropertiesEmptyState";
import PropertiesTable from "./PropertiesTable";
import PropertiesMobileList from "./PropertiesMobileList";

export default function Properties() {
  const { t } = useAppStore();
  const { properties, curProperty } = usePropertyStore();
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [property, setProperty] = useState<Property>(EMPTY_PROPERTY);

  const handlePropertyEdit = (property: Property) => {
    setProperty(property);
    setShowPropertyForm(true);
  };

  const handleAddProperty = () => {
    setProperty(EMPTY_PROPERTY);
    setShowPropertyForm(true);
  };

  const isSelected = (p: Property) => curProperty?._id === p._id;
  const hasSelection = !!curProperty?._id;

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="pb-8">
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pt-6 pb-4 border-b border-gray-200"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Properties</h1>
          <p className="text-gray-500 mt-1">
            {properties.length} {properties.length === 1 ? "property" : "properties"} listed
          </p>
        </div>
        <Button className="whitespace-nowrap" onClick={handleAddProperty}>
          {t("dashboard.AddNew")}
        </Button>
      </motion.div>

      {showPropertyForm && (
        <PropertyForm property={property} showPropertyForm={setShowPropertyForm} />
      )}

      {properties.length === 0 ? (
        <PropertiesEmptyState onAddProperty={handleAddProperty} />
      ) : (
        <>
          <PropertiesTable
            properties={properties}
            isSelected={isSelected}
            hasSelection={hasSelection}
            onEdit={handlePropertyEdit}
            editLabel={t("dashboard.Edit")}
          />
          <PropertiesMobileList
            properties={properties}
            isSelected={isSelected}
            hasSelection={hasSelection}
            onEdit={handlePropertyEdit}
            editLabel={t("dashboard.Edit")}
          />
        </>
      )}
    </div>
  );
}
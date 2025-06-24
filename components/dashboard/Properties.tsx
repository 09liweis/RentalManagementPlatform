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
import { motion, AnimatePresence } from "framer-motion";

export default function Properties() {
  const { t } = useAppStore();
  const { properties } = usePropertyStore();
  const [showPropertyForm, setShowPropertyForm] = useState(false);

  const [property, setProperty] = useState<Property>(EMPTY_PROPERTY);
  const handlePropertyEdit = (property: any) => {
    setProperty(property);
    setShowPropertyForm(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // 子元素之间的延迟
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, height: 0, overflow: "hidden" },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <motion.div
        className="flex justify-between items-center mt-8 pt-4 mb-4 border-t-4 border-sky-800"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <LinkText text="Properties" href="/dashboard" className="page-title" />
        <Button
          onClick={() => setShowPropertyForm(true)}
        >
          {t("dashboard.AddNew")}
        </Button>
      </motion.div>

      {showPropertyForm && (
        <PropertyForm
          property={property}
          showPropertyForm={setShowPropertyForm}
        />
      )}

      <LoadingSection loading={false}>
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {properties.map((p, index) => (
            <PropertyCard
              p={p}
              key={p._id}
              handlePropertyEdit={handlePropertyEdit}
            />
          ))}
        </motion.section>
      </LoadingSection>
    </>
  );
}
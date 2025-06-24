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
import useUserStore from "@/stores/userStore";
import { showToast } from "../common/Toast";

export default function Properties() {
  const { t } = useAppStore();
  const { loginUser} = useUserStore();
  const { properties } = usePropertyStore();
  const [showPropertyForm, setShowPropertyForm] = useState(false);

  const [property, setProperty] = useState<Property>(EMPTY_PROPERTY);
  const handlePropertyEdit = (property: Property) => {
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
    <div className="pb-8">
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pt-6 pb-4 border-b border-gray-200"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Properties</h1>
          <p className="text-gray-500 mt-1">
            {properties.length} {properties.length === 1 ? 'property' : 'properties'} listed
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search properties..."
            className="px-4 py-2 border rounded-lg flex-1 sm:w-64"
          />
          <Button
            className="whitespace-nowrap"
            onClick={() => {
              if (loginUser?.plan === 'free' && properties.length >= 1) {
                showToast("Free plan users can only have one property. Upgrade to add more.");
              } else {
                setShowPropertyForm(true);
              }
            }}
          >
            {t("dashboard.AddNew")}
          </Button>
        </div>
      </motion.div>

      {showPropertyForm && (
        <PropertyForm
          property={property}
          showPropertyForm={setShowPropertyForm}
        />
      )}

      <LoadingSection loading={false}>
        {properties.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-700">No properties found</h3>
            <p className="text-gray-500 mt-2">Get started by adding your first property</p>
            <Button
              className="mt-4"
              onClick={() => setShowPropertyForm(true)}
            >
              Add Property
            </Button>
          </div>
        ) : (
          <motion.section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {properties.map((p) => (
              <PropertyCard
                p={p}
                key={p._id}
                handlePropertyEdit={handlePropertyEdit}
              />
            ))}
          </motion.section>
        )}
      </LoadingSection>
    </div>
  );
}
"use client";
import { Property } from "@/types/property";
import PropertyCard from "./PropertyCard";
import PropertyForm from "./propertyForm";
import { motion } from "framer-motion";
import usePropertyStore from "@/stores/propertyStore";
import { useEffect, useState } from "react";
import { EMPTY_PROPERTY } from "@/types/property";
import Button from "@/components/common/Button";

export default function PropertyList() {
  const { properties, fetchProperties } = usePropertyStore();
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [selectedProperty, setSelectedProperty] =
    useState<Property>(EMPTY_PROPERTY);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handlePropertyEdit = (property: Property) => {
    setSelectedProperty(property);
    setShowPropertyForm(true);
  };

  const handleAddProperty = () => {
    setSelectedProperty(EMPTY_PROPERTY);
    setShowPropertyForm(true);
  };

  // Container animation variants
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  // Grid animation variants
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Empty state animation variants
  const emptyStateVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Button animation variants
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full p-4"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Properties</h2>
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <Button
              tl="Add Property"
              handleClick={handleAddProperty}
              tp="primary"
            />
          </motion.div>
        </div>

        {properties && properties.length > 0 ? (
          <motion.div
            variants={gridVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {properties.map((property: Property, index: number) => (
              <PropertyCard
                key={property._id}
                p={property}
                handlePropertyEdit={handlePropertyEdit}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={emptyStateVariants}
            className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg shadow-sm border border-gray-100"
          >
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              No Properties Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Add your first property to start managing your real estate
              portfolio
            </p>
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Button
                tl="Add Your First Property"
                handleClick={handleAddProperty}
                tp="primary"
              />
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {showPropertyForm && (
        <PropertyForm
          showPropertyForm={setShowPropertyForm}
          property={selectedProperty}
        />
      )}
    </>
  );
}

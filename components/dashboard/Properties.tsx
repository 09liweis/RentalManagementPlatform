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
      </motion.div>

      {showPropertyForm && (
        <PropertyForm
          property={property}
          showPropertyForm={setShowPropertyForm}
        />
      )}

      <LoadingSection loading={false}>
        {properties.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-16 px-8 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="relative mb-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-sky-100 rounded-full transform scale-150 opacity-50"></div>
              <div className="relative bg-white rounded-full p-6 shadow-lg border border-blue-100">
                <svg
                  className="w-16 h-16 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
            </motion.div>

            <motion.div
              className="text-center max-w-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No Properties Yet
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Start managing your properties by adding your first one. 
                Track income, expenses, and tenants all in one place.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setShowPropertyForm(true)}
                  buttonType="primary"
                >
                  Add Property
                </Button>
              </motion.div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-200 rounded-full opacity-60 animate-pulse"></div>
            <div
              className="absolute top-1/3 right-1/4 w-3 h-3 bg-sky-200 rounded-full opacity-40 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-50 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </motion.div>
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
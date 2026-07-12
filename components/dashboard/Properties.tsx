"use client";
import { useState } from "react";
import PropertyForm from "@/components/property/propertyForm";
import usePropertyStore from "@/stores/propertyStore";
import { EMPTY_PROPERTY, Property } from "@/types/property";
import Button from "@/components/common/Button";
import useAppStore from "@/stores/appStore";
import LinkText from "../common/LinkText";
import YearlyRentIncome from "../common/YearlyRentIncome";
import { motion } from "framer-motion";

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

  const rowVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.05 },
    }),
  };

  return (
    <div className="pb-8">
      {/* Header */}
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

      {/* Property Form */}
      {showPropertyForm && (
        <PropertyForm property={property} showPropertyForm={setShowPropertyForm} />
      )}

      {/* --- Empty State --- */}
      {properties.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-5">
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">No Properties Yet</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-sm">
            Start managing your properties by adding your first one. Track income, expenses, and tenants all in one place.
          </p>
          <Button onClick={handleAddProperty} buttonType="primary">
            Add Property
          </Button>
        </motion.div>
      ) : (
        <>
          {/* --- Desktop Table --- */}
          <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Yearly Income
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-24">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {properties.map((property: Property, i: number) => {
                  const selected = isSelected(property);
                  return (
                    <motion.tr
                      key={property._id}
                      custom={i}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      className={`transition-colors ${
                        selected
                          ? "bg-blue-50/50 border-l-4 border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-5 py-3.5">
                        <LinkText
                          href={`/dashboard/properties/${property._id}`}
                          className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {property.name}
                        </LinkText>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {property.ptypeTxt || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 max-w-[240px] truncate">
                          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {property.address || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <YearlyRentIncome stat={property.stat} />
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {(!hasSelection || selected) && (
                          <Button
                            outline
                            size="sm"
                            onClick={() => handlePropertyEdit(property)}
                          >
                            {t("dashboard.Edit")}
                          </Button>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* --- Mobile Cards --- */}
          <div className="md:hidden space-y-3">
            {properties.map((property: Property, i: number) => {
              const selected = isSelected(property);
              return (
                <motion.div
                  key={property._id}
                  custom={i}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  className={`bg-white rounded-xl border p-4 transition-colors ${
                    selected
                      ? "border-blue-400 bg-blue-50/50 border-l-4 border-l-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-2 min-w-0 flex-1">
                      <LinkText
                        href={`/dashboard/properties/${property._id}`}
                        className="text-sm font-semibold text-gray-900"
                      >
                        {property.name}
                      </LinkText>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {property.ptypeTxt || "—"}
                      </div>
                      {property.address && (
                        <div className="flex items-start gap-1.5 text-xs text-gray-500">
                          <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{property.address}</span>
                        </div>
                      )}
                      <YearlyRentIncome stat={property.stat} />
                    </div>
                    {(!hasSelection || selected) && (
                      <Button
                        outline
                        size="sm"
                        onClick={() => handlePropertyEdit(property)}
                      >
                        {t("dashboard.Edit")}
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
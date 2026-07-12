"use client";
import { motion } from "framer-motion";
import { Property } from "@/types/property";
import Button from "@/components/common/Button";
import LinkText from "@/components/common/LinkText";
import YearlyRentIncome from "@/components/common/YearlyRentIncome";

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.05 },
  }),
};

interface PropertiesMobileListProps {
  properties: Property[];
  isSelected: (p: Property) => boolean;
  hasSelection: boolean;
  onEdit: (property: Property) => void;
  editLabel: string;
}

export default function PropertiesMobileList({
  properties,
  isSelected,
  hasSelection,
  onEdit,
  editLabel,
}: PropertiesMobileListProps) {
  return (
    <div className="md:hidden space-y-3">
      {properties.map((property, i) => {
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
                <Button outline size="sm" onClick={() => onEdit(property)}>
                  {editLabel}
                </Button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

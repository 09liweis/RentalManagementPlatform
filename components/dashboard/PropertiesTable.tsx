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

interface PropertiesTableProps {
  properties: Property[];
  isSelected: (p: Property) => boolean;
  hasSelection: boolean;
  onEdit: (property: Property) => void;
  editLabel: string;
}

export default function PropertiesTable({
  properties,
  isSelected,
  hasSelection,
  onEdit,
  editLabel,
}: PropertiesTableProps) {
  return (
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
          {properties.map((property, i) => {
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
                    <Button outline size="sm" onClick={() => onEdit(property)}>
                      {editLabel}
                    </Button>
                  )}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

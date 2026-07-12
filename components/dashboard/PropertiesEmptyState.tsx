"use client";
import { motion } from "framer-motion";
import Button from "@/components/common/Button";

interface PropertiesEmptyStateProps {
  onAddProperty: () => void;
}

export default function PropertiesEmptyState({ onAddProperty }: PropertiesEmptyStateProps) {
  return (
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
      <Button onClick={onAddProperty} buttonType="primary">
        Add Property
      </Button>
    </motion.div>
  );
}

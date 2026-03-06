"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import useAppStore from "@/stores/appStore";

export default function TenantsBreadcrumbs({ curPropertyId }: { curPropertyId: string }) {
  const { t } = useAppStore();

  return (
    <motion.div
      className="flex items-center space-x-2 text-sm text-gray-600 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <Link
        href={`/dashboard/properties/${curPropertyId}`}
        className="text-blue-600 hover:text-blue-700 flex items-center transition-colors duration-200"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {t("dashboard.BackToProperty")}
      </Link>
      <span className="text-gray-400">/</span>
      <span className="text-gray-800 font-medium">
        {t("dashboard.RoomDetails")}
      </span>
    </motion.div>
  );
}

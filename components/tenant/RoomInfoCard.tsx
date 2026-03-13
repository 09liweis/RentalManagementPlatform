"use client";
import { motion } from "framer-motion";
import YearlyRentIncome from "@/components/common/YearlyRentIncome";

interface RoomInfoCardProps {
  name: string;
  tpTxt: string;
  stat?: Record<number, number>;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.02,
    boxShadow:
      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.2 },
  },
};

export default function RoomInfoCard({ name, tpTxt, stat }: RoomInfoCardProps) {
  return (
    <motion.div
      className="relative group"
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-xl transform transition-transform group-hover:scale-[1.02] duration-300"></div>
      <div className="relative p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-start space-x-4">
          <motion.div
            className="p-2 bg-emerald-50 rounded-lg"
            whileHover={{ rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              className="w-6 h-6 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </motion.div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-1">
              {name}
            </h4>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              {tpTxt}
            </div>
            <YearlyRentIncome stat={stat} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

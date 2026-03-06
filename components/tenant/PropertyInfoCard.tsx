"use client";
import { motion } from "framer-motion";

interface PropertyInfoCardProps {
  name: string;
  address: string;
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

export default function PropertyInfoCard({ name, address }: PropertyInfoCardProps) {
  return (
    <motion.div
      className="relative group"
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl transform transition-transform group-hover:scale-[1.02] duration-300"></div>
      <div className="relative p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-start space-x-4">
          <motion.div
            className="p-2 bg-blue-50 rounded-lg"
            whileHover={{ rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              className="w-6 h-6 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </motion.div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-1">
              {name}
            </h4>
            <p className="text-sm text-gray-600 flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {address}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

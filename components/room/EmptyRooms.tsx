"use client";

import { motion } from "framer-motion";
import Button from "../common/Button";

// Animation variants for empty state
const emptyStateVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
};

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
  },
};

interface EmptyRoomsProps {
  onAddRoom?: () => void;
}

export default function EmptyRooms({ onAddRoom }: EmptyRoomsProps) {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center py-16 px-8"
      variants={emptyStateVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="relative mb-6" variants={iconVariants}>
        {/* Decorative background circle */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full transform scale-150 opacity-50"></div>

        {/* Main icon */}
        <div className="relative bg-white rounded-full p-6 shadow-lg border border-green-100">
          <svg
            className="w-16 h-16 text-green-500"
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          No Rooms Yet
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Start organizing your property by adding rooms. Each room can have its
          own tenants, rent tracking, and management details.
        </p>

        {onAddRoom && (
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button onClick={onAddRoom} buttonType="primary">
              Add Your First Room
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-green-200 rounded-full opacity-60 animate-pulse"></div>
      <div
        className="absolute top-1/3 right-1/4 w-3 h-3 bg-emerald-200 rounded-full opacity-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-green-300 rounded-full opacity-50 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </motion.div>
  );
}

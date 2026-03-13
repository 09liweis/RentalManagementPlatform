"use client";

import { motion, AnimatePresence } from "framer-motion";
import RentCards from "@/components/dashboard/RentCards";
import Properties from "./Properties";

interface ScreenProps {
  propertyId?: string;
  roomId?: string;
  tenantId?: string;
}
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Screen({ propertyId, roomId, tenantId }: ScreenProps) {

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <RentCards
          propertyId={propertyId}
          roomId={roomId}
          tenantId={tenantId}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Properties />
      </motion.div>

    </motion.div>
  );
}

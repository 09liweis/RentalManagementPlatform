"use client";
import { motion } from "framer-motion";
import useAppStore from "@/stores/appStore";
import Button from "@/components/common/Button";

interface TenantsHeaderProps {
  onAddClick: () => void;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function TenantsHeader({ onAddClick }: TenantsHeaderProps) {
  const { t } = useAppStore();

  return (
    <motion.div
      className="flex justify-between items-center"
      variants={itemVariants}
    >
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t("home.Tenants")}
      </motion.h1>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button onClick={onAddClick}>
          {t("dashboard.Add")}
        </Button>
      </motion.div>
    </motion.div>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import LoadingSection from "../common/LoadingSection";
import { fetchData } from "@/utils/http";
import Input from "@/components/common/Input";
import usePropertyStore from "@/stores/propertyStore";
import useAppStore from "@/stores/appStore";

// 数字计数动画组件
const AnimatedCounter = ({ value = 0, prefix = "$" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayValue = useTransform(rounded, (latest) => `${prefix}${latest}`);

  useEffect(() => {
    const animation = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return animation.stop;
  }, [count, value]);

  return <motion.span>{displayValue}</motion.span>;
};

interface RentCardsProps {
  propertyId?: string;
  roomId?: string;
  tenantId?: string;
}

export default function RentCards({
  propertyId,
  roomId,
  tenantId,
}: RentCardsProps) {
  const { t } = useAppStore();

  const { fetchPropertyStats, rentStats, properties, rooms, tenants } =
    usePropertyStore();

  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState("");

  const fetchProperty = async (date: string) => {
    setLoading(true);

    await fetchPropertyStats({
      propertyId,
      roomId,
      tenantId,
      selectDate: date,
    });

    setLoading(false);
  };

  useEffect(() => {
    fetchProperty(date);
  }, [date]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="mt-4">
      <motion.div
        initial="hidden"
        animate="show"
        variants={inputVariants}
      >
        <Input
          type="month"
          value={rentStats.date || ""}
          placeholder={""}
          onChange={(e) => setDate(e.target.value)}
        />
      </motion.div>
      <motion.section 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.article 
          className="bg-yellow-100 shadow-md rounded-lg p-3 hover:shadow-lg transition-all"
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
        >
          <p>{t("dashboard.TotalRents")}</p>
          <motion.p 
            className="rent-price text-yellow-600 font-bold text-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            ${rentStats.totalRents}
          </motion.p>
        </motion.article>
        <motion.article 
          className="bg-green-100 shadow-md rounded-lg p-3 hover:shadow-lg transition-all"
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
        >
          <p>{t("dashboard.ReceivedRents")}</p>
          <motion.p 
            className="rent-price text-green-600 font-bold text-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            ${rentStats.receivedRents}
          </motion.p>
        </motion.article>
        <motion.article 
          className="bg-red-100 shadow-md rounded-lg p-3 hover:shadow-lg transition-all"
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
        >
          <p>{t("dashboard.PendingRents")}</p>
          <motion.p 
            className="rent-price text-red-600 font-bold text-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            ${rentStats.pendingRents}
          </motion.p>
        </motion.article>
        <motion.article 
          className="bg-red-200 shadow-md rounded-lg p-3 hover:shadow-lg transition-all"
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
        >
          <p>{t("dashboard.TotalCosts")}</p>
          <motion.p 
            className="rent-price text-red-600 font-bold text-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            ${rentStats.totalCost}
          </motion.p>
        </motion.article>
      </motion.section>
    </section>
  );
}
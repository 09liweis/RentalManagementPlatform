"use client";

import LinkText from "@/components/common/LinkText";
import LoadingSection from "@/components/common/LoadingSection";
import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TenantsPage() {
  const [loading, setLoading] = useState(false);
  const [tenants, setTenants] = useState([]);
  const fetchTenants = async () => {
    setLoading(true);
    const { tenants } = await fetchData({ url: `/api/tenants` });
    if (tenants) {
      setTenants(tenants);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // 子元素之间的延迟
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <>
      <h1 className="page-title">Tenants Page</h1>
      <LoadingSection loading={loading}>
        <motion.section 
          className="card-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tenants.map(({ _id, name, deposit }, index) => (
            <motion.article 
              className="card" 
              key={_id}
              variants={cardVariants}
              whileHover="hover"
              custom={index}
            >
              <LinkText href={`/dashboard/tenants/${_id}`} text={name} />
              <p>Deposit: {deposit}</p>
            </motion.article>
          ))}
        </motion.section>
      </LoadingSection>
    </>
  );
}
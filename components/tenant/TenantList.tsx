import { Tenant } from "@/types/tenant";
import TenantCard from "./TenantCard";
import { motion } from "framer-motion";
import { useState } from "react";

interface TenantListProps {
  loading: boolean;
  tenants: Tenant[];
  onEditClick?: (tenant: any) => void;
  setCurrentTenant?: (tenant: Tenant) => void;
}

// 动画变体
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function TenantList({ tenants, onEditClick, setCurrentTenant }: TenantListProps) {
  return (
    <div className="space-y-6">

      {tenants.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-700">No tenants found</h3>
        </div>
      ) : (
        <motion.section 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tenants.map((tenant, index) => (
            <TenantCard 
              key={tenant._id} 
              tenant={tenant} 
              onEditClick={onEditClick} 
              setCurrentTenant={setCurrentTenant}
              index={index}
            />
          ))}
        </motion.section>
      )}
    </div>
  );
}
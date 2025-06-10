import { Tenant } from "@/types/tenant";
import TenantCard from "./TenantCard";
import { motion } from "framer-motion";

interface TenantListProps {
  loading: boolean;
  tenants: Tenant[];
  onEditClick: (tenant: any) => void;
  setCurrentTenant: (tenant: Tenant) => void;
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
    <motion.section 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4"
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
          index={index} // 传递索引用于计算延迟
        />
      ))}
    </motion.section>
  );
}
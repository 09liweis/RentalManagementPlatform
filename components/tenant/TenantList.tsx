import { Tenant } from "@/types/tenant";
import TenantCard from "./TenantCard";
import { motion } from "framer-motion";
import Button from "../common/Button";
import useAppStore from "@/stores/appStore";

interface TenantListProps {
  loading: boolean;
  tenants: Tenant[];
  onEditClick?: (tenant: any) => void;
  onDeleteClick?: (tenant: any) => void;
  setCurrentTenant?: (tenant: Tenant) => void;
  setShowTenantForm?: (show: boolean) => void;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

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

export default function TenantList({
  tenants,
  onEditClick,
  onDeleteClick,
  setCurrentTenant,
  setShowTenantForm
}: TenantListProps) {
  const { t } = useAppStore();

  return (
    <section className="mt-8 pt-4 border-t-4 border-blue-700">
      <div className="flex justify-between items-center mb-6">
        {setShowTenantForm && (
          <Button onClick={() => setShowTenantForm(true)}>
            {t("dashboard.Add")}
          </Button>
        )}
      </div>

      {tenants && tenants.length > 0 ? (
        <motion.section 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tenants.map((tenant, index) => (
            <TenantCard
              key={tenant._id}
              tenant={tenant}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              setCurrentTenant={setCurrentTenant}
              index={index}
            />
          ))}
        </motion.section>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center py-16 px-8"
          variants={emptyStateVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="relative mb-6" variants={iconVariants}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-sky-100 rounded-full transform scale-150 opacity-50"></div>
            <div className="relative bg-white rounded-full p-6 shadow-lg border border-blue-100">
              <svg
                className="w-16 h-16 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
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
              No Tenants Yet
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Start managing your property by adding tenants. Each tenant can have
              their own lease details, payment tracking, and contact information.
            </p>

            {setShowTenantForm && (
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  onClick={() => setShowTenantForm(true)}
                  buttonType="primary"
                >{"Add Your First Tenant"}</Button>
              </motion.div>
            )}
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-200 rounded-full opacity-60 animate-pulse"></div>
          <div
            className="absolute top-1/3 right-1/4 w-3 h-3 bg-sky-200 rounded-full opacity-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-50 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </motion.div>
      )}
    </section>
  );
}
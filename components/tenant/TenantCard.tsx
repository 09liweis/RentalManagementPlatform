import useAppStore from "@/stores/appStore";
import LinkText from "../common/LinkText";
import usePropertyStore from "@/stores/propertyStore";
import { motion } from "framer-motion";
import { getDuration } from "@/utils/tenant";

// 卡片动画变体
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      type: "spring",
      stiffness: 100,
    },
  }),
  hover: {
    scale: 1.03,
    boxShadow:
      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.2 },
  },
};

export default function TenantCard({
  tenant,
  onEditClick,
  setCurrentTenant,
  index = 0,
  onDeleteClick,
}: any) {
  const { t } = useAppStore();
  const { curTenant } = usePropertyStore();
  const isCurrent = curTenant?._id == tenant._id;
  const hasCurTenant = curTenant?._id;
  return (
    <motion.article
      className={`bg-white rounded shadow hover:shadow-md p-3 border ${isCurrent ? "border-blue-500" : "border-gray-200"} group`}
      variants={cardVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <motion.button
          onClick={() =>
            setCurrentTenant ? setCurrentTenant(tenant) : () => {}
          }
          className={`w-3 h-3 rounded-full ${
            tenant.isCurrent
              ? "bg-emerald-500 ring-1 ring-emerald-200"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          title={tenant.isCurrent ? "Current Tenant" : "Set as Current Tenant"}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
        <motion.div
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <LinkText
            href={`/dashboard/tenants/${tenant._id}`}
          >{tenant.name}</LinkText>
        </motion.div>
      </motion.div>

      <motion.div
        className="space-y-4 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="text-sm text-gray-600">
            {t("dashboard.Deposit")}
          </span>
          <motion.span
            className="text-lg font-medium text-blue-600"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            ${tenant.deposit}
          </motion.span>
        </motion.div>

        <motion.div
          className="flex items-center justify-between p-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="text-sm font-medium text-emerald-700">
            Total Rent
          </span>
          <motion.span
            className="text-xl font-bold text-emerald-600"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.35 }}
          >
            ${tenant.totalRent || 0}
          </motion.span>
        </motion.div>

        <motion.div
          className="text-sm text-gray-600 bg-gray-50 rounded-lg p-2.5"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="space-y-2">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                className="w-2 h-2 bg-emerald-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              />
              {tenant.startDate}
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                className="w-2 h-2 bg-rose-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              />
              {tenant.endDate || t("dashboard.Ongoing")}
            </motion.div>
            <motion.div
              className=""
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {getDuration(tenant.startDate, tenant.endDate).formatted || ""}
            </motion.div>
            {tenant.rentDays !== undefined && (
              <motion.div
                className="flex items-center gap-2 text-xs font-medium text-purple-600"
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span
                  className="w-2 h-2 bg-purple-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                />
                {tenant.rentDays} days
              </motion.div>
            )}
          </div>
        </motion.div>

        <div className="flex gap-2">
          {onEditClick && (
            <motion.button
              onClick={() => onEditClick(tenant)}
              className="flex-1 text-sm text-gray-700 hover:text-blue-600 flex items-center justify-center py-2 border rounded-lg hover:border-blue-300 hover:bg-blue-50"
              whileHover={{ scale: 1.02, backgroundColor: "rgb(239 246 255)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {t("dashboard.Edit")}
            </motion.button>
          )}
          {onDeleteClick && (
            <motion.button
              onClick={() => onDeleteClick(tenant)}
              className="flex-1 text-sm text-red-600 hover:text-red-700 flex items-center justify-center py-2 border border-red-200 rounded-lg hover:border-red-300 hover:bg-red-50"
              whileHover={{ scale: 1.02, backgroundColor: "rgb(254 242 242)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {t("dashboard.Delete")}
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}

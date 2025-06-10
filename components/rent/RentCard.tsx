import useAppStore from "@/stores/appStore";
import Button from "../common/Button";
import { motion } from "framer-motion";

export default function RentCard({ rent, handleClick, handleDeleteRent, index = 0 }: any) {
  const { _id, amount, startDate, status, statusTxt } = rent;
  const { t } = useAppStore();

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.05 // 基于索引的延迟
      }
    },
    hover: { 
      scale: 1.03,
      boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.2
      }
    }
  };

  // 状态标签的动画变体
  const statusVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: 0.2,
        type: "spring",
        stiffness: 200
      }
    }
  };

  return (
    <motion.article 
      className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] p-3 border border-gray-100/80 hover:border-gray-200 group"
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="flex items-center gap-2 mb-4">
        <motion.span 
          className="w-1.5 h-1.5 bg-blue-500 rounded-full" 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        />
        <p className="text-sm font-medium text-gray-600 tracking-wide">
          {startDate}
        </p>
      </div>

      <div className="flex justify-between items-center mb-5">
        <motion.div 
          className="flex items-baseline gap-1"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <span className="text-sm text-gray-500">$</span>
          <p className="text-2xl font-bold text-gray-900">{amount}</p>
        </motion.div>
        <motion.div
          className={`
          px-3 py-1.5 rounded-full text-sm font-medium
          ${statusTxt === "paid" ? "bg-emerald-100 text-emerald-700" : ""}
          ${statusTxt === "pending" ? "bg-amber-100 text-amber-700" : ""}
        `}
          variants={statusVariants}
          initial="initial"
          animate="animate"
        >
          {t(statusTxt)}
        </motion.div>
      </div>

      <motion.div 
        className="flex justify-between gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <Button
          tl={t("dashboard.Edit")}
          handleClick={handleClick}
          tp="secondary"
          outline={true}
          size="sm"
          fullWidth={true}
        />
        <Button
          tp="danger"
          tl={t("dashboard.Delete")}
          handleClick={handleDeleteRent}
          outline={true}
          size="sm"
          fullWidth={true}
        />
      </motion.div>
    </motion.article>
  );
}
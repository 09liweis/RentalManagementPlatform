"use client";

import Button from "../common/Button";
import useAppStore from "@/stores/appStore";
import { motion } from "framer-motion";

interface RentTableProps {
  rents: any[];
  onEdit: (rent: any) => void;
  onDelete: (rent: any) => void;
}

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

const StatusBadge = ({ statusTxt }: { statusTxt: string }) => {
  const { t } = useAppStore();
  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
        statusTxt === "paid"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      {t(statusTxt)}
    </span>
  );
};

export default function RentTable({ rents, onEdit, onDelete }: RentTableProps) {
  const { t } = useAppStore();

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      {/* Desktop table */}
      <table className="hidden md:table w-full">
        <thead>
          <tr className="bg-gray-50 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
            <th className="px-4 py-3">{t("dashboard.StartDate")}</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 w-32"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rents.map((rent, i) => (
            <motion.tr
              key={rent._id}
              variants={rowVariants}
              custom={i}
              initial="hidden"
              animate="visible"
              className="hover:bg-gray-50 transition-colors bg-white"
            >
              <td className="px-4 py-3 text-sm text-gray-600">
                {rent.startDate}
              </td>
              <td className="px-4 py-3">
                <span className="text-sm font-bold text-gray-900">
                  ${rent.amount}
                </span>
              </td>
              <td className="px-4 py-3">
                <StatusBadge statusTxt={rent.statusTxt} />
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Button
                    buttonType="secondary"
                    outline={true}
                    size="sm"
                    onClick={() => onEdit(rent)}
                  >
                    {t("dashboard.Edit")}
                  </Button>
                  <Button
                    buttonType="danger"
                    size="sm"
                    onClick={() => onDelete(rent)}
                  >
                    {t("dashboard.Delete")}
                  </Button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-gray-100">
        {rents.map((rent, i) => (
          <motion.div
            key={rent._id}
            variants={rowVariants}
            custom={i}
            initial="hidden"
            animate="visible"
            className="p-4 space-y-3 bg-white"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{rent.startDate}</span>
              <StatusBadge statusTxt={rent.statusTxt} />
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-sm text-gray-500">$</span>
              <span className="text-xl font-bold text-gray-900">
                {rent.amount}
              </span>
            </div>

            <div className="flex gap-2 pt-1">
              <Button
                buttonType="secondary"
                outline={true}
                size="sm"
                onClick={() => onEdit(rent)}
              >
                {t("dashboard.Edit")}
              </Button>
              <Button
                buttonType="danger"
                size="sm"
                onClick={() => onDelete(rent)}
              >
                {t("dashboard.Delete")}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

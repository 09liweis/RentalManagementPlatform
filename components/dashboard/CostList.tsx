"use client";

import { motion } from "framer-motion";
import Button from "@/components/common/Button";
import { Cost } from "@/types/cost";
import { showToast } from "@/components/common/Toast";

interface CostListProps {
  costs: Cost[];
  onAddCost: () => void;
  t: (key: string) => string;
}

export default function CostList({ costs, onAddCost, t }: CostListProps) {
  return (
    <motion.section
      className="mt-8 pt-4 border-t-4 border-purple-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="page-title">Costs</h1>
          <p className="text-gray-500 text-sm">
            {costs.length} items • Total: $
            {costs
              .reduce((sum, cost) => sum + (cost.amount || 0), 0)
              .toFixed(2)}
          </p>
        </div>
        <Button onClick={onAddCost}>Add Cost</Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-100 p-3 font-medium text-gray-600 text-sm">
          <div className="col-span-3">Type</div>
          <div className="col-span-3">Date</div>
          <div className="col-span-2 text-right">Amount</div>
        </div>

        {costs.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No costs recorded yet. Click &quot;Add Cost&quot; to get started.
          </div>
        ) : (
          <motion.div>
            {costs.map((cost, index) => (
              <motion.div
                key={cost._id}
                className={`grid grid-cols-12 p-3 items-center border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="col-span-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                    <span className="text-purple-600 text-xs font-bold">
                      {(t(cost.tpTxt || "").charAt(0) || "C").toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">{t(cost.tpTxt || "")}</span>
                </div>
                <div className="col-span-3 text-gray-600">
                  {cost.date ? new Date(cost.date).toLocaleDateString() : "N/A"}
                </div>
                <div className="col-span-2 text-right font-medium text-gray-900">
                  ${cost.amount?.toFixed(2) || "0.00"}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

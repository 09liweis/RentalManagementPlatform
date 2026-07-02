"use client";

import LinkText from "../common/LinkText";
import Button from "../common/Button";
import useAppStore from "@/stores/appStore";
import usePropertyStore from "@/stores/propertyStore";
import { Tenant } from "@/types/tenant";
import { getDuration } from "@/utils/tenant";
import { motion } from "framer-motion";

interface TenantTableProps {
  tenants: Tenant[];
  onEdit?: (tenant: Tenant) => void;
  onDelete?: (tenant: Tenant) => void;
  onSetCurrent?: (tenant: Tenant) => void;
}

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

const CurrentDot = ({
  isCurrent,
  onSetCurrent,
  tenant,
}: {
  isCurrent: boolean;
  onSetCurrent?: (t: Tenant) => void;
  tenant: Tenant;
}) => (
  <motion.button
    onClick={() => onSetCurrent?.(tenant)}
    className={`w-3 h-3 rounded-full shrink-0 ${
      isCurrent
        ? "bg-emerald-500 ring-1 ring-emerald-200"
        : "bg-gray-300 hover:bg-gray-400"
    }`}
    title={isCurrent ? "Current Tenant" : "Set as Current Tenant"}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  />
);

const DurationCell = ({ rentDays }: { rentDays?: number }) => {
  const formatted = getDuration(rentDays || 0).formatted;
  if (!formatted) return <span className="text-sm text-gray-400">—</span>;
  return (
    <span className="text-sm font-medium text-purple-600">{formatted}</span>
  );
};

export default function TenantTable({
  tenants,
  onEdit,
  onDelete,
  onSetCurrent,
}: TenantTableProps) {
  const { t } = useAppStore();
  const { curTenant } = usePropertyStore();

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
      {/* Desktop table */}
      <table className="hidden md:table w-full">
        <thead>
          <tr className="bg-gray-50 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
            <th className="px-4 py-3 w-8"></th>
            <th className="px-4 py-3">{t("dashboard.Name")}</th>
            <th className="px-4 py-3">{t("dashboard.Deposit")}</th>
            <th className="px-4 py-3">Total Rent</th>
            <th className="px-4 py-3">{t("dashboard.StartDate")}</th>
            <th className="px-4 py-3">{t("dashboard.EndDate")}</th>
            <th className="px-4 py-3">Duration</th>
            <th className="px-4 py-3">{t("dashboard.NumberOfPeople")}</th>
            <th className="px-4 py-3">{t("dashboard.Note")}</th>
            <th className="px-4 py-3 w-32"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {tenants.map((tenant, i) => {
            const isSelected = curTenant?._id === tenant._id;
            return (
              <motion.tr
                key={tenant._id}
                variants={rowVariants}
                custom={i}
                initial="hidden"
                animate="visible"
                className={`hover:bg-gray-50 transition-colors ${
                  isSelected ? "bg-blue-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-3">
                  <CurrentDot
                    isCurrent={!!tenant.isCurrent}
                    onSetCurrent={onSetCurrent}
                    tenant={tenant}
                  />
                </td>
                <td className="px-4 py-3">
                  <LinkText href={`/dashboard/tenants/${tenant._id}`}>
                    {tenant.name || ""}
                  </LinkText>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-blue-600">
                  ${tenant.deposit || 0}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-emerald-600">
                  ${tenant.totalRent || 0}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {tenant.startDate || "—"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {tenant.endDate || t("dashboard.Ongoing")}
                </td>
                <td className="px-4 py-3">
                  <DurationCell rentDays={tenant.rentDays} />
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {tenant.numberOfPeople ?? "—"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 italic max-w-[160px] truncate">
                  {tenant.note || "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {onEdit && (
                      <Button
                        buttonType="primary"
                        outline={true}
                        size="sm"
                        onClick={() => onEdit(tenant)}
                      >
                        {t("dashboard.Edit")}
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        buttonType="danger"
                        size="sm"
                        onClick={() => onDelete(tenant)}
                      >
                        {t("dashboard.Delete")}
                      </Button>
                    )}
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-gray-100">
        {tenants.map((tenant, i) => {
          const isSelected = curTenant?._id === tenant._id;
          return (
            <motion.div
              key={tenant._id}
              variants={rowVariants}
              custom={i}
              initial="hidden"
              animate="visible"
              className={`p-4 space-y-2 ${
                isSelected
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : "bg-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <CurrentDot
                  isCurrent={!!tenant.isCurrent}
                  onSetCurrent={onSetCurrent}
                  tenant={tenant}
                />
                <LinkText href={`/dashboard/tenants/${tenant._id}`}>
                  {tenant.name || ""}
                </LinkText>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <span className="text-gray-500">{t("dashboard.Deposit")}</span>
                <span className="font-medium text-blue-600 text-right">
                  ${tenant.deposit || 0}
                </span>

                <span className="text-gray-500">Total Rent</span>
                <span className="font-bold text-emerald-600 text-right">
                  ${tenant.totalRent || 0}
                </span>

                <span className="text-gray-500">{t("dashboard.StartDate")}</span>
                <span className="text-right">{tenant.startDate || "—"}</span>

                <span className="text-gray-500">{t("dashboard.EndDate")}</span>
                <span className="text-right">
                  {tenant.endDate || t("dashboard.Ongoing")}
                </span>

                <span className="text-gray-500">Duration</span>
                <span className="text-right">
                  <DurationCell rentDays={tenant.rentDays} />
                </span>

                {tenant.numberOfPeople != null && (
                  <>
                    <span className="text-gray-500">
                      {t("dashboard.NumberOfPeople")}
                    </span>
                    <span className="text-right">{tenant.numberOfPeople}</span>
                  </>
                )}

                {tenant.note && (
                  <>
                    <span className="text-gray-500">{t("dashboard.Note")}</span>
                    <span className="text-right text-gray-500 italic truncate max-w-[140px]">
                      {tenant.note}
                    </span>
                  </>
                )}
              </div>

              <div className="flex gap-2 pt-1">
                {onEdit && (
                  <Button
                    buttonType="primary"
                    outline={true}
                    size="sm"
                    onClick={() => onEdit(tenant)}
                  >
                    {t("dashboard.Edit")}
                  </Button>
                )}
                {onDelete && (
                  <Button
                    buttonType="danger"
                    size="sm"
                    onClick={() => onDelete(tenant)}
                  >
                    {t("dashboard.Delete")}
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

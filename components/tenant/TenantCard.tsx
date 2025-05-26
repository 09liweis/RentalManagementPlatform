import useAppStore from "@/stores/appStore";
import LinkText from "../common/LinkText";

export default function TenantCard({
  tenant,
  onEditClick,
  setCurrentTenant,
}: any) {
  const { t } = useAppStore();
  return (
    <article className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 p-7 border border-gray-100/80 hover:border-gray-200 group">
      <div className="flex items-center gap-4 mb-5">
        <button
          onClick={() => setCurrentTenant(tenant)}
          className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-110 ${
            tenant.isCurrent
              ? "bg-emerald-500 ring-2 ring-emerald-200 ring-offset-2"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          title={tenant.isCurrent ? "Current Tenant" : "Set as Current Tenant"}
        />
        <LinkText
          className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300"
          href={`/dashboard/tenants/${tenant._id}`}
          text={tenant.name || ""}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline justify-between p-3 bg-gray-50/50 rounded-xl">
          <span className="text-sm font-medium text-gray-600">
            {t("dashboard.Deposit")}
          </span>
          <span className="text-lg font-semibold text-blue-600">${tenant.deposit}</span>
        </div>

        <div className="text-sm text-gray-600 bg-gray-50/50 rounded-xl p-3">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-1">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-sm shadow-emerald-200" />
              <span className="font-medium">{tenant.startDate}</span>
            </div>
            <div className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-1">
              <span className="w-2.5 h-2.5 bg-rose-500 rounded-full shadow-sm shadow-rose-200" />
              <span className="font-medium">{tenant.endDate || t("dashboard.Ongoing")}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onEditClick(tenant)}
          className="w-full mt-4 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:border-blue-200 hover:bg-blue-50/50 group-hover:border-blue-300"
        >
          {t("dashboard.Edit")}
        </button>
      </div>
    </article>
  );
}
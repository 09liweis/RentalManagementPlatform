import useAppStore from "@/stores/appStore";
import LinkText from "../common/LinkText";
import usePropertyStore from "@/stores/propertyStore";

export default function TenantCard({
  tenant,
  onEditClick,
  setCurrentTenant,
}: any) {
  const { t } = useAppStore();
  const { curTenant } = usePropertyStore();
  const isCurrent = curTenant?._id == tenant._id;
  const hasCurTenant = curTenant?._id;
  return (
    <article
      className={`bg-white rounded-xl shadow hover:shadow-md transition-all p-3 border ${isCurrent ? "border-blue-500" : "border-gray-200"} group`}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentTenant(tenant)}
          className={`w-3 h-3 rounded-full transition ${
            tenant.isCurrent
              ? "bg-emerald-500 ring-1 ring-emerald-200"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          title={tenant.isCurrent ? "Current Tenant" : "Set as Current Tenant"}
        />
        <LinkText className="text-lg font-medium text-gray-900 hover:text-blue-600" text={tenant.name} href={`/dashboard/tenants/${tenant._id}`} />
      </div>

        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">
              {t("dashboard.Deposit")}
            </span>
            <span className="text-lg font-medium text-blue-600">
              ${tenant.deposit}
            </span>
          </div>

          <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-2.5">
            <div className="space-y-2">
              <div className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span>{tenant.startDate}</span>
              </div>
              <div className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                <span className="w-2 h-2 bg-rose-500 rounded-full" />
                <span>{tenant.endDate || t("dashboard.Ongoing")}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onEditClick(tenant)}
            className="w-full text-sm text-gray-700 hover:text-blue-600 flex items-center justify-center py-2 border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
          >
            {t("dashboard.Edit")}
          </button>
        </div>
      
    </article>
  );
}

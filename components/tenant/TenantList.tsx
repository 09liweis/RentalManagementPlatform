import LoadingSection from "@/components/common/LoadingSection";
import LinkText from "../common/LinkText";
import useAppStore from "@/stores/appStore";
import { Tenant } from "@/types/tenant";

interface TenantListProps {
  loading: boolean;
  tenants: Tenant[];
  onEditClick: (tenant: any) => void;
  setCurrentTenant: (tenant: Tenant) => void;
}

export default function TenantList({ loading, tenants, onEditClick, setCurrentTenant }: TenantListProps) {
  const { t } = useAppStore();

  return (
    <LoadingSection loading={loading}>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {tenants.map((tenant) => (
          <article 
            key={tenant._id} 
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setCurrentTenant(tenant)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  tenant.isCurrent
                    ? 'bg-green-500 ring-2 ring-green-200'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                title={tenant.isCurrent ? 'Current Tenant' : 'Set as Current Tenant'}
              />
              <LinkText
                className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300"
                href={`/dashboard/tenants/${tenant._id}`}
                text={tenant.name || ''}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-gray-500">{t('dashboard.Deposit')}</span>
                <span className="font-semibold text-blue-600">${tenant.deposit}</span>
              </div>

              <div className="text-sm text-gray-600">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"/>
                    <span>{tenant.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"/>
                    <span>{tenant.endDate || t('dashboard.Ongoing')}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onEditClick(tenant)}
                className="w-full mt-4 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50"
              >
                {t('dashboard.Edit')}
              </button>
            </div>
          </article>
        ))}
      </section>
    </LoadingSection>
  );
}
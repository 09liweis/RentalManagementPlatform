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

export default function TenantList({ loading, tenants, onEditClick,setCurrentTenant }:TenantListProps) {
  const {t} = useAppStore();

  

  return (
    <LoadingSection loading={loading}>
      <section className="card-container grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tenants.map((tenant) => (
          <article key={tenant._id} className="card space-y-2">
            <div className="flex gap-2 items-center">
              <div className={`rounded-lg w-5 h-5 cursor-pointer ${tenant.isCurrent?'bg-green-600':'bg-gray-500'}`} onClick={()=>setCurrentTenant(tenant)}></div>
              <LinkText className="tenant-name" href={`/dashboard/tenants/${tenant._id}`} text={tenant.name||''} />
            </div>
            <div className="font-bold text-blue-500">{t('dashboard.Deposit')}: ${tenant.deposit}</div>
            <div className="text-gray-800 italic">{tenant.startDate} - {tenant.endDate || 'unknown'}</div>
            <div className="text-red-400 cursor-pointer" onClick={()=>onEditClick(tenant)}>{t('dashboard.Edit')}</div>
          </article>
        ))}
      </section>
    </LoadingSection>
  )
}
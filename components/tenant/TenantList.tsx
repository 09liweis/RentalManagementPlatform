import Link from "next/link";
import LoadingSection from "@/components/common/LoadingSection";
import LinkText from "../common/LinkText";
import useAppStore from "@/stores/appStore";
import { fetchData } from "@/utils/http";
import { showToast } from "../common/Toast";
import usePropertyStore from "@/stores/propertyStore";

interface TenantListProps {
  loading: boolean;
  tenants: any[];
  onEditClick: (tenant: any) => void;
}

export default function TenantList({ loading, tenants, onEditClick }:TenantListProps) {
  const {t} = useAppStore();
  const {fetchTenants} = usePropertyStore();

  const setCurrentTenant = async (tenant:any) => {
    const {err, msg} = await fetchData({url:`/api/tenants/${tenant._id}`,body:{...tenant,isCurrent:true}, method:'PUT'});
    showToast(err || msg);
    fetchTenants(tenant.room);
  }

  return (
    <LoadingSection loading={loading}>
      <section className="card-container">
        {tenants.map((tenant) => (
          <article key={tenant._id} className="card">
            <div className="flex justify-between">
              <LinkText className="tenant-name" href={`/dashboard/tenants/${tenant._id}`} text={tenant.name} />
              <span className="text-red-400 cursor-pointer" onClick={()=>onEditClick(tenant)}>{t('dashboard.Edit')}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className={`rounded-lg w-10 h-10 cursor-pointer ${tenant.isCurrent?'bg-green-600':'bg-gray-500'}`} onClick={()=>setCurrentTenant(tenant)}></div>
              <div>{t('dashboard.Deposit')}: {tenant.deposit}</div>
              <div>
                <span className="tenant-date">{tenant.startDate}</span>
                {tenant.endDate && <span className="tenant-date"> - {tenant.endDate}</span>}
              </div>
            </div>
          </article>
        ))}
      </section>
    </LoadingSection>
  )
}
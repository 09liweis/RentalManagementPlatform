import Link from "next/link";
import LoadingSection from "@/components/common/LoadingSection";
import LinkText from "../common/LinkText";
import useAppStore from "@/stores/appStore";

interface TenantListProps {
  loading: boolean;
  tenants: any[];
  onEditClick: (tenant: any) => void;
}

export default function TenantList({ loading, tenants, onEditClick }:TenantListProps) {
  const {t} = useAppStore();
  return (
    <LoadingSection loading={loading}>
      <section className="card-container">
        {tenants.map((tenant) => (
          <article key={tenant._id} className="card">
            <div className="flex justify-between">
              <LinkText className="tenant-name" href={`/dashboard/tenants/${tenant._id}`} text={tenant.name} />
              <span className="text-red-400 cursor-pointer" onClick={()=>onEditClick(tenant)}>{t('dashboard.Edit')}</span>
            </div>
            <div className="flex justify-between">
              <span className="tenant-date">{tenant.startDate}</span>
              {tenant.endDate && <span className="tenant-date">{tenant.endDate}</span>}
            </div>
          </article>
        ))}
      </section>
    </LoadingSection>
  )
}
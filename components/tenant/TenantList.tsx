import Link from "next/link";
import LoadingSection from "@/components/common/LoadingSection";
import LinkText from "../common/LinkText";

interface TenantListProps {
  loading: boolean;
  tenants: any[];
  onEditClick: (tenant: any) => void;
}

export default function TenantList({ loading, tenants, onEditClick }:TenantListProps) {
  return (
    <LoadingSection loading={loading}>
      <section className="card-container">
        {tenants.map((t) => (
          <article key={t._id} className="card">
            <div className="flex justify-between">
              <LinkText className="tenant-name" href={`/dashboard/tenants/${t._id}`} text={t.name} />
              <span className="text-red-400 cursor-pointer" onClick={()=>onEditClick(t)}>Edit</span>
            </div>
            <div className="flex justify-between">
              <span className="tenant-date">{t.startDate}</span>
              {t.endDate && <span className="tenant-date">{t.endDate}</span>}
            </div>
          </article>
        ))}
      </section>
    </LoadingSection>
  )
}
import Link from "next/link";
import LoadingSection from "@/components/common/LoadingSection";

export default function TenantList({ loading, tenants, onEditClick }) {
  return (
    <LoadingSection loading={loading}>
      <section className="card-container">
        {tenants.map((t) => (
          <article key={t._id} className="card">
            <div className="flex justify-between">
              <Link className="tenant-name" href={`/dashboard/tenants/${t._id}`}>
                {t.name}
              </Link>
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
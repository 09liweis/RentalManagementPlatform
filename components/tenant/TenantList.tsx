import LoadingSection from "@/components/common/LoadingSection";

import { Tenant } from "@/types/tenant";
import TenantCard from "./TenantCard";

interface TenantListProps {
  loading: boolean;
  tenants: Tenant[];
  onEditClick: (tenant: any) => void;
  setCurrentTenant: (tenant: Tenant) => void;
}

export default function TenantList({ loading, tenants, onEditClick, setCurrentTenant }: TenantListProps) {
  

  return (
    <LoadingSection loading={loading}>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {tenants.map((tenant) => (
          <TenantCard key={tenant._id} tenant={tenant} onEditClick={onEditClick} setCurrentTenant={setCurrentTenant} />
        ))}
      </section>
    </LoadingSection>
  );
}
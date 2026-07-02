import { Tenant } from "@/types/tenant";
import TenantTable from "./TenantTable";
import EmptyTenants from "./EmptyTenants";
import Button from "../common/Button";
import useAppStore from "@/stores/appStore";

interface TenantListProps {
  loading: boolean;
  tenants: Tenant[];
  onEditClick?: (tenant: any) => void;
  onDeleteClick?: (tenant: any) => void;
  setCurrentTenant?: (tenant: Tenant) => void;
  setShowTenantForm?: (show: boolean) => void;
}

export default function TenantList({
  tenants,
  onEditClick,
  onDeleteClick,
  setCurrentTenant,
  setShowTenantForm,
}: TenantListProps) {
  const { t } = useAppStore();

  return (
    <section className="mt-8 pt-4 border-t-4 border-blue-700">
      <div className="flex justify-between items-center mb-6">
        {setShowTenantForm && (
          <Button onClick={() => setShowTenantForm(true)}>
            {t("dashboard.Add")}
          </Button>
        )}
      </div>

      {tenants && tenants.length > 0 ? (
        <TenantTable
          tenants={tenants}
          onEdit={onEditClick}
          onDelete={onDeleteClick}
          onSetCurrent={setCurrentTenant}
        />
      ) : (
        <EmptyTenants
          onAddTenant={
            setShowTenantForm ? () => setShowTenantForm(true) : undefined
          }
        />
      )}
    </section>
  );
}
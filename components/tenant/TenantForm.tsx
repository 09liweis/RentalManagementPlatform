import FormBackdrop from "@/components/common/form/FormBackdrop";
import FormWrapper from "@/components/common/form/FormWrapper";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import useAppStore from "@/stores/appStore";

const tenantFields = [
  { field: "name", inputType: "text", placeholder: "dashboard.Name" },
  { field: "deposit", inputType: "number", placeholder: "dashboard.Deposit" },
  { field: "startDate", inputType: "date", placeholder: "dashboard.StartDate" },
  { field: "endDate", inputType: "date", placeholder: "dashboard.EndDate" },
];

export default function TenantForm({tenant, setTenant, handleSubmit, setShowTenantForm}:any) {
  const {t} = useAppStore();
  return (
    <FormBackdrop>
      <FormWrapper onSubmit={handleSubmit}>
        {tenantFields.map(({ field, inputType, placeholder }) => (
          <Input
            key={field}
            type={inputType}
            placeholder={t(placeholder)}
            value={tenant[field] || ""}
            onChange={(e) => setTenant({ ...tenant, [field]: e.target.value })}
          />
        ))}
        <div className="flex justify-between">
          <Button
            type="submit"
          >{tenant?._id ? t("dashboard.Update") : t("dashboard.Add")}</Button>
          <Button onClick={() => {setShowTenantForm(false); setTenant({})}} buttonType="danger">{t('dashboard.Cancel')}</Button>
        </div>
      </FormWrapper>
      </FormBackdrop>
  )
}
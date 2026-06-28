import FormBackdrop from "@/components/common/form/FormBackdrop";
import FormWrapper from "@/components/common/form/FormWrapper";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import useAppStore from "@/stores/appStore";

const tenantFields = [
  {
    field: "name",
    required: true,
    inputType: "text",
    placeholder: "dashboard.Name",
  },
  { field: "deposit", inputType: "number", placeholder: "dashboard.Deposit" },
  { field: "rent", inputType: "number", placeholder: "dashboard.Rent" },
  {
    field: "numberOfPeople",
    inputType: "number",
    placeholder: "dashboard.NumberOfPeople",
  },
  { field: "startDate", inputType: "date", placeholder: "dashboard.StartDate" },
  { field: "endDate", inputType: "date", placeholder: "dashboard.EndDate" },
  { field: "note", inputType: "textarea", placeholder: "dashboard.Note" },
];

export default function TenantForm({
  tenant,
  setTenant,
  loading,
  required = false,
  handleSubmit,
  setShowTenantForm,
}: any) {
  const { t } = useAppStore();
  return (
    <FormBackdrop>
      <FormWrapper onSubmit={handleSubmit}>
        {tenantFields.map(({ field, inputType, placeholder }) =>
          inputType === "textarea" ? (
            <div key={field} className="text-left w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t(placeholder)}
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-900 transition-all duration-300 min-h-[96px]"
                rows={3}
                placeholder={t(placeholder)}
                value={tenant[field] || ""}
                onChange={(e) => setTenant({ ...tenant, [field]: e.target.value })}
              />
            </div>
          ) : (
            <Input
              required={required}
              key={field}
              type={inputType}
              placeholder={t(placeholder)}
              value={tenant[field] || ""}
              onChange={(e) => setTenant({ ...tenant, [field]: e.target.value })}
            />
          ),
        )}
        <div className="flex justify-between">
          <Button type="submit">
            {loading ? "Loading..." : ""}
            {tenant?._id ? t("dashboard.Update") : t("dashboard.Add")}
          </Button>
          <Button
            onClick={() => {
              setShowTenantForm(false);
              setTenant({});
            }}
            buttonType="danger"
          >
            {t("dashboard.Cancel")}
          </Button>
        </div>
      </FormWrapper>
    </FormBackdrop>
  );
}

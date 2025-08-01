"use client";
import { RENT_STATUS_ARRAY } from "@/types/rent";
import usePropertyStore from "@/stores/propertyStore";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import SelectGroup from "@/components/common/SelectGroup";
import FormBackdrop from "@/components/common/form/FormBackdrop";
import FormWrapper from "@/components/common/form/FormWrapper";
import FormTitle from "@/components/common/form/FormTitle";
import useAppStore from "@/stores/appStore";

export default function RentForm() {
  const { t } = useAppStore();
  const { curRent, setCurRent, curTenant, handleRentSubmit, setShowRentForm } =
    usePropertyStore();

  const RENT_FIELDS = [
    {
      placeholder: "Amount",
      name: "amount",
      required: true,
      inputType: "number",
      value: curTenant.rent || curTenant.deposit || 0
    },
    { placeholder: "Date", name: "startDate", inputType: "date" },
  ];
  console.log(RENT_FIELDS);

  return (
    <FormBackdrop>
      <FormWrapper onSubmit={handleRentSubmit}>
        <FormTitle title="Add New Rent" />
        {RENT_FIELDS.map(
          ({ placeholder, required = false, inputType, name, value }) => (
            <Input
              key={name}
              required={required}
              placeholder={placeholder}
              value={curRent[name] || value}
              type={inputType}
              onChange={(e) =>
                setCurRent({ ...curRent, [name]: e.target.value })
              }
            />
          ),
        )}
        <SelectGroup
          value={curRent.status || ""}
          label="Rent Status"
          options={RENT_STATUS_ARRAY}
          handleSelect={(value) => setCurRent({ ...curRent, status: value })}
        />
        <div className="flex justify-between">
          <Button type="submit">
            {curRent._id ? t("dashboard.Update") : t("dashboard.Add")}
          </Button>
          <Button
            buttonType="danger"
            onClick={() => {
              setShowRentForm();
            }}
          >
            {t("dashboard.Cancel")}
          </Button>
        </div>
      </FormWrapper>
    </FormBackdrop>
  );
}

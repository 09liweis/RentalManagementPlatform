"use client";
import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import { showToast } from "@/components/common/Toast";
import { RENT_STATUS_ARRAY } from "@/types/rent";
import usePropertyStore from "@/stores/propertyStore";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import SelectGroup from "@/components/common/SelectGroup";
import FormBackdrop from "@/components/common/form/FormBackdrop";
import FormWrapper from "@/components/common/form/FormWrapper";
import FormTitle from "@/components/common/form/FormTitle";
import useAppStore from "@/stores/appStore";

const RENT_FIELDS = [
  {
    placeholder: "Amount",
    name: "amount",
    required: true,
    inputType: "number",
  },
  { placeholder: "Date", name: "startDate", inputType: "date" },
];

export default function RentForm() {
  const { t } = useAppStore();
  const { curRent, setCurRent, curTenant, handleRentSubmit, setShowRentForm } =
    usePropertyStore();

  return (
    <FormBackdrop>
      <FormWrapper onSubmit={handleRentSubmit}>
        <FormTitle title="Add New Rent" />
        {RENT_FIELDS.map(
          ({ placeholder, required = false, inputType, name }) => (
            <Input
              key={name}
              required={required}
              placeholder={placeholder}
              value={curRent[name] || ""}
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

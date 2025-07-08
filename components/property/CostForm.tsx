"use client";
import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import { showToast } from "@/components/common/Toast";
import {
  EMPTY_PROPERTY,
  Property,
  PROPERTY_PTYPE_ARRAY,
} from "@/types/property";
import usePropertyStore from "@/stores/propertyStore";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import SelectGroup from "@/components/common/SelectGroup";
import FormBackdrop from "@/components/common/form/FormBackdrop";
import FormTitle from "@/components/common/form/FormTitle";
import FormWrapper from "@/components/common/form/FormWrapper";
import { Cost, COST_TP_ARRAY } from "@/types/cost";
import useAppStore from "@/stores/appStore";

interface PropertyFormProps {
  showCostForm: Function;
  cost?: Cost;
}

export default function CostForm({ showCostForm, cost }: PropertyFormProps) {
  const { fetchPropertyStats, curProperty } = usePropertyStore();
  const { t } = useAppStore();

  const [curCost, setCurCost] = useState<Cost>();

  useEffect(() => setCurCost(cost), [cost]);

  const handleCostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const propertyId = curProperty?._id;
    e.preventDefault();
    const method = curCost?._id ? "PUT" : "POST";
    const url = curCost?._id
      ? `/api/properties/${propertyId}/costs/${curCost?._id}`
      : `/api/properties/${propertyId}/costs`;
    const { msg, err } = await fetchData({ url, method, body: curCost });
    showCostForm(false);
    showToast(err || msg);
    fetchPropertyStats({ propertyId });
    setCurCost(EMPTY_PROPERTY);
  };

  return (
    <FormBackdrop>
      <FormWrapper onSubmit={handleCostSubmit}>
        <FormTitle title="Add New Cost" />
        <Input
          type="number"
          required={true}
          placeholder="Amount"
          value={curCost?.amount?.toString() || "0"}
          onChange={(e) =>
            setCurCost({ ...curCost, amount: parseFloat(e.target.value) })
          }
        />
        <Input
          type="date"
          placeholder="Date"
          value={curCost?.date || ""}
          onChange={(e) => setCurCost({ ...curCost, date: e.target.value })}
        />
        <SelectGroup
          value={curCost?.tp || ""}
          label="Property Type"
          options={COST_TP_ARRAY}
          handleSelect={(value) => setCurCost({ ...curCost, tp: value })}
        />
        <div className="flex justify-between">
          <Button type="submit">{t(`dashboard.Add`)}</Button>
          <Button onClick={() => showCostForm(false)} buttonType="danger">
            {t(`dashboard.Cancel`)}
          </Button>
        </div>
      </FormWrapper>
    </FormBackdrop>
  );
}

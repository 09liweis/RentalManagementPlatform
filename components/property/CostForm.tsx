"use client";
import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import { showToast } from "@/components/common/Toast";
import { EMPTY_PROPERTY, Property, PROPERTY_PTYPE_ARRAY } from "@/types/property";
import usePropertyStore from "@/stores/propertyStore";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import SelectGroup from "@/components/common/SelectGroup";
import FormBackdrop from "@/components/common/form/FormBackdrop";
import FormTitle from "@/components/common/form/FormTitle";
import { Cost, COST_TP_ARRAY } from "@/types/cost";

interface PropertyFormProps {
  propertyId: String;
  showCostForm: Function;
  cost?: Cost;
}

export default function CostForm({
  showCostForm,
  cost,
  propertyId
}: PropertyFormProps) {
  const { fetchProperties } = usePropertyStore();

  const [curCost, setCurCost] = useState<Cost>();

  useEffect(() => setCurCost(cost), [cost]);

  const handlePropertySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = curCost?._id ? "PUT" : "POST";
    const url = curCost?._id
      ? `/api/properties/${propertyId}/costs/${curCost?._id}`
      : `/api/properties/${propertyId}/costs`;
    const { msg, err } = await fetchData({ url, method, body: curCost });
    showCostForm(false);
    showToast(err || msg);
    fetchProperties();
    setCurCost(EMPTY_PROPERTY);
  };

  return (
    <FormBackdrop>
      <form
        className="form-container"
        onSubmit={handlePropertySubmit}
      >
        <FormTitle title="Add New Cost" />
        <Input
          type="number"
          placeholder="Amount"
          value={curCost?.amount || ""}
          onChange={(e) =>
            setCurCost({ ...curCost, amount: e.target.value })
          }
        />
        <Input
          type="date"
          placeholder="Date"
          value={curCost?.date || ""}
          onChange={(e) =>
            setCurCost({ ...curCost, date: e.target.value })
          }
        />
        <SelectGroup
          value={curCost?.tp || ""}
          label="Property Type"
          options={COST_TP_ARRAY}
          handleSelect={(value) =>
            setCurCost({ ...curCost, tp: value })
          }
        />
        <Button tl={`Add`} handleClick={handlePropertySubmit} />
        <button onClick={() => showCostForm(false)}>Cancel</button>
      </form>
    </FormBackdrop>
  );
}

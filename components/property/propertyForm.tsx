"use client";
import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import { showToast } from "../common/Toast";
import { EMPTY_PROPERTY, Property } from "@/types/property";
import usePropertyStore from "@/stores/propertyStore";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import SelectGroup from "../common/SelectGroup";
import FormBackdrop from "../common/form/FormBackdrop";
import FormTitle from "../common/form/FormTitle";

interface PropertyFormProps {
  showPropertyForm: Function;
  property: Property;
}

export default function PropertyForm({
  showPropertyForm,
  property,
}: PropertyFormProps) {
  const { fetchProperties } = usePropertyStore();

  const [curProperty, setCurProperty] = useState<Property>(property);

  useEffect(() => setCurProperty(property), [property]);

  const handlePropertySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = curProperty._id ? "PUT" : "POST";
    const url = curProperty._id
      ? `/api/properties/${curProperty._id}`
      : `/api/properties`;
    const { msg, err } = await fetchData({ url, method, body: curProperty });
    showPropertyForm(false);
    showToast(err || msg);
    fetchProperties();
    setCurProperty(EMPTY_PROPERTY);
  };

  return (
    <FormBackdrop>
      <form
        className="form-container"
        onSubmit={handlePropertySubmit}
      >
        <FormTitle title="Add New Property" />
        <Input
          type="text"
          placeholder="Name"
          value={curProperty.name || ""}
          onChange={(e) =>
            setCurProperty({ ...curProperty, name: e.target.value })
          }
        />
        <SelectGroup
          value={curProperty.ptype || ""}
          label="Property Type"
          options={["house", "apartment", "condo"]}
          handleSelect={(value) =>
            setCurProperty({ ...curProperty, ptype: value })
          }
        />
        <Button tl={`Add`} handleClick={handlePropertySubmit} />
        <button onClick={() => showPropertyForm(false)}>Cancel</button>
      </form>
    </FormBackdrop>
  );
}

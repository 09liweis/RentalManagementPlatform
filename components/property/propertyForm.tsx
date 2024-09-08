"use client";
import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import { showToast } from "../common/Toast";
import { EMPTY_PROPERTY, Property } from "@/types/property";
import usePropertyStore from "@/stores/propertyStore";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import SelectGroup from "../common/SelectGroup";

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
    console.log(curProperty);
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
    <section className="bg-slate-950/[0.6] z-10 absolute flex flex-col w-full h-full justify-center items-center top-0 left-0">
      <form
        className="w-full sm:w-3/4 md:w-1/2 lg:w-3/4 flex flex-col gap-5 p-2 shadow-lg bg-white rounded"
        onSubmit={handlePropertySubmit}
      >
        <h1>Property Form</h1>
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
        <Button tl={`Add Property`} handleClick={handlePropertySubmit} />
        <button onClick={() => showPropertyForm(false)}>Cancel</button>
      </form>
    </section>
  );
}

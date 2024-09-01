"use client";
import { fetchData } from "@/utils/http";
import { useState } from "react";
import { showToast } from "../common/Toast";

interface PropertyFormProps {
  showPropertyForm: Function;
}

export default function PropertyForm({ showPropertyForm }: PropertyFormProps) {
  const [name, setName] = useState("");
  const handlePropertySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {msg, err} = await fetchData({url:"/api/properties", method:"POST", body:{name}});
    showPropertyForm(false);
    showToast(err || msg);
  };
  return (
    <section className="absolute flex flex-col w-full h-full justify-center items-center top-0 left-0">
      <form
        className="flex flex-col gap-5 p-2 shadow-lg bg-white rounded"
        onSubmit={handlePropertySubmit}
      >
        <h1>Property Form</h1>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button>Add Property</button>
        <button onClick={() => showPropertyForm(false)}>Cancel</button>
      </form>
    </section>
  );
}

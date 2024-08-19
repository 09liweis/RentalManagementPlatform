"use client";
import { useState } from "react";

interface PropertyFormProps {
  showPropertyForm: Function;
}

export default function PropertyForm({ showPropertyForm }: PropertyFormProps) {
  const [name, setName] = useState("");
  const handlePropertySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/properties", {
      method: "POST",
      headers:{
        "Content-Type":"application/json",
        'Authorization': `Bearer ${localStorage.getItem("auth-token")}`,
      },
      body: JSON.stringify({ name }),
    });
    showPropertyForm(false);
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

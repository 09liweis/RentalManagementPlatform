"use client";
import { useState } from "react";

interface PropertyFormProps {
  showPropertyForm: Function;
}

export default function PropertyForm({showPropertyForm}:PropertyFormProps) {
  const [name, setName] = useState("");
  const handlePropertySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/properties",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({name}),
    });
    showPropertyForm(false);
  };
  return (
    <section className="absolute flex flex-col w-full h-full justify-center items-center top-0 left-0">
      <h1>Property Form</h1>
      <form onSubmit={handlePropertySubmit}>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button>Add Property</button>
      </form>
    </section>
  );
}

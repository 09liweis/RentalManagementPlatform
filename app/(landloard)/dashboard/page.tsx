"use client";

import { useEffect } from "react";

export default function Dashboard() {
  const fetchProperties = async () => {
    const response = await fetch("/api/properties");
    const properties = await response.json();
    console.log(properties);
  };

  useEffect(() => {
    fetchProperties();
  }, []);
  return <div>Dashboard</div>;
}

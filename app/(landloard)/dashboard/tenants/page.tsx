"use client";

import { fetchData } from "@/utils/http";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TenantsPage() {
  const [tenants, setTenants] = useState([]);
  const fetchTenants = async () => {
    const { tenants } = await fetchData({ url: `/api/tenants` });
    if (tenants) {
      setTenants(tenants);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return (
    <>
      <h1 className="page-title">Tenants Page</h1>
      <section className="card-container">
        {tenants.map(({ _id, name }) => (
          <Link className="card" href={`/dashboard/tenants/${_id}`} key={_id}>
            {name}
          </Link>
        ))}
      </section>
    </>
  );
}

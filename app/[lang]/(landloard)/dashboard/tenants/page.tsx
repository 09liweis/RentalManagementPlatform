"use client";

import TenantList from "@/components/tenant/TenantList";
import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";

export default function TenantsPage() {
  const [loading, setLoading] = useState(false);
  const [tenants, setTenants] = useState([]);
  const fetchTenants = async () => {
    setLoading(true);
    const { tenants } = await fetchData({ url: `/api/tenants` });
    if (tenants) {
      setTenants(tenants);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return (
    <>
      <h1 className="page-title">Tenants Page</h1>
      <TenantList tenants={tenants} loading={loading} />
    </>
  );
}

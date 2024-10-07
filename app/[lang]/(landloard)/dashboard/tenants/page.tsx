"use client";

import LinkText from "@/components/common/LinkText";
import LoadingSection from "@/components/common/LoadingSection";
import { fetchData } from "@/utils/http";
import Link from "next/link";
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
      <LoadingSection loading={loading}>
        <section className="card-container">
          {tenants.map(({ _id, name }) => (
            <LinkText className="card" href={`/dashboard/tenants/${_id}`} key={_id} text={name} />
          ))}
        </section>
      </LoadingSection>
    </>
  );
}

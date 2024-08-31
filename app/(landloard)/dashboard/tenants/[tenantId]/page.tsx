"use client";

import LoadingSection from "@/components/common/LoadingSection";
import { showToast } from "@/components/common/Toast";
import { fetchData } from "@/utils/http";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";

export default function TenantPage({
  params,
}: {
  params: { tenantId: string };
}) {
  const { tenantId } = params;

  const [rents, setRents] = useState([]);
  const [tenant, setTenant] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const fetchRents = async () => {
    setLoading(true);
    const { rents, tenant, err } = await fetchData({
      url: `/api/tenants/${tenantId}/rents`,
    });
    setLoading(false);
    if (err) {
      showToast(err);
    } else {
      setRents(rents);
      setTenant(tenant);
    }
  };

  const [rent, setRent] = useState<any>({});
  const handleRentSubmit = async (e: any) => {
    e.preventDefault();
    const method = rent?._id ? "PUT" : "POST";
    const { msg, err } = await fetchData({
      url: `/api/tenants/${tenantId}/rents`,
      method,
      body: rent,
    });
    showToast(msg || err);
    setRent({});
    fetchRents();
  };

  useEffect(() => {
    fetchRents();
  }, []);

  return (
    <>
      <h1 className="page-title">Tenant {tenant?.name}</h1>

      <section>
        <Input
          placeholder="Amount"
          value={rent?.amount || ""}
          type="number"
          onChange={(e) => setRent({ ...rent, amount: e.target.value })}
        />
        <Input
          placeholder="Start Date"
          value={rent?.startDate || ""}
          type="date"
          onChange={(e) => setRent({ ...rent, startDate: e.target.value })}
        />
        <Button tl="Add Rent" handleClick={handleRentSubmit} />
      </section>

      <LoadingSection loading={loading}>
        <section className="card-container">
          {rents.map(({ _id, amount, startDate }) => (
            <div className="card" key={_id}>
              {startDate}: ${amount}
            </div>
          ))}
        </section>
      </LoadingSection>
    </>
  );
}

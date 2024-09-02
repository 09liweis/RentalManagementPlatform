"use client";

import LoadingSection from "@/components/common/LoadingSection";
import { showToast } from "@/components/common/Toast";
import { fetchData } from "@/utils/http";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TenantPage({
  params,
}: {
  params: { tenantId: string };
}) {
  const { tenantId } = params;

  const [rents, setRents] = useState([]);
  const [tenant, setTenant] = useState<any>({});
  const [room, setRoom] = useState<any>({});
  const [property, setProperty] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const fetchRents = async () => {
    setLoading(true);
    const { rents, tenant, room,property, err } = await fetchData({
      url: `/api/tenants/${tenantId}/rents`,
    });
    setLoading(false);
    if (err) {
      showToast(err);
    } else {
      setRents(rents);
      setTenant(tenant);
      setRoom(room);
      setProperty(property);
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

  const handleDeleteRent = async (rentId: string) => {
    const { msg, err } = await fetchData({
      url: `/api/rents/${rentId}`,
      method: "DELETE",
    });
    showToast(msg || err);
    fetchRents();
  }

  useEffect(() => {
    fetchRents();
  }, []);

  return (
    <>
      <Link className="page-title" href={`/dashboard/properties/${property?._id}`}>Property: {property?.name}</Link>
      <Link className="page-title" href={`/dashboard/rooms/${room?._id}`}>Room: {room?.name}</Link>
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
            <article className="card" key={_id}>
              <span>{startDate}: ${amount}</span>
              <Button tl="Delete" handleClick={() => handleDeleteRent(_id)} />
            </article>
          ))}
        </section>
      </LoadingSection>
    </>
  );
}

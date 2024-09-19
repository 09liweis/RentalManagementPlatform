"use client";

import LoadingSection from "@/components/common/LoadingSection";
import { showToast } from "@/components/common/Toast";
import { fetchData } from "@/utils/http";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import Link from "next/link";
import SelectGroup from "@/components/common/SelectGroup";
import { RENT_STATUS_ARRAY } from "@/types/rent";

const RENT_FIELDS = [
  {placeholder: "Amount", name:"amount",inputType:"number"},
  {placeholder: "Date", name:"startDate",inputType:"date"},
];

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
    const url = rent?._id ? `/api/rents/${rent?._id}` : `/api/tenants/${tenantId}/rents`
    const { msg, err } = await fetchData({
      url,
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

      <section className="flex flex-col gap-3">
        {RENT_FIELDS.map(({placeholder,inputType,name})=>
          <Input
            key={name}
            placeholder={placeholder}
            value={rent[name] || ""}
            type={inputType}
            onChange={(e) => setRent({ ...rent, [name]: e.target.value })}
          />
        )}
        <SelectGroup
          value={rent.status || ""}
          label="Rent Status"
          options={RENT_STATUS_ARRAY}
          handleSelect={(value) =>
            setRent({ ...rent, status: value })
          }
        />
        <Button tl="Add Rent" handleClick={handleRentSubmit} />
      </section>

      <LoadingSection loading={loading}>
        <section className="card-container">
          {rents.map(({ _id, amount, startDate,status }) => (
            <article className="card" key={_id}>
              <p className="rent-date">{startDate}</p>
              <div className="flex justify-between items-center my-2">
                <p className="text-xl font-semibold">${amount}</p>
                <p className={`rent-status ${status}`}>{status}</p>
              </div>
              <div className="flex justify-between">
                <Button tl="Edit" handleClick={()=>setRent({_id,amount,startDate,status})} />
                <Button tp="danger" tl="Delete" handleClick={() => handleDeleteRent(_id)} />
              </div>
            </article>
          ))}
        </section>
      </LoadingSection>
    </>
  );
}

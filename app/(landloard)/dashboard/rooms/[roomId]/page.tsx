"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchData } from "@/utils/http";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { showToast } from "@/components/common/Toast";
import LoadingSection from "@/components/common/LoadingSection";

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const { roomId } = params;
  const [loading, setLoading] = useState(false);
  const [tenants, setTenants] = useState<any[]>([]);
  const [room, setRoom] = useState<any>({});
  const [property, setProperty] = useState<any>({});

  const fetchTenants = async () => {
    setLoading(true);
    const { tenants, room, property, err } = await fetchData({
      url: `/api/rooms/${roomId}/tenants`,
    });
    if (err) {
      showToast(err);
    } else {
      setTenants(tenants);
      setRoom(room);
      setProperty(property);
    }
    setLoading(false);
  };

  const [tenant, setTenant] = useState<any>({});
  const tenantFields = [
    {field:"name",inputType:"text",placeholder:"Name"},
    {field:"startDate",inputType:"date",placeholder:"Start Date"},
    {field:"endDate",inputType:"date",placeholder:"End Date"},
  ];
  
  const handleSubmit = async () => {
    const method = tenant?._id ? "PUT" : "POST";
    const url = tenant?._id ? `/api/tenants/${tenant?._id}` : `/api/rooms/${roomId}/tenants`;
    const { msg, err } = await fetchData({
      url,
      method,
      body: tenant,
    });
    if (err) {
      showToast(err);
    } else {
      showToast(msg);
      fetchTenants();
      setTenant({});
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return (
    <>
      <Link href={`/dashboard/properties/${property?._id}`} className="page-title">Property: {property?.name}</Link>
      <h2>Room: {room?.name}</h2>
      <section className="flex flex-col gap-3">
        {tenantFields.map(({field,inputType,placeholder})=>
          <Input
            type={inputType}
            placeholder={placeholder}
            value={tenant[field]||''}
            onChange={(e) => setTenant({...tenant,[field]:e.target.value})}
          />
        )}        
        <Button tl={`${tenant?._id ? 'Update' : 'Add'} Tenant`} handleClick={handleSubmit} />
      </section>

      <LoadingSection loading={loading}>
        <section className="card-container">
          {tenants.map((t) => (
            <article key={t._id} className="card">
            <Link
              href={`/dashboard/tenants/${t._id}`}
            >
              {t.name}
            </Link>
              <span className="text-red-400" onClick={()=>setTenant(t)}>Edit</span>
              </article>
          ))}
        </section>
      </LoadingSection>
    </>
  );
}

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchData } from "@/utils/http";

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const {roomId} = params;
  const [tenants, setTenants] = useState<any[]>([]);

  const fetchTenants = async () => {
    const { tenants, err } = await fetchData({
      url: `/api/rooms/${roomId}/tenants`,
    });
    if (tenants) {
      setTenants(tenants);
    } else {
      //handle Error
    }
  };

  const [name, setName] = useState("");
  const [startDate, setDate] = useState("");
  const handleSubmit = async () => {
    const { msg, err } = await fetchData({
      url: `/api/rooms/${roomId}/tenants`,
      method: "POST",
      body: { name, startDate },
    });
    fetchTenants();
    setName("");
    setDate("");
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return (
    <>
      <h1 className="page-title">Room Page {roomId}</h1>
      <section className="flex flex-col gap-3">
        <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Start Date" type="date" value={startDate} onChange={(e) => setDate(e.target.value)} />
        <button onClick={handleSubmit}>Add Tenant</button>
      </section>
      <section>
        {tenants.map((t) => (
          <Link href={`/dashboard/tenants/${t._id}`} key={t._id}>
            {t.name}
          </Link>
        ))}
      </section>
    </>
  );
}

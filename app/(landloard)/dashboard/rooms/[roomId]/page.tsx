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
  const handleSubmit = async () => {
    const { msg, err } = await fetchData({
      url: `/api/rooms/${roomId}/tenants`,
      method: "POST",
      body: { name, room: roomId },
    });
    fetchTenants();
    setName("");
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return (
    <>
      <h1>Room Page {roomId}</h1>
      <section>
        <input value={name} onChange={(e) => setName(e.target.value)} />{" "}
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

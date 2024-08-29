"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchData } from "@/utils/http";
import { showToast } from "@/components/common/Toast";
import LoadingSection from "@/components/common/LoadingSection";

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const { roomId } = params;
  const [loading, setLoading] = useState(false);
  const [tenants, setTenants] = useState<any[]>([]);
  const [room, setRoom] = useState<any>({});

  const fetchTenants = async () => {
    setLoading(true);
    const { tenants, room, err } = await fetchData({
      url: `/api/rooms/${roomId}/tenants`,
    });
    if (err) {
      showToast(err);
    } else {
      setTenants(tenants);
      setRoom(room);
    }
    setLoading(false);
  };

  const [name, setName] = useState("");
  const [startDate, setDate] = useState("");
  const handleSubmit = async () => {
    const { msg, err } = await fetchData({
      url: `/api/rooms/${roomId}/tenants`,
      method: "POST",
      body: { name, startDate },
    });
    if (err) {
      showToast(err);
    } else {
      showToast(msg);
      fetchTenants();
      setName("");
      setDate("");
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return (
    <>
      <h1 className="page-title">Room: {room?.name}</h1>
      <section className="flex flex-col gap-3">
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleSubmit}>Add Tenant</button>
      </section>

      <LoadingSection loading={loading}>
        <section className="card-container">
          {tenants.map((t) => (
            <Link
              className="card"
              href={`/dashboard/tenants/${t._id}`}
              key={t._id}
            >
              {t.name}
            </Link>
          ))}
        </section>
      </LoadingSection>
    </>
  );
}

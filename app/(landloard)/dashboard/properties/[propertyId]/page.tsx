"use client";

import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Room } from "@/types/room";
import { Property } from "@/types/property";
import LoadingSection from "@/components/common/LoadingSection";

export default function PropertyPage({
  params,
}: {
  params: { propertyId: string };
}) {
  const { propertyId } = params;

  const [loading, setLoading] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [property, setProperty] = useState<Property>();
  const [rooms, setRooms] = useState<Room[]>([]);

  const fetchRooms = async () => {
    setLoading(true);
    const { property, rooms, err } = await fetchData({
      url: `/api/properties/${propertyId}/rooms`,
    });
    if (property) {
      setProperty(property);
    }
    if (Array.isArray(rooms)) {
      setRooms(rooms);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleRoomSubmit = async () => {
    const { err, msg } = await fetchData({
      url: `/api/properties/${propertyId}/rooms`,
      method: "POST",
      body: {
        name: roomName,
      },
    });
    fetchRooms();
    setRoomName("");
  };

  return (
    <>
      <h1 className="page-title">Property {property?.name}</h1>

      <input
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <a href="#" onClick={handleRoomSubmit}>
        Add Room
      </a>

      <LoadingSection loading={loading}>
        <section className="card-container flex-col">
          {rooms.map((room) => (
            <Link
              className="card"
              href={`/dashboard/rooms/${room._id}`}
              key={room.name}
            >
              <p>{room.name}</p>
            </Link>
          ))}
        </section>
      </LoadingSection>
    </>
  );
}

"use client";

import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Room } from "@/types/room";

export default function PropertyPage({
  params,
}: {
  params: { propertyId: string };
}) {
  const { propertyId } = params;

  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);

  const fetchRooms = async () => {
    const { rooms, err } = await fetchData({
      url: `/api/properties/${propertyId}/rooms`,
    });
    if (Array.isArray(rooms)) {
      setRooms(rooms);
    }
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
      <h1>Property {propertyId}</h1>

      <input
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <a href="#" onClick={handleRoomSubmit}>
        Add Room
      </a>

      <section>
        {rooms.map((room) => (
          <Link href={`/dashboard/rooms/${room._id}`} key={room.name}>
            <p>{room.name}</p>
          </Link>
        ))}
      </section>
    </>
  );
}

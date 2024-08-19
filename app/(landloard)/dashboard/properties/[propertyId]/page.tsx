"use client";

import { useEffect, useState } from "react";

export default function PropertyPage({
  params,
}: {
  params: { propertyId: string };
}) {
  const { propertyId } = params;

  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState<any[]>([]);

  const fetchRooms = async () => {
    fetch(`/api/properties/${propertyId}/rooms`);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleRoomSubmit = async () => {
    fetch("/api/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
      body: JSON.stringify({
        propertyId,
        name: roomName,
      }),
    });
    setRooms([...rooms, { name: roomName }]);
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
          <p key={room._id}>{room.name}</p>
        ))}
      </section>
    </>
  );
}

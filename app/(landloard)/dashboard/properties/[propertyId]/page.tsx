"use client";

import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Room } from "@/types/room";
import { Property } from "@/types/property";
import LoadingSection from "@/components/common/LoadingSection";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { showToast } from "@/components/common/Toast";

export default function PropertyPage({
  params,
}: {
  params: { propertyId: string };
}) {
  const { propertyId } = params;

  const [loading, setLoading] = useState(false);
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
    if (err) {
      showToast(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const [roomName, setRoomName] = useState("");
  const [room, setRoom] = useState<Room>({name:'',property:''});
  const handleRoomSubmit = async () => {
    const method = room?._id ? "PUT" : "POST";
    const url = room?._id ? `/api/rooms/${room._id}` : `/api/properties/${propertyId}/rooms`;
    const { err, msg } = await fetchData({
      url,
      method,
      body: room,
    });
    fetchRooms();
    showToast(err || msg);
    setRoom({name:'',property:''});
  };

  return (
    <>
      <h1 className="page-title">Property: {property?.name}</h1>

      <Input
        type="text"
        placeholder="Room Name"
        value={room['name']||''}
        onChange={(e) => setRoom({...room,name:e.target.value})}
      />
      <Button tl={`${room?._id ? 'Update' : 'Add' } Room`} handleClick={handleRoomSubmit} />

      <LoadingSection loading={loading}>
        <section className="card-container flex-col">
          {rooms.map((room) => (
            <article key={room._id} className="card">
            <Link
              href={`/dashboard/rooms/${room._id}`}
              key={room.name}
            >
              <p>{room.name}</p>
            </Link>
              <span className="text-red-400" onClick={()=>setRoom(room)}>Edit</span>
              </article>
          ))}
        </section>
      </LoadingSection>
    </>
  );
}

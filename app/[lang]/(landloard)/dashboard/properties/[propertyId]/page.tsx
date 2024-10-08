"use client";

import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Room, ROOM_TP_ARRAY } from "@/types/room";
import { Property } from "@/types/property";
import LoadingSection from "@/components/common/LoadingSection";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { showToast } from "@/components/common/Toast";
import RentCards from "@/components/dashboard/RentCards";
import FormBackdrop from "@/components/common/form/FormBackdrop";
import CostForm from "@/components/property/CostForm";
import { Cost } from "@/types/cost";
import useAppStore from "@/stores/appStore";
import LinkText from "@/components/common/LinkText";
import SelectGroup from "@/components/common/SelectGroup";

export default function PropertyPage({
  params,
}: {
  params: { propertyId: string };
}) {
  const {t} = useAppStore();
  const { propertyId } = params;

  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState<Property>();
  const [rooms, setRooms] = useState<Room[]>([]);

  const fetchPropertyRooms = async () => {
    setLoading(true);
    const { property, rooms, err } =
      await fetchData({
        url: `/api/properties/${propertyId}/rooms`,
      });
    if (err) {
      showToast(err);
    } else {
      setProperty(property);
      setRooms(rooms);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPropertyRooms();
  }, []);

  const [room, setRoom] = useState<Room>({ name: "", property: "" });
  const [showRoomForm, setShowRoomForm] = useState(false);
  const handleRoomSubmit = async () => {
    const method = room?._id ? "PUT" : "POST";
    const url = room?._id
      ? `/api/rooms/${room._id}`
      : `/api/properties/${propertyId}/rooms`;
    const { err, msg } = await fetchData({
      url,
      method,
      body: room,
    });
    fetchPropertyRooms();
    showToast(err || msg);
    setRoom({ name: "", property: "" });
    setShowRoomForm(false);
  };

  const [costs, setCosts] = useState<Cost[]>([]);
  const [showCostForm, setShowCostForm] = useState(false);

  return (
    <>
      <h1 className="page-title">Property: {property?.name}</h1>

      <RentCards propertyId={propertyId} />

      <LoadingSection loading={loading}>
        <section className="card-container flex-col">
          {rooms.map((room) => (
            <article key={room._id} className="card flex justify-between items-center">
              <LinkText className="room-name" href={`/dashboard/rooms/${room._id}`} key={room._id} text={room?.name||''} />
              <Button tl={t('dashboard.Edit')} handleClick={() => {setRoom(room);setShowRoomForm(true);}} />
            </article>
          ))}
        </section>
      </LoadingSection>

      <Button tl={t('dashboard.Add')} handleClick={() => setShowRoomForm(true)} />
      
      {showRoomForm && <FormBackdrop>
        <section className="form-container">
          <Input
            type="text"
            placeholder={t('dashboard.Name')}
            value={room["name"] || ""}
            onChange={(e) => setRoom({ ...room, name: e.target.value })}
          />
          <SelectGroup value={room["tp"]||""} options={ROOM_TP_ARRAY} label="Room Type" handleSelect={(value)=>setRoom({...room,tp:value})} />
          <Button
            tl={`${room?._id ? t("dashboard.Update") : t("dashboard.Add")}`}
            handleClick={handleRoomSubmit}
          />
          <Button tl={t('dashboard.Cancel')} handleClick={()=>{setShowRoomForm(false);setRoom({})}} />
        </section>
      </FormBackdrop> }

      {costs.map((cost)=><article key={cost._id}>{cost.tp} - {cost.amount}</article>)}
      <Button tl={'Add Cost'} handleClick={() => setShowCostForm(true)} />
      {showCostForm && <CostForm showCostForm={setShowCostForm} propertyId={propertyId} />}
    </>
  );
}

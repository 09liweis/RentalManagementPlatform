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
import usePropertyStore from "@/stores/propertyStore";
import Properties from "./Properties";

interface ScreenProps {
    propertyId?: string
}
export default function Screen({propertyId}:ScreenProps) {
  const {t} = useAppStore();
  const {costs, rooms} = usePropertyStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {

  }, []);

  const [room, setRoom] = useState<Room>({ name: "" });
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
    // fetchPropertyRooms();
    showToast(err || msg);
    setRoom({ name: "" });
    setShowRoomForm(false);
  };

  const [showCostForm, setShowCostForm] = useState(false);

  return (
    <>
      <RentCards propertyId={propertyId} />

      <Properties />

      <section className="grid sm:grid-cols-2 gap-4">
        <section className="bg-white rounded-lg shadow-md p-4">
          <LoadingSection loading={loading}>
            <section className="grid gap-4">
              {rooms.map((room) => (
                <article key={room._id} className="bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition-shadow flex justify-between items-center">
                  <div>
                    <LinkText className="text-lg font-semibold text-gray-800" href={`/dashboard/rooms/${room._id}`} text={room?.name || ''} />
                    <p className="text-gray-600">{t('home.Tenant')}: {room.tenant?.name}</p>
                  </div>
                  <Button tl={t('dashboard.Edit')} handleClick={() => { setRoom(room); setShowRoomForm(true); }} />
                </article>
              ))}
            </section>
          </LoadingSection>
          <Button tl={t('dashboard.Add')} handleClick={() => setShowRoomForm(true)} />
        </section>

        <section>
          {costs.map((cost)=><article className="card" key={cost._id}>{t(cost.tpTxt||'')} - ${cost.amount}</article>)}
          <Button tl={'Add Cost'} handleClick={() => setShowCostForm(true)} />
        </section>

      </section>
      
      {showRoomForm && <FormBackdrop>
        <section className="form-container">
          <Input
            type="text"
            placeholder={t('dashboard.Name')}
            value={room["name"] || ""}
            onChange={(e) => setRoom({ ...room, name: e.target.value })}
          />
          <SelectGroup value={room["tp"]||""} options={ROOM_TP_ARRAY} label="Room Type" handleSelect={(value)=>setRoom({...room,tp:value})} />
          <div className="flex justify-between">
            <Button
              tl={`${room?._id ? t("dashboard.Update") : t("dashboard.Add")}`}
              handleClick={handleRoomSubmit}
            />
            <Button tl={t('dashboard.Cancel')} handleClick={()=>{setShowRoomForm(false);setRoom({})}} tp="danger" />
          </div>
        </section>
      </FormBackdrop> }

      {showCostForm && propertyId && <CostForm showCostForm={setShowCostForm} propertyId={propertyId} />}
    </>
  );
}

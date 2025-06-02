"use client";

import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import { Room, ROOM_TP_ARRAY } from "@/types/room";
import LoadingSection from "@/components/common/LoadingSection";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { showToast } from "@/components/common/Toast";
import RentCards from "@/components/dashboard/RentCards";
import FormBackdrop from "@/components/common/form/FormBackdrop";
import CostForm from "@/components/property/CostForm";
import useAppStore from "@/stores/appStore";
import FormWrapper from "@/components/common/form/FormWrapper";
import SelectGroup from "@/components/common/SelectGroup";
import usePropertyStore from "@/stores/propertyStore";
import Properties from "./Properties";
import RoomList from "../room/RoomList";
import RoomForm from "../room/RoomForm";
import TenantsScreen from "../tenant/TenantsScreen";
import RentsScreen from "../rent/RentsScreen";

interface ScreenProps {
  propertyId?: string;
  roomId?: string;
  tenantId?: string
}
export default function Screen({ propertyId, roomId, tenantId }: ScreenProps) {
  const { t } = useAppStore();
  const { costs, rooms, curProperty,curRoom, curTenant } = usePropertyStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

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
      <RentCards propertyId={propertyId} roomId={roomId} tenantId={tenantId} />

      <Properties />

      {curProperty?._id && (
        <section className="mt-8 pt-4 border-t-4 border-purple-700">
          <div className="flex justify-between items-center">
            <h1 className="page-title">Costs</h1>
            <Button tl={"Add Cost"} handleClick={() => setShowCostForm(true)} />
          </div>
          {costs.map((cost) => (
            <article className="card" key={cost._id}>
              {t(cost.tpTxt || "")} - ${cost.amount}
            </article>
          ))}
        </section>
      )}
      {showCostForm && (
        <CostForm showCostForm={setShowCostForm} />
      )}

      {curProperty?._id && (
        <RoomList rooms={rooms} setRoom={setRoom} setShowRoomForm={setShowRoomForm} />
      )}

      {showRoomForm && (
        <RoomForm room={room} setRoom={setRoom} handleRoomSubmit={handleRoomSubmit} setShowRoomForm={setShowRoomForm} />
      )}

      {curRoom?._id && <TenantsScreen roomId={curRoom?._id} />}

      {curTenant?._id && <RentsScreen tenantId={curTenant?._id} />}
    </>
  );
}

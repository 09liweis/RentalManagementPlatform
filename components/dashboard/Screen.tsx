"use client";

import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Room } from "@/types/room";
import Button from "@/components/common/Button";
import { showToast } from "@/components/common/Toast";
import RentCards from "@/components/dashboard/RentCards";
import CostForm from "@/components/property/CostForm";
import CostList from "@/components/dashboard/CostList";
import useAppStore from "@/stores/appStore";
import usePropertyStore from "@/stores/propertyStore";
import Properties from "./Properties";
import RoomList from "../room/RoomList";
import RoomForm from "../room/RoomForm";

interface ScreenProps {
  propertyId?: string;
  roomId?: string;
  tenantId?: string;
}
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const formVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

export default function Screen({ propertyId, roomId, tenantId }: ScreenProps) {
  const { t } = useAppStore();
  const { costs, rooms, curProperty, curRoom, curTenant, fetchPropertyStats } =
    usePropertyStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const [room, setRoom] = useState<Room>({ name: "" });
  const [showRoomForm, setShowRoomForm] = useState(false);
  const handleRoomSubmit = async (e: any) => {
    console.log(e);
    e.preventDefault();
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
    fetchPropertyStats({ propertyId });
  };

  const [showCostForm, setShowCostForm] = useState(false);

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <RentCards
          propertyId={propertyId}
          roomId={roomId}
          tenantId={tenantId}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Properties />
      </motion.div>

      {curProperty?._id && (
        <motion.div variants={itemVariants}>
          <CostList
            costs={costs}
            onAddCost={() => setShowCostForm(true)}
            t={t}
          />
        </motion.div>
      )}

      {showCostForm && <CostForm showCostForm={setShowCostForm} />}

      {curProperty?._id && (
        <motion.div variants={itemVariants}>
          <RoomList
            rooms={rooms}
            setRoom={setRoom}
            setShowRoomForm={setShowRoomForm}
          />
        </motion.div>
      )}

      {showRoomForm && (
        <RoomForm
          room={room}
          setRoom={setRoom}
          handleRoomSubmit={handleRoomSubmit}
          setShowRoomForm={setShowRoomForm}
        />
      )}
    </motion.div>
  );
}

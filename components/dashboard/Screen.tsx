"use client";

import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const formVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

export default function Screen({ propertyId, roomId, tenantId }: ScreenProps) {
  const { t } = useAppStore();
  const { costs, rooms, curProperty, curRoom, curTenant } = usePropertyStore();

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
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <RentCards propertyId={propertyId} roomId={roomId} tenantId={tenantId} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Properties />
      </motion.div>

      {curProperty?._id && (
        <motion.section 
          variants={itemVariants}
          className="mt-8 pt-4 border-t-4 border-purple-700"
        >
          <div className="flex justify-between items-center">
            <h1 className="page-title">Costs</h1>
            <Button tl={"Add Cost"} handleClick={() => setShowCostForm(true)} />
          </div>
          <motion.div className="space-y-4">
            {costs.map((cost) => (
              <motion.article
                key={cost._id}
                className="card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {t(cost.tpTxt || "")} - ${cost.amount}
              </motion.article>
            ))}
          </motion.div>
        </motion.section>
      )}

      <AnimatePresence>
        {showCostForm && (
          <motion.div
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <CostForm showCostForm={setShowCostForm} />
          </motion.div>
        )}
      </AnimatePresence>

      {curProperty?._id && (
        <motion.div variants={itemVariants}>
          <RoomList rooms={rooms} setRoom={setRoom} setShowRoomForm={setShowRoomForm} />
        </motion.div>
      )}

      <AnimatePresence>
        {showRoomForm && (
          <motion.div
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <RoomForm 
              room={room} 
              setRoom={setRoom} 
              handleRoomSubmit={handleRoomSubmit} 
              setShowRoomForm={setShowRoomForm} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {curRoom?._id && (
        <motion.div variants={itemVariants}>
          <TenantsScreen roomId={curRoom?._id} />
        </motion.div>
      )}

      {curTenant?._id && (
        <motion.div variants={itemVariants}>
          <RentsScreen tenantId={curTenant?._id} />
        </motion.div>
      )}
    </motion.div>
  );
}
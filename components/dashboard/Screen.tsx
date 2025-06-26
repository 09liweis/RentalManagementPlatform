"use client";

import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Room } from "@/types/room";
import Button from "@/components/common/Button";
import { showToast } from "@/components/common/Toast";
import RentCards from "@/components/dashboard/RentCards";
import CostForm from "@/components/property/CostForm";
import useAppStore from "@/stores/appStore";
import usePropertyStore from "@/stores/propertyStore";
import Properties from "./Properties";
import RoomList from "../room/RoomList";
import RoomForm from "../room/RoomForm";

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
  const { costs, rooms, curProperty, curRoom, curTenant, fetchPropertyStats } = usePropertyStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const [room, setRoom] = useState<Room>({ name: "" });
  const [showRoomForm, setShowRoomForm] = useState(false);
  const handleRoomSubmit = async (e: { preventDefault: () => void; }) => {
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
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="page-title">Costs</h1>
              <p className="text-gray-500 text-sm">
                {costs.length} items • Total: ${costs.reduce((sum, cost) => sum + (cost.amount || 0), 0).toFixed(2)}
              </p>
            </div>
            <Button onClick={() => setShowCostForm(true)}>Add Cost</Button>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="grid grid-cols-12 bg-gray-100 p-3 font-medium text-gray-600 text-sm">
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Date</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>
            
            {costs.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No costs recorded yet. Click "Add Cost" to get started.
              </div>
            ) : (
              <motion.div>
                {costs.map((cost, index) => (
                  <motion.div
                    key={cost._id}
                    className={`grid grid-cols-12 p-3 items-center border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="col-span-3 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                        <span className="text-purple-600 text-xs font-bold">
                          {(t(cost.tpTxt || "").charAt(0) || "C").toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium">{t(cost.tpTxt || "")}</span>
                    </div>
                    <div className="col-span-3 text-gray-600">
                      {cost.date ? new Date(cost.date).toLocaleDateString() : 'N/A'}
                    </div>
                    <div className="col-span-2 text-right font-medium text-gray-900">
                      ${cost.amount?.toFixed(2) || '0.00'}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

        {showCostForm && (
            <CostForm showCostForm={setShowCostForm} />
        )}

      {curProperty?._id && (
        <motion.div variants={itemVariants}>
          <RoomList rooms={rooms} setRoom={setRoom} setShowRoomForm={setShowRoomForm} />
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
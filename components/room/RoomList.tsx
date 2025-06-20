import RoomCard from "./RoomCard";
import Button from "../common/Button";
import useAppStore from "@/stores/appStore";
import { Room } from "@/types/room";
import { motion } from "framer-motion";

interface RoomListProps {
  rooms: Room[];
  setShowRoomForm?: (show: boolean) => void;
  setRoom?: (room: Room) => void;
}

// Animation variants for empty state
const emptyStateVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};

export default function RoomList({
  rooms,
  setShowRoomForm,
  setRoom,
}: RoomListProps) {
  const { t } = useAppStore();

  return (
    <section className="mt-8 pt-4 border-t-4 border-green-700">
      <div className="flex justify-between items-center">
        <h1 className="page-title">Rooms</h1>
        {setShowRoomForm && (
          <Button
            tl={t("dashboard.Add")}
            handleClick={() => setShowRoomForm(true)}
          />
        )}
      </div>

      {rooms && rooms.length > 0 ? (
        <section className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-lg mb-3">
          {rooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              handleEditRoom={() => {
                if (setRoom) {
                  setRoom(room);
                }
                if (setShowRoomForm) {
                  setShowRoomForm(true);
                }
              }}
            />
          ))}
        </section>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center py-16 px-8"
          variants={emptyStateVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="relative mb-6" variants={iconVariants}>
            {/* Decorative background circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full transform scale-150 opacity-50"></div>

            {/* Main icon */}
            <div className="relative bg-white rounded-full p-6 shadow-lg border border-green-100">
              <svg
                className="w-16 h-16 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
          </motion.div>

          <motion.div
            className="text-center max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No Rooms Yet
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Start organizing your property by adding rooms. Each room can have
              its own tenants, rent tracking, and management details.
            </p>

            {setShowRoomForm && (
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  tl="Add Your First Room"
                  handleClick={() => setShowRoomForm(true)}
                  tp="primary"
                  className="px-8 py-3 text-base font-semibold shadow-lg"
                />
              </motion.div>
            )}
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-green-200 rounded-full opacity-60 animate-pulse"></div>
          <div
            className="absolute top-1/3 right-1/4 w-3 h-3 bg-emerald-200 rounded-full opacity-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-green-300 rounded-full opacity-50 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </motion.div>
      )}
    </section>
  );
}

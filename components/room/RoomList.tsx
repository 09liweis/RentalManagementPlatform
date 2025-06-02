import RoomCard from "./RoomCard";
import Button from "../common/Button";
import useAppStore from "@/stores/appStore";
import { Room } from "@/types/room";

interface RoomListProps {
  rooms: Room[];
  setShowRoomForm: (show: boolean) => void;
  setRoom: (room: Room) => void
}

export default function RoomList({ rooms, setShowRoomForm, setRoom }: RoomListProps) {
  const { t } = useAppStore();
  return (
    <section className="mt-8 pt-4 border-t-4 border-green-700">
        <div className="flex justify-between items-center">
          <h1 className="page-title">Rooms</h1>
          <Button
            tl={t("dashboard.Add")}
            handleClick={() => setShowRoomForm(true)}
          />
        </div>
        <section className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-lg mb-3">
          {rooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              handleEditRoom={() => {
                setRoom(room);
                setShowRoomForm(true);
              }}
            />
          ))}
        </section>
    </section>
  )
}
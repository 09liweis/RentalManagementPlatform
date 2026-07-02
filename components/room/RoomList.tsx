import Button from "../common/Button";
import EmptyRooms from "./EmptyRooms";
import RoomTable from "./RoomTable";
import useAppStore from "@/stores/appStore";
import { Room } from "@/types/room";

interface RoomListProps {
  rooms: Room[];
  setShowRoomForm?: (show: boolean) => void;
  setRoom?: (room: Room) => void;
}

export default function RoomList({
  rooms,
  setShowRoomForm,
  setRoom,
}: RoomListProps) {
  const { t } = useAppStore();

  const handleEdit = (room: Room) => {
    if (setRoom) setRoom(room);
    if (setShowRoomForm) setShowRoomForm(true);
  };

  return (
    <section className="mt-8 pt-4 border-t-4 border-green-700">
      <div className="flex justify-between items-center">
        <h1 className="page-title">Rooms</h1>
        {setShowRoomForm && (
          <Button onClick={() => setShowRoomForm(true)}>
            {t("dashboard.Add")}
          </Button>
        )}
      </div>

      {rooms && rooms.length > 0 ? (
        <RoomTable rooms={rooms} onEdit={handleEdit} />
      ) : (
        <EmptyRooms
          onAddRoom={setShowRoomForm ? () => setShowRoomForm(true) : undefined}
        />
      )}
    </section>
  );
}

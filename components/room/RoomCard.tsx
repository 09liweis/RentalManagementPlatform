import useAppStore from "@/stores/appStore";
import Button from "../common/Button";
import LinkText from "../common/LinkText";

export default function RoomCard({room, handleEditRoom}:any) {
  const { t } = useAppStore();
  return (
    <article
      className="rounded-lg shadow-md hover:shadow-lg p-4 transition-shadow flex justify-between items-center"
    >
      <div>
        <LinkText
          className="text-lg font-semibold text-gray-800"
          href={`/dashboard/rooms/${room._id}`}
          text={room?.name || ""}
        />
        <p className="text-gray-600">
          {t("home.Tenant")}: {room.tenant?.name}
        </p>
      </div>
      <Button
        tl={t("dashboard.Edit")}
        handleClick={handleEditRoom}
      />
    </article>
  );
}

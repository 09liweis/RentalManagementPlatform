import useAppStore from "@/stores/appStore";
import Button from "../common/Button";
import LinkText from "../common/LinkText";
import usePropertyStore from "@/stores/propertyStore";

export default function RoomCard({ room, handleEditRoom }: any) {
  const { t } = useAppStore();
  const { curRoom } = usePropertyStore();

  const StatusIndicator = () => {
    if (!room.tenant) {
      return (
        <div className="flex items-center text-sm">
          <svg
            className="w-4 h-4 mr-2 text-emerald-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-emerald-600 font-medium">
            {t("room.Available")}
          </span>
        </div>
      );
    }

    return (
      <>
      <div className="flex items-center text-gray-600">
        <svg
          className="w-4 h-4 mr-2 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <p className="text-sm">
          {t("home.Tenant")}:
          <span className="font-medium ml-1">{room.tenant?.name}</span>
        </p>
      </div>
        {room.rent && 
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-gray-500">$</span>
              <p className="text-lg font-bold text-gray-900">{room.rent.amount}</p>
            </div>
            <div
              className={`
              px-2 py-1 rounded-full text-xs font-medium transition-colors duration-300
              ${room.rent.status === "paid" ? "bg-emerald-100 text-emerald-700" : ""}
              ${room.rent.status === "pending" ? "bg-amber-100 text-amber-700" : ""}
              ${!["paid", "pending"].includes(room.rent.status) ? "bg-gray-100 text-gray-700" : ""}
            `}
            >
              {t(room.rent.status)}
            </div>
          </div>
        }
      </>
    );
  };

  const isSelected = curRoom?._id == room._id;
  const hasSelected = curRoom?._id;

  return (
    <article
      className={`bg-white rounded-xl shadow-sm hover:shadow-md p-3 transition-all duration-300 border ${isSelected ? "border-blue-500 hover:border-blue-800" : "border-gray-100 hover:border-gray-200"} transform hover:-translate-y-1`}
    >
      <div className="flex justify-between items-center">
        <LinkText
          className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors
                     inline-block hover:scale-[1.02] transform duration-200"
          href={`/dashboard/rooms/${room._id}`}
          text={room?.name || ""}
        />
        {(isSelected || !hasSelected) && handleEditRoom &&
        <Button
          tl={t("dashboard.Edit")}
          tp="primary"
          outline={true}
          size="sm"
          handleClick={handleEditRoom}
          className="hover:scale-105 transform transition-transform duration-200"
        />}
      </div>
      <div className="space-y-1">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span className="text-sm text-gray-500">{room.tpTxt}</span>
        </div>
        <StatusIndicator />
      </div>
    </article>
  );
}
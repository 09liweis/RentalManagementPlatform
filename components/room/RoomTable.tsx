"use client";

import LinkText from "../common/LinkText";
import Button from "../common/Button";
import useAppStore from "@/stores/appStore";
import usePropertyStore from "@/stores/propertyStore";
import { Room } from "@/types/room";
import { motion } from "framer-motion";

interface RoomTableProps {
  rooms: Room[];
  onEdit: (room: Room) => void;
}

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

const StatusBadge = ({ occupied }: { occupied: boolean }) => {
  const { t } = useAppStore();
  if (occupied) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
        Occupied
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {t("room.Available")}
    </span>
  );
};

const RentCell = ({ rent }: { rent: Room["rent"] }) => {
  const { t } = useAppStore();
  if (!rent) return <span className="text-sm text-gray-400">—</span>;
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-gray-900">${rent.amount}</span>
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          rent.status === "paid"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-amber-100 text-amber-700"
        }`}
      >
        {t(rent.status || "")}
      </span>
    </div>
  );
};

const TenantCell = ({ tenant }: { tenant: Room["tenant"] }) => {
  if (!tenant) return <span className="text-sm text-gray-400">—</span>;
  return (
    <LinkText href={`/dashboard/tenants/${tenant._id}`} className="text-sm">
      {tenant.name}
    </LinkText>
  );
};

export default function RoomTable({ rooms, onEdit }: RoomTableProps) {
  const { t } = useAppStore();
  const { curRoom } = usePropertyStore();

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
      {/* Desktop table */}
      <table className="hidden md:table w-full">
        <thead>
          <tr className="bg-gray-50 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
            <th className="px-4 py-3">{t("dashboard.Name")}</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Tenant</th>
            <th className="px-4 py-3">Rent</th>
            <th className="px-4 py-3 w-20"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rooms.map((room, i) => {
            const isSelected = curRoom?._id === room._id;
            return (
              <motion.tr
                key={room._id}
                variants={rowVariants}
                custom={i}
                initial="hidden"
                animate="visible"
                className={`hover:bg-gray-50 transition-colors ${isSelected ? "bg-blue-50" : "bg-white"}`}
              >
                <td className="px-4 py-3">
                  <LinkText href={`/dashboard/rooms/${room._id}`}>
                    {room.name || ""}
                  </LinkText>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{room.tpTxt}</td>
                <td className="px-4 py-3">
                  <StatusBadge occupied={!!room.tenant} />
                </td>
                <td className="px-4 py-3">
                  <TenantCell tenant={room.tenant} />
                </td>
                <td className="px-4 py-3">
                  <RentCell rent={room.rent} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    buttonType="primary"
                    outline={true}
                    size="sm"
                    onClick={() => onEdit(room)}
                  >
                    {t("dashboard.Edit")}
                  </Button>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-gray-100">
        {rooms.map((room, i) => {
          const isSelected = curRoom?._id === room._id;
          return (
            <motion.div
              key={room._id}
              variants={rowVariants}
              custom={i}
              initial="hidden"
              animate="visible"
              className={`p-4 space-y-2 ${isSelected ? "bg-blue-50 border-l-4 border-blue-500" : "bg-white"}`}
            >
              <div className="flex justify-between items-start">
                <LinkText href={`/dashboard/rooms/${room._id}`}>
                  {room.name || ""}
                </LinkText>
                <Button
                  buttonType="primary"
                  outline={true}
                  size="sm"
                  onClick={() => onEdit(room)}
                >
                  {t("dashboard.Edit")}
                </Button>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span>{room.tpTxt}</span>
                <StatusBadge occupied={!!room.tenant} />
              </div>

              {room.tenant && (
                <div className="text-sm text-gray-500">
                  Tenant: <TenantCell tenant={room.tenant} />
                </div>
              )}

              {room.rent && <RentCell rent={room.rent} />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

"use client";
import { motion } from "framer-motion";
import PropertyInfoCard from "./PropertyInfoCard";
import RoomInfoCard from "./RoomInfoCard";
import TenantsBreadcrumbs from "./TenantsBreadcrumbs";
import { Property } from "@/types/property";
import type { Room } from "@/types/room";

interface TenantsContextProps {
  curProperty: Property | null;
  curRoom: Room | null;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function TenantsContext({ curProperty, curRoom }: TenantsContextProps) {
  return (
    <motion.div className="mb-8 space-y-6" variants={itemVariants}>
      {curProperty && (
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TenantsBreadcrumbs curPropertyId={curProperty._id || ""} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PropertyInfoCard
              name={curProperty.name}
              address={curProperty.address || ""}
            />

            {curRoom && (
              <RoomInfoCard
                name={curRoom.name || ""}
                tpTxt={curRoom.tpTxt || ""}
                stat={curRoom.stat}
              />
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

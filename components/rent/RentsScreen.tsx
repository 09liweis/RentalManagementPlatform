"use client";

import LoadingSection from "@/components/common/LoadingSection";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import usePropertyStore from "@/stores/propertyStore";
import RentForm from "@/components/rent/RentForm";
import useAppStore from "@/stores/appStore";
import LinkText from "@/components/common/LinkText";
import RentCard from "@/components/rent/RentCard";
import { motion } from "framer-motion";
import TenantCard from "../tenant/TenantCard";
import RoomCard from "../room/RoomCard";
import PropertyCard from "../property/PropertyCard";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function RentsScreen({ tenantId }: { tenantId: string }) {
  const { t } = useAppStore();
  const {
    rents,
    fetchRents,
    setCurRent,
    curTenant,
    curRoom,
    curProperty,
    showRentForm,
    setShowRentForm,
    handleDeleteRent,
  } = usePropertyStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchRents(tenantId);
      setLoading(false);
    };
    loadData();
  }, [tenantId]);

  return (
    <motion.div
      className="min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Breadcrumb Navigation */}
      <motion.div className="mb-6" variants={itemVariants}>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <LinkText
            href={`/dashboard/properties/${curProperty?._id}`}
          >{t("dashboard.BackToProperty")}</LinkText>
          <span className="text-gray-400">/</span>
          <LinkText
            href={`/dashboard/rooms/${curRoom?._id}`}
          >{t("dashboard.BackToRoom")}</LinkText>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <motion.div className="lg:col-span-1 space-y-6" variants={itemVariants}>
          {/* Property Card */}
          <PropertyCard p={curProperty} />

          {/* Room Card */}
          <RoomCard room={curRoom} />

          <TenantCard tenant={curTenant} />
        </motion.div>

        {/* Right Column - Rents List */}
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {t("dashboard.RentHistory")}
                </h2>
                <p className="text-2xl text-green-600 mt-1">
                  ${rents.reduce((sum, rent) => sum + (typeof rent?.amount === 'number' ? rent.amount : 0), 0)}
                </p>
              </div>
              <Button
                onClick={setShowRentForm}
              >
                {t("dashboard.AddRent")}
              </Button>
            </div>

            <LoadingSection loading={loading}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rents.map((rent, index) => (
                  <motion.div
                    key={rent._id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: index * 0.1 }}
                  >
                    <RentCard
                      rent={rent}
                      handleClick={() => {
                        setShowRentForm();
                        setCurRent(rent);
                      }}
                      handleDeleteRent={() =>
                        handleDeleteRent({ tenantId, rentId: rent._id })
                      }
                    />
                  </motion.div>
                ))}
              </div>
            </LoadingSection>
          </div>
        </motion.div>
      </div>

      {showRentForm && <RentForm />}
    </motion.div>
  );
}
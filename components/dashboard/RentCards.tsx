"use client";

import { useEffect, useState } from "react";
import LoadingSection from "../common/LoadingSection";
import { fetchData } from "@/utils/http";
import Input from "@/components/common/Input";
import usePropertyStore from "@/stores/propertyStore";
import useAppStore from "@/stores/appStore";

interface RentCardsProps {
  propertyId?: string;
  roomId?: string;
  tenantId?: string;
}

export default function RentCards({
  propertyId,
  roomId,
  tenantId,
}: RentCardsProps) {
  const { t } = useAppStore();

  const { fetchPropertyStats, rentStats, properties, rooms, tenants } =
    usePropertyStore();

  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState("");

  const fetchProperty = async (date: string) => {
    setLoading(true);

    await fetchPropertyStats({
      propertyId,
      roomId,
      tenantId,
      selectDate: date,
    });

    setLoading(false);
  };

  useEffect(() => {
    fetchProperty(date);
  }, [date]);

  return (
    <section className="mt-4">
      <Input
        type="month"
        value={rentStats.date || ""}
        placeholder={""}
        onChange={(e) => setDate(e.target.value)}
      />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {/* <article className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
          {properties && <p><span className="rent-price font-bold text-lg">{properties.length}</span> {t('home.Properties')}</p>}
          {rooms && <p><span className="rent-price font-bold text-lg">{rooms.length}</span> {t('home.Rooms')}</p>}
          {tenants && <p><span className="rent-price font-bold text-lg">{tenants.length}</span> {t('home.Tenants')}</p>}
        </article> */}
        <article className="bg-yellow-100 shadow-md rounded-lg p-3 hover:shadow-lg transition-shadow">
          <p>{t("dashboard.TotalRents")}</p>
          <p className="rent-price text-yellow-600 font-bold text-lg">
            ${rentStats.totalRents}
          </p>
        </article>
        <article className="bg-green-100 shadow-md rounded-lg p-3 hover:shadow-lg transition-shadow">
          <p>{t("dashboard.ReceivedRents")}</p>
          <p className="rent-price text-green-600 font-bold text-lg">
            ${rentStats.receivedRents}
          </p>
        </article>
        <article className="bg-red-100 shadow-md rounded-lg p-3 hover:shadow-lg transition-shadow">
          <p>{t("dashboard.PendingRents")}</p>
          <p className="rent-price text-red-600 font-bold text-lg">
            ${rentStats.pendingRents}
          </p>
        </article>
        <article className="bg-red-200 shadow-md rounded-lg p-3 hover:shadow-lg transition-shadow">
          <p>{t("dashboard.TotalCosts")}</p>
          <p className="rent-price text-red-600 font-bold text-lg">
            ${rentStats.totalCost}
          </p>
        </article>
      </section>
    </section>
  );
}

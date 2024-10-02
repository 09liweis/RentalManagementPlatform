"use client";

import { useEffect, useState } from "react";
import LoadingSection from "../common/LoadingSection";
import { fetchData } from "@/utils/http";
import Input from "@/components/common/Input";
import usePropertyStore from "@/stores/propertyStore";

interface RentCardsProps {
  propertyId?: string;
}

export default function RentCards({ propertyId }: RentCardsProps) {

  const {fetchPropertyStats, rentStats,properties,rooms,tenants} = usePropertyStore();

  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState("");

  const fetchProperty = async (date:string) => {
    setLoading(true);

    await fetchPropertyStats({propertyId, selectDate:date});

    setLoading(false);
  };

  useEffect(() => {
    fetchProperty(date);
  }, [date]);

  return (
    <>
      <Input type="month" value={rentStats.date||''} placeholder={"Select a month"} onChange={(e)=>setDate(e.target.value)} />
      <LoadingSection loading={loading}>
        <section className="card-container">
          <article className="card">
            {properties && <p><span className="rent-price">{properties.length}</span> Properties</p>}
            {rooms && <p><span className="rent-price">{rooms.length}</span> Rooms</p>}
            {tenants && <p><span className="rent-price">{tenants.length}</span> Tenants</p>}
          </article>
          <article className="card">
            <p>Total Rents</p>
            <p className="rent-price">${rentStats.totalRents}</p>
          </article>
          <article className="card">
            <p>Received Rents</p>
            <p className="rent-price">${rentStats.receivedRents}</p>
          </article>
          <article className="card">
            <p>Pending Rents</p>
            <p className="rent-price">${rentStats.pendingRents}</p>
          </article>
          <article className="card">
            <p>Total Costs</p>
            <p className="rent-price">${rentStats.totalCost}</p>
          </article>
        </section>
      </LoadingSection>
    </>
  );
}

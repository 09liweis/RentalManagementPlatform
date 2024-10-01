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

  const {fetchPropertyStats} = usePropertyStore();

  const [loading, setLoading] = useState(false);
  const [rent, setRents] = useState<any>({});

  const [date, setDate] = useState("");

  const fetchProperty = async () => {
    setLoading(true);

    const statsResponse = await fetchPropertyStats({propertyId, date});

    setLoading(false);
    setRents(statsResponse);
    setDate(statsResponse.date);
  };

  useEffect(() => {
    fetchProperty();
  }, [date]);

  return (
    <>
      <Input type="month" value={date} placeholder={"Select a month"} onChange={(e)=>setDate(e.target.value)} />
      <LoadingSection loading={loading}>
        <section className="card-container">
          <article className="card">
            {rent.property && <p><span className="rent-price">{rent.property.length}</span> Properties</p>}
            {rent.rooms && <p><span className="rent-price">{rent.rooms.length}</span> Rooms</p>}
            {rent.tenants && <p><span className="rent-price">{rent.tenants.length}</span> Tenants</p>}
          </article>
          <article className="card">
            <p>Total Rents</p>
            <p className="rent-price">${rent.totalRents}</p>
          </article>
          <article className="card">
            <p>Received Rents</p>
            <p className="rent-price">${rent.receivedRents}</p>
          </article>
          <article className="card">
            <p>Pending Rents</p>
            <p className="rent-price">${rent.pendingRents}</p>
          </article>
          <article className="card">
            <p>Total Costs</p>
            <p className="rent-price">${rent.totalCost}</p>
          </article>
        </section>
      </LoadingSection>
    </>
  );
}

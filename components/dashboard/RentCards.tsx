"use client";

import { useEffect, useState } from "react";
import LoadingSection from "../common/LoadingSection";
import { fetchData } from "@/utils/http";
import Input from "@/components/common/Input";

interface RentCardsProps {
  propertyId: string;
}

export default function RentCards({ propertyId }: RentCardsProps) {
  const [loading, setLoading] = useState(false);
  const [rent, setRents] = useState<any>({});

  const [date, setDate] = useState("");

  const fetchProperty = async () => {
    setLoading(true);
    const { totalRents, receivedRents, pendingRents, err } = await fetchData({
      url: `/api/properties/${propertyId}/`,
    });
    setLoading(false);
    setRents({ totalRents, receivedRents, pendingRents });
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
        </section>
      </LoadingSection>
    </>
  );
}

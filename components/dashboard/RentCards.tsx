"use client";

import LoadingSection from "../common/LoadingSection";

interface RentCardsProps {
  loading: boolean;
  rents: {
    totalRents: number;
    receivedRents: number;
    pendingRents: number;
  };
}

export default function RentCards({ loading, rents }: RentCardsProps) {
  const { totalRents, receivedRents, pendingRents } = rents;
  return (
    <LoadingSection loading={loading}>
      <section className="card-container">
        <article className="card">
          <p className="text-lg font-bold">Total Rents</p>
          <p>{totalRents}</p>
        </article>
        <article className="card">
          <p className="text-lg font-bold">Received Rents</p>
          <p>{receivedRents}</p>
        </article>
        <article className="card">
          <p className="text-lg font-bold">Pending Rents</p>
          <p>{pendingRents}</p>
        </article>
      </section>
    </LoadingSection>
  );
}

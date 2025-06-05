"use client";

import LoadingSection from "@/components/common/LoadingSection";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import usePropertyStore from "@/stores/propertyStore";
import RentForm from "@/components/rent/RentForm";
import useAppStore from "@/stores/appStore";
import LinkText from "@/components/common/LinkText";
import RentCard from "@/components/rent/RentCard";

export default function RentsScreen({
  tenantId,
}: {
  tenantId: string
}) {

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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRents(tenantId);
  }, [tenantId]);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="page-title">
          {/* {t("home.Rent")} */}
          Rents
        </h1>
        <Button tl={t("dashboard.AddRent")} handleClick={setShowRentForm} />
      </div>

      {showRentForm && <RentForm />}

      <LoadingSection loading={loading}>
        <section className="card-container sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {rents.map((rent, index) => (
            <RentCard
              key={rent._id}
              rent={rent}
              handleClick={() => {
                setShowRentForm();
                setCurRent(rent);
              }}
              handleDeleteRent={() => handleDeleteRent({ tenantId, rentId: rent._id })}
            />
          ))}
        </section>
      </LoadingSection>
    </>
  );
}

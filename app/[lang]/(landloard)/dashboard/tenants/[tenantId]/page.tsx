"use client";

import LoadingSection from "@/components/common/LoadingSection";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import usePropertyStore from "@/stores/propertyStore";
import RentForm from "@/components/rent/RentForm";
import useAppStore from "@/stores/appStore";
import LinkText from "@/components/common/LinkText";
import RentCard from "@/components/rent/RentCard";

export default function TenantPage({
  params,
}: {
  params: { tenantId: string };
}) {
  const { tenantId } = params;

  const { t } = useAppStore();

  const {
    fetchRents,
    rents,
    setCurRent,
    curTenant,
    curRoom,
    curProperty,
    showRentForm,
    setShowRentForm,
    handleDeleteRent,
    setCurTenant,
  } = usePropertyStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurTenant({ _id: tenantId });
    fetchRents(tenantId);
  }, [tenantId, setCurTenant, fetchRents]);

  return (
    <>
      <LinkText
        className="page-title"
        href={`/dashboard/properties/${curProperty?._id}`}
        text={`${t("home.Property")}: ${curProperty?.name}`}
      />
      <LinkText
        className="page-title"
        href={`/dashboard/rooms/${curRoom?._id}`}
        text={`${t("home.Room")}: ${curRoom?.name}`}
      />

      <div className="flex justify-between">
        <h1 className="page-title">
          {t("home.Tenant")} {curTenant?.name}
        </h1>
        <Button tl={t("dashboard.AddRent")} handleClick={setShowRentForm} />
      </div>

      {showRentForm && <RentForm />}

      <LoadingSection loading={loading}>
        <section className="card-container sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {rents.map((rent, index) => (
            <RentCard
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

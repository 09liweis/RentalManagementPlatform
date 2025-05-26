"use client";
import { useState, useEffect } from "react";
import { fetchData } from "@/utils/http";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { showToast } from "@/components/common/Toast";
import TenantList from "@/components/tenant/TenantList";
import useAppStore from "@/stores/appStore";
import LinkText from "@/components/common/LinkText";
import FormBackdrop from "@/components/common/form/FormBackdrop";
import FormWrapper from "@/components/common/form/FormWrapper";
import { Tenant } from "@/types/tenant";
import usePropertyStore from "@/stores/propertyStore";

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const {t} = useAppStore();
  const {fetchTenants, tenants, curProperty, curRoom} = usePropertyStore();
  const { roomId } = params;
  const [loading, setLoading] = useState(false);
  const [showTenantForm, setShowTenantForm] = useState(false);

  const fetchRoomTenants = async () => {
    setLoading(true);
    await fetchTenants(roomId);
    setLoading(false);
  };

  const [tenant, setTenant] = useState<any>({});
  const tenantFields = [
    { field: "name", inputType: "text", placeholder: "dashboard.Name" },
    { field: "deposit", inputType: "number", placeholder: "dashboard.Deposit" },
    { field: "startDate", inputType: "date", placeholder: "dashboard.StartDate" },
    { field: "endDate", inputType: "date", placeholder: "dashboard.EndDate" },
  ];

  const handleTenantClick = (tenant:any) => {
    setTenant(tenant);
    setShowTenantForm(true);
  }

  const handleSubmit = async () => {
    const method = tenant?._id ? "PUT" : "POST";
    const url = tenant?._id
      ? `/api/tenants/${tenant?._id}`
      : `/api/rooms/${roomId}/tenants`;
    const { msg, err } = await fetchData({
      url,
      method,
      body: tenant,
    });
    if (err) {
      showToast(err);
    } else {
      showToast(msg);
      fetchRoomTenants();
      setTenant({});
    }
    setShowTenantForm(false);
  };

  const setCurrentTenant = async (tenant:Tenant) => {
    const {err, msg} = await fetchData({url:`/api/tenants/${tenant._id}`,body:{...tenant,isCurrent:true}, method:'PUT'});
    showToast(err || msg);
    fetchRoomTenants();
  }

  useEffect(() => {
    fetchRoomTenants();
  }, []);

  return (
    <>
      <LinkText
        href={`/dashboard/properties/${curProperty?._id}`}
        className="page-title"
        text={`${t('home.Property')}: ${curProperty?.name}`}
      />
      <div className="flex justify-between">
        <h1 className="page-title">{t('home.Room')}: {curRoom?.name}</h1>
        <Button tl={t('dashboard.Add')} handleClick={()=>setShowTenantForm(true)} />
      </div>

      {showTenantForm &&
      <FormBackdrop>
      <FormWrapper onSubmit={handleSubmit}>
        {tenantFields.map(({ field, inputType, placeholder }) => (
          <Input
            key={field}
            type={inputType}
            placeholder={t(placeholder)}
            value={tenant[field] || ""}
            onChange={(e) => setTenant({ ...tenant, [field]: e.target.value })}
          />
        ))}
        <div className="flex justify-between">
          <Button
            tl={`${tenant?._id ? t("dashboard.Update") : t("dashboard.Add")}`}
            handleClick={()=>{}}
          />
          <Button tl={t('dashboard.Cancel')} handleClick={()=>{setShowTenantForm(false);setTenant({});}} tp="danger" />
        </div>
      </FormWrapper>
      </FormBackdrop>
      }

      <TenantList
        loading={loading}
        tenants={tenants}
        onEditClick={handleTenantClick}
        setCurrentTenant={setCurrentTenant}
      />
    </>
  );
}

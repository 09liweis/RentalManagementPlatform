"use client";
import { useState, useEffect } from "react";
import { fetchData } from "@/utils/http";
import Link from "next/link";

import Button from "@/components/common/Button";
import { showToast } from "@/components/common/Toast";
import TenantList from "@/components/tenant/TenantList";
import TenantForm from "@/components/tenant/TenantForm";
import useAppStore from "@/stores/appStore";

import { Tenant } from "@/types/tenant";
import usePropertyStore from "@/stores/propertyStore";

export default function TenantsScreen({ roomId }: { roomId: string }) {
  const { t } = useAppStore();
  const { fetchTenants, tenants, curProperty, curRoom } = usePropertyStore();
  const [loading, setLoading] = useState(false);
  const [showTenantForm, setShowTenantForm] = useState(false);

  useEffect(() => {
    fetchRoomTenants();
  }, [roomId]);

  const fetchRoomTenants = async () => {
    setLoading(true);
    await fetchTenants(roomId);
    setLoading(false);
  };

  const [tenant, setTenant] = useState<any>({});

  const handleTenantClick = (tenant: any) => {
    setTenant(tenant);
    setShowTenantForm(true);
  };

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

  const setCurrentTenant = async (tenant: Tenant) => {
    const { err, msg } = await fetchData({
      url: `/api/tenants/${tenant._id}`,
      body: { ...tenant, isCurrent: true },
      method: "PUT",
    });
    showToast(err || msg);
    fetchRoomTenants();
  };

  // useEffect(() => {
  //   fetchRoomTenants();
  // }, []);

  return (
    <>
      {/* Location Context and Navigation */}
      <div className="mb-8 space-y-6">
        {curProperty && (
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6">
              {/* Breadcrumb and Back Link */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                <Link 
                  href={`/dashboard/properties/${curProperty._id}`}
                  className="text-blue-600 hover:text-blue-700 flex items-center transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  {t("dashboard.BackToProperty")}
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-800 font-medium">{t("dashboard.RoomDetails")}</span>
              </div>

              {/* Property and Room Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Property Card */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl transform transition-transform group-hover:scale-[1.02] duration-300"></div>
                  <div className="relative p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{t("dashboard.Property")}</h3>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{curProperty.name}</h4>
                        <p className="text-sm text-gray-600 flex items-center">
                          <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {curProperty.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Room Card */}
                {curRoom && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-xl transform transition-transform group-hover:scale-[1.02] duration-300"></div>
                    <div className="relative p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-emerald-50 rounded-lg">
                          <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{t("dashboard.Room")}</h3>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">{curRoom.name}</h4>
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            {curRoom.tp}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tenants Header */}
        <div className="flex justify-between items-center">
          <h1 className="page-title">
            {t("home.Tenants")}
          </h1>
          <Button
            tl={t("dashboard.Add")}
            handleClick={() => setShowTenantForm(true)}
          />
        </div>
      </div>

      {showTenantForm && (
        <TenantForm
          handleSubmit={handleSubmit}
          tenant={tenant}
          setShowTenantForm={setShowTenantForm}
          setTenant={setTenant}
        />
      )}

      <TenantList
        loading={loading}
        tenants={tenants}
        onEditClick={handleTenantClick}
        setCurrentTenant={setCurrentTenant}
      />

    </>
  );
}
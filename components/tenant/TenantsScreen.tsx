"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { showToast } from "@/components/common/Toast";
import TenantList from "@/components/tenant/TenantList";
import TenantForm from "@/components/tenant/TenantForm";
import TenantsContext from "@/components/tenant/TenantsContext";
import TenantsHeader from "@/components/tenant/TenantsHeader";

import { Tenant } from "@/types/tenant";
import usePropertyStore from "@/stores/propertyStore";
import { fetchData } from "@/utils/http";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function TenantsScreen({ roomId }: { roomId: string }) {
  const { fetchTenants, tenants, curProperty, curRoom } = usePropertyStore();
  const [loading, setLoading] = useState(false);
  const [showTenantForm, setShowTenantForm] = useState(false);

  useEffect(() => {
    fetchRoomTenants();
  }, [roomId]);

  const fetchRoomTenants = async () => {
    setLoading(true);
    fetchTenants(roomId);
    setLoading(false);
  };

  const [tenant, setTenant] = useState<any>({});
  const [upsertTenantLoading, setUpsertTenantLoading] = useState(false);

  const handleTenantClick = (tenant: any) => {
    setTenant(tenant);
    setShowTenantForm(true);
  };

  const handleSubmit = async (e: any) => {
    setUpsertTenantLoading(true);
    e.preventDefault();
    const method = tenant?._id ? "PUT" : "POST";
    const url = tenant?._id
      ? `/api/tenants/${tenant?._id}`
      : `/api/rooms/${roomId}/tenants`;
    const { msg, err } = await fetchData({
      url,
      method,
      body: tenant,
    });
    setUpsertTenantLoading(false);
    if (err) {
      showToast(err);
    } else {
      showToast(msg);
      fetchRoomTenants();
      setTenant({});
      setShowTenantForm(false);
    }
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

  const handleDeleteTenant = async (tenant: any) => {
    if (!confirm(`Are you sure you want to delete tenant ${tenant.name}? This will also delete all associated rent records.`)) {
      return;
    }
    const { err, msg } = await fetchData({
      url: `/api/tenants/${tenant._id}`,
      method: "DELETE",
    });
    if (err) {
      showToast(err);
    } else {
      showToast(msg);
      fetchRoomTenants();
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <TenantsContext curProperty={curProperty} curRoom={curRoom} />

      <motion.div className="mb-8" variants={itemVariants}>
        <TenantsHeader onAddClick={() => setShowTenantForm(true)} />
      </motion.div>

      {showTenantForm && (
        <TenantForm
          loading={upsertTenantLoading}
          handleSubmit={handleSubmit}
          tenant={tenant}
          setShowTenantForm={setShowTenantForm}
          setTenant={setTenant}
        />
      )}

      <motion.div
        variants={itemVariants}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <TenantList
          loading={loading}
          tenants={tenants}
          onEditClick={handleTenantClick}
          onDeleteClick={handleDeleteTenant}
          setCurrentTenant={setCurrentTenant}
        />
      </motion.div>
    </motion.div>
  );
}

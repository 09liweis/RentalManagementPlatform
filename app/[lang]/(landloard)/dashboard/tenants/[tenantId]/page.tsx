"use client";

import Screen from "@/components/dashboard/Screen";
import RentsScreen from "@/components/rent/RentsScreen";

export default function TenantPage({
  params,
}: {
  params: { tenantId: string };
}) {
  const { tenantId } = params;
  return <RentsScreen tenantId={tenantId} />
}

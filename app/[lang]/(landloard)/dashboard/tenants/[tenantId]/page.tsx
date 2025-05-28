"use client";

import Screen from "@/components/dashboard/Screen";

export default function TenantPage({
  params,
}: {
  params: { tenantId: string };
}) {
  const { tenantId } = params;
  return <Screen tenantId={tenantId} />
}

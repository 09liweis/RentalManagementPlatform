"use client";;
import { use } from "react";

import RentsScreen from "@/components/rent/RentsScreen";

export default function TenantPage(
  props: {
    params: Promise<{ tenantId: string }>;
  }
) {
  const params = use(props.params);
  const { tenantId } = params;
  return <RentsScreen tenantId={tenantId} />
}

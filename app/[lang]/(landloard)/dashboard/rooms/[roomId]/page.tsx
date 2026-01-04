import TenantsScreen from "@/components/tenant/TenantsScreen";

export default async function RoomPage(
  props: {
    params: Promise<{ roomId: string }>;
  }
) {
  const params = await props.params;
  const {roomId} = params;
  return (
    <TenantsScreen roomId={roomId} />
  )
}

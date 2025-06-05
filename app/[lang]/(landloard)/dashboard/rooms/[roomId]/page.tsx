import TenantsScreen from "@/components/tenant/TenantsScreen";

export default function RoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  const {roomId} = params;
  return (
    <TenantsScreen roomId={roomId} />
  )
}

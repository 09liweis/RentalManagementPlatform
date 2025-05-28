import Screen from "@/components/dashboard/Screen";

export default function RoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  const {roomId} = params;
  return <Screen roomId={roomId} />
}

import Screen from "@/components/dashboard/Screen";

export default function PropertyPage({
  params,
}: {
  params: { propertyId: string };
}) {
  const {propertyId} = params;
  return <Screen propertyId={propertyId} />
}

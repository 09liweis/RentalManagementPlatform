import Screen from "@/components/dashboard/Screen";

export default async function PropertyPage(
  props: {
    params: Promise<{ propertyId: string }>;
  }
) {
  const params = await props.params;
  const {propertyId} = params;
  return <Screen propertyId={propertyId} />
}

import PropertyDetail from "@/components/property/PropertyDetail";

export default async function PropertyPage(
  props: {
    params: Promise<{ propertyId: string }>;
  }
) {
  const params = await props.params;
  const {propertyId} = params;
  return <PropertyDetail propertyId={propertyId} />
}

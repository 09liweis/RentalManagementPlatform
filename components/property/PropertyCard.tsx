import { Property } from "@/types/property";
import Button from "../common/Button";
import LinkText from "../common/LinkText";
import useAppStore from "@/stores/appStore";
import usePropertyStore from "@/stores/propertyStore";

interface PropertyCardProps {
  p: Property,
  handlePropertyEdit: Function
}
export default function PropertyCard({p, handlePropertyEdit}:PropertyCardProps) {
  const {t} = useAppStore();
  const { curProperty } = usePropertyStore();
  return (
    <article
      className={`bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow border border-gray-200 ${
        curProperty._id === p._id ? "border-green-500" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <LinkText
          className="text-lg font-semibold text-gray-800"
          href={`/dashboard/properties/${p._id}`}
          text={p.name}
        />
        <div>
          <Button
            handleClick={() => handlePropertyEdit(p)}
            tl={t("dashboard.Edit")}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-600">{p.address}</p>
      </div>
    </article>
  );
}

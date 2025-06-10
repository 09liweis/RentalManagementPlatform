import { Property } from "@/types/property";
import Button from "../common/Button";
import LinkText from "../common/LinkText";
import useAppStore from "@/stores/appStore";
import usePropertyStore from "@/stores/propertyStore";

interface PropertyCardProps {
  p: Property;
  handlePropertyEdit?: Function;
}

export default function PropertyCard({
  p,
  handlePropertyEdit,
}: PropertyCardProps) {
  const { t } = useAppStore();
  const { curProperty } = usePropertyStore();

  const isSelected = curProperty?._id === p._id;
  const hasSelected = curProperty?._id;

  return (
    <article
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 
                  transform hover:-translate-y-1 border p-3
                  ${
                    isSelected
                      ? "border-blue-500 ring-2 ring-blue-100"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1">
          <LinkText
            className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors
                         inline-block hover:scale-[1.02] transform duration-200"
            href={`/dashboard/properties/${p._id}`}
            text={p.name}
          />
          <div className="flex items-center text-gray-500">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="text-sm">{p.ptypeTxt}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm max-w-xs">{p.address}</span>
          </div>
        </div>
        {(isSelected || !hasSelected) && handlePropertyEdit && (
          <Button
            tl={t("dashboard.Edit")}
            tp="primary"
            outline={true}
            size="sm"
            handleClick={() => handlePropertyEdit(p)}
            className="hover:scale-105 transform transition-transform duration-200"
          />
        )}
      </div>
    </article>
  );
}

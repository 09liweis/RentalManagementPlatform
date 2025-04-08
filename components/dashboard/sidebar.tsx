"use client";
import useAppStore from "@/stores/appStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LinkText from "../common/LinkText";

const DASHBOARD_MENUS = [
  { tl: "home.Dashboard", path: "/dashboard" },
  { tl: "home.Rooms", path: "/dashboard/rooms" },
  { tl: "home.Tenants", path: "/dashboard/tenants" },
];

export default function Sidebar() {
  const curPathname = usePathname();
  const {t, curLocale} = useAppStore();

  const isSelected = (path: string) => {
    const comparedPath = '/'+curLocale+path;
    if (comparedPath != `/${curLocale}/dashboard`) {
      return curPathname.startsWith(comparedPath);
    } else {
      return curPathname == comparedPath;
    }
  };

  return (
    <aside className="w-64 p-4 bg-gray-100 shadow-lg min-h-screen">
      <section className="p-4 rounded-lg bg-white shadow-md">
        <ul>
          {DASHBOARD_MENUS.map((menu, index) => (
            <li key={menu.tl}>
              <LinkText text={t(menu.tl)} href={menu.path} className={`block py-2 px-4 text-gray-700 mb-4 transition rounded hover:bg-gray-200 ${isSelected(menu.path) ? "bg-gray-300" : ""}`} />
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}

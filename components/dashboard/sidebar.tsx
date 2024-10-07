"use client";
import useAppStore from "@/stores/appStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LinkText from "../common/LinkText";

const DASHBOARD_MENUS = [
  { tl: "home.Dashboard", path: "/dashboard" },
  { tl: "home.Properties", path: "/dashboard/properties" },
  { tl: "home.Rooms", path: "/dashboard/rooms" },
  { tl: "home.Tenants", path: "/dashboard/tenants" },
];

export default function Sidebar() {
  const curPathname = usePathname();
  const {t, curLocale} = useAppStore();

  const isSelected = (path: string) => {
    if (path != "/dashboard") {
      return curPathname.startsWith(path);
    } else {
      return curPathname == path;
    }
  };

  return (
    <aside className="w-1/4 p-2">
      <section className="shadow-lg min-h-screen p-2 rounded">
        {DASHBOARD_MENUS.map((menu, index) => (
          <LinkText key={menu.tl} text={t(menu.tl)} href={menu.path} className={`sidebar-menu ${isSelected(menu.path) ? "active" : ""}`} />
        ))}
      </section>
    </aside>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const DASHBOARD_MENUS = [
  { tl: "Dashboard",path:"/dashboard" },
  { tl: "Properties",path:"/dashboard/properties" },
  { tl: "Tenants",path:"/dashboard/tenants" },
];

export default function Sidebar() {
  const curPathname = usePathname()
  return (
    <aside className="w-1/4 p-2">
      <section className="shadow-lg min-h-screen p-2">
        {DASHBOARD_MENUS.map((menu, index) => (
          <Link
            href={menu.path}
            className={`sidebar-menu ${menu.path === curPathname ? 'active' : ''}`}
            key={menu.tl}
          >
            {menu.tl}
          </Link>
        ))}
      </section>
    </aside>
  );
}

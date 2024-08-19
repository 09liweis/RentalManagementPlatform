import Link from "next/link";

const DASHBOARD_MENUS = [
  { tl: "Dashboard",path:"/dashboard" },
  { tl: "Properties",path:"/dashboard/properties" },
  { tl: "Renters",path:"/dashboard/renters" },
];

export default function Sidebar() {
  return (
    <aside className="w-1/4 p-2">
      <section className="shadow-lg min-h-screen p-2">
        {DASHBOARD_MENUS.map((menu, index) => (
          <Link
            href={menu.path}
            className="block bg-amber-600 p-2 rounded text-white mt-5 duration-300 hover:bg-amber-500"
            key={menu.tl}
          >
            {menu.tl}
          </Link>
        ))}
      </section>
    </aside>
  );
}

"use client";

import { locales } from "@/constants/locales";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LangSwitch() {
  let curPath = usePathname();
  curPath = curPath.split("/").slice(2).join("/");

  return (
    <ul className="flex gap-2">
      {locales.map((locale) => (
        <Link key={locale.locale} href={`/${locale.locale}/${curPath}`}>
          {locale.tl}
        </Link>
      ))}
    </ul>
  );
}

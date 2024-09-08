"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LANGS = ["en", "zh"];

export default function LangSwitch() {
  const curPath = usePathname();

  return (
    <ul className="flex gap-2">
      {LANGS.map((locale) => {
        return (
          <li key={locale}>
            <Link href={curPath} as={curPath} locale={locale} legacyBehavior>
              {locale}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

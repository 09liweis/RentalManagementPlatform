import useAppStore from "@/stores/appStore";
import Link from "next/link";

interface LinkTextProps {
  href: string;
  text: string;
  className?: string;
}

export default function LinkText({ href, text, className }: LinkTextProps) {
  const {curLocale} = useAppStore();
  return <Link className={`${className || 'text-purple-600 hover:text-purple-700 transition-colors duration-300 text-sm font-medium'}`} href={`/${curLocale}${href}`}>{text}</Link>;
}
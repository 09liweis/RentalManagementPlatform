import useAppStore from "@/stores/appStore";
import Link from "next/link";

interface LinkTextProps {
  href: string;
  text: string;
}

export default function LinkText({ href, text }: LinkTextProps) {
  const {curLocale} = useAppStore();
  return <Link className="link" href={`${curLocale}${href}`}>{text}</Link>;
}

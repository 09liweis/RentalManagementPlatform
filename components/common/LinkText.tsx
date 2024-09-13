import Link from "next/link";

interface LinkTextProps {
  href: string;
  text: string;
}

export default function LinkText({ href, text }: LinkTextProps) {
  return <Link className="link" href={href}>{text}</Link>;
}

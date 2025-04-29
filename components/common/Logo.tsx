import { WEBSITE_NAME } from "@/constants/text";
import useAppStore from "@/stores/appStore";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  const {curLocale} = useAppStore();
  return (
    <Link href={'/'+curLocale} className="flex gap-3 items-center">
      <Image src={'/images/logo.png'} width={50} height={50} alt="Rental Tracker" />
      <span className="text-indigo-600">{WEBSITE_NAME}</span>
    </Link>
  )
}
import { WEBSITE_NAME } from "@/constants/text";
import useAppStore from "@/stores/appStore";
// import Image from "next/image";
import LinkText from "./LinkText";

export default function Logo() {
  const { curLocale } = useAppStore();
  return (
    <LinkText href={"/" + curLocale} className="flex gap-3 items-center">
      {/* <Image src={'/images/logo.png'} width={50} height={50} alt="Rental Tracker" /> */}
      <span className="font-bold text-xl">{WEBSITE_NAME}</span>
    </LinkText>
  );
}

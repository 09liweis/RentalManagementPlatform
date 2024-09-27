import Logo from "@/components/common/Logo";
import LangSwitch from "@/components/common/LangSwtich";
import LinkText from "@/components/common/LinkText";

export default function Header() {
  return (
    <header className="p-4 shadow flex justify-between items-center">
      <Logo />
      <nav className="flex gap-3">
        <LinkText href={"/signup"} text="Signup" />
        <LinkText href={"/login"} text="Login" />
        <LangSwitch />
      </nav>
    </header>
  );
}
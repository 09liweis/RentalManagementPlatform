"use client";
import Logo from "@/components/common/Logo";
import LangSwitch from "@/components/common/LangSwtich";
import LinkText from "@/components/common/LinkText";
import useUserStore from "@/stores/userStore";

export default function Header() {
  const {loginUser} = useUserStore();
  console.log(loginUser);
  return (
    <header className="p-4 shadow flex justify-between items-center">
      <Logo />
      <nav className="flex gap-3">
        {loginUser._id ? 
        <LinkText href="/dashboard" text="Dashboard"/> :
        <>
          <LinkText href={"/signup"} text="Signup" />
          <LinkText href={"/login"} text="Login" />
        </>
        }
        <LangSwitch />
      </nav>
    </header>
  );
}
import LangSwitch from "@/components/common/LangSwtich";
import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import { showToast } from "@/components/common/Toast";
import { useRouter } from "next/navigation";
import useAppStore from "@/stores/appStore";

interface DashboardHeaderProps {
  setIsSearchModalOpen: (isOpen: boolean) => void;
}
export default function DashboardHeader({ setIsSearchModalOpen }: DashboardHeaderProps) {
  const { t, curLocale } = useAppStore();
  const router = useRouter();

  const handleLogout = () => {
    showToast("Logout Successful");
    localStorage.removeItem("auth-token");
    router.replace(`/${curLocale}/login`);
  };

  return (
    <header className="flex items-center justify-between p-4 shadow-sm mb-4 bg-white/80 backdrop-blur-sm border border-gray-100">
      <Logo />

      {/* Search Button */}
      <button
        onClick={() => setIsSearchModalOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
        title="Search (Cmd+K)"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 border border-gray-200 rounded text-xs font-mono bg-gray-50">
          ⌘K
        </kbd>
      </button>

      <div className="flex items-center gap-3">
        <LangSwitch />
        <Button
          buttonType="danger"
          outline={true}
          onClick={handleLogout}
        >
          {t("home.Logout")}
        </Button>
      </div>
    </header>
  );
}
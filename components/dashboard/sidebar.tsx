"use client";
import useAppStore from "@/stores/appStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LinkText from "../common/LinkText";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useUserStore from "@/stores/userStore";

const DASHBOARD_MENUS = [
  {
    tl: "home.Dashboard",
    path: "/dashboard",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
        />
      </svg>
    ),
  },
  {
    tl: "home.Rooms",
    path: "/dashboard/rooms",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    tl: "home.Tenants",
    path: "/dashboard/tenants",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
        />
      </svg>
    ),
  },
  {
    tl: "Profile",
    path: "/dashboard/profile",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
];

// Admin menu item
const ADMIN_MENU = {
  tl: "Admin",
  path: "/dashboard/admin",
  icon: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
};

// Animation variants
const sidebarVariants = {
  open: {
    width: "16rem",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  closed: {
    width: "4rem",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  mobileOpen: {
    width: "16rem",
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  mobileClosed: {
    width: "16rem",
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
};

const textVariants = {
  open: {
    opacity: 1,
    display: "flex",
    transition: {
      delay: 0.2,
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
    transition: {
      duration: 0.1,
    },
  },
};

export default function Sidebar({ isMobile }: { isMobile: boolean }) {
  const curPathname = usePathname();
  const { t, curLocale } = useAppStore();
  const { loginUser } = useUserStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobileSidebar = () => setIsMobileOpen(false);

  const isSelected = (path: string) => {
    const comparedPath = "/" + curLocale + path;
    if (comparedPath != `/${curLocale}/dashboard`) {
      return curPathname.startsWith(comparedPath);
    } else {
      return curPathname == comparedPath;
    }
  };

  // Combine regular menus with admin menu if user is admin
  const allMenus = loginUser.isAdmin
    ? [...DASHBOARD_MENUS, ADMIN_MENU]
    : DASHBOARD_MENUS;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMobileOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: isMobileOpen ? "auto" : "none" }}
          onClick={closeMobileSidebar}
        />
      )}

      <motion.aside
        className={`h-screen bg-white/95 backdrop-blur-md shadow-xl border-r border-gray-100 ${
          isMobile
            ? "fixed top-0 left-0 z-40"
            : "fixed top-0 left-0 z-40"
        }`}
        variants={sidebarVariants}
        animate={
          isMobile
            ? isMobileOpen
              ? "mobileOpen"
              : "mobileClosed"
            : isCollapsed
            ? "closed"
            : "open"
        }
        initial={isMobile ? "mobileClosed" : "open"}
      >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            variants={textVariants}
            animate={isCollapsed ? "closed" : "open"}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Dashboard</h2>
              <p className="text-xs text-gray-500">Property Management</p>
            </div>
          </motion.div>

          {!isMobile && 
          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </motion.svg>
          </motion.button>
          }
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {allMenus.map((menu, index) => {
          const selected = isSelected(menu.path);

          return (
            <motion.div
              key={menu.tl}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover="hover"
            >
              <LinkText
                href={`/${menu.path}`}
                className={`
                  flex items-center ${isCollapsed ? "" : "space-x-3 px-4"} py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
                  ${
                    selected
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }
                  ${menu.tl === "Admin" ? "border border-purple-200" : ""}
                `}
              >
                {/* Background animation for selected state */}
                {selected && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ borderRadius: "0.75rem" }}
                  />
                )}

                {/* Icon */}
                <motion.div
                  className={`relative z-10 ${selected ? "text-white" : "text-gray-500 group-hover:text-blue-600"}`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {menu.icon}
                </motion.div>

                {/* Text */}
                <motion.span
                  className={`relative z-10 font-medium ${selected ? "text-white" : "group-hover:text-blue-600"}`}
                  variants={textVariants}
                  animate={isCollapsed ? "closed" : "open"}
                >
                  {menu.tl === "Profile" || menu.tl === "Admin"
                    ? menu.tl
                    : t(menu.tl)}
                </motion.span>

                {/* Admin badge */}
                {menu.tl === "Admin" && !isCollapsed && (
                  <motion.div
                    className="absolute right-2 w-2 h-2 bg-purple-400 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  />
                )}

                {/* Active indicator */}
                {selected && (
                  <motion.div
                    className="absolute right-2 w-2 h-2 bg-white rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  />
                )}
              </LinkText>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100"
        variants={textVariants}
        animate={isCollapsed ? "closed" : "open"}
      >
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {loginUser.isAdmin ? "Admin" : "Landlord"}
              </p>
              <p className="text-xs text-gray-500">
                {loginUser.isAdmin ? "System Administrator" : "Premium Account"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      </motion.aside>

      {/* Mobile menu button */}
      {isMobile && (
        <motion.button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg text-white md:hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </motion.button>
      )}
    </>
  );
}
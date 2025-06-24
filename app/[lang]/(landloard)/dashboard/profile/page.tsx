"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useUserStore from "@/stores/userStore";
import useAppStore from "@/stores/appStore";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { showToast } from "@/components/common/Toast";
import { fetchData } from "@/utils/http";
import LoadingSpinner from "@/components/common/LoadingSpinner";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 },
  },
};

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

export default function ProfilePage() {
  const { t, curLocale, setLocale } = useAppStore();
  const { loginUser, fetchUser } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    locale: curLocale,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (loginUser) {
      setProfileData({
        name: loginUser.name || "",
        email: loginUser.email || "",
        phone: loginUser.phone || "",
        address: loginUser.address || "",
        locale: loginUser.locale || curLocale,
      });
    }
  }, [loginUser, curLocale]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { msg, err } = await fetchData({
        url: "/api/user/profile",
        method: "PUT",
        body: profileData,
      });

      if (err) {
        showToast(err);
      } else {
        showToast(msg || "Profile updated successfully!");
        if (profileData.locale !== curLocale) {
          setLocale(profileData.locale);
        }
        fetchUser();
      }
    } catch (error) {
      showToast("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast("New passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showToast("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const { msg, err } = await fetchData({
        url: "/api/user/password",
        method: "PUT",
        body: {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
      });

      if (err) {
        showToast(err);
      } else {
        showToast(msg || "Password updated successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      showToast("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile Information", icon: "👤" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "preferences", label: "Preferences", icon: "⚙️" },
  ];

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="mb-8" variants={cardVariants}>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center space-x-6">
            <motion.div
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <svg
                className="w-10 h-10 text-white"
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
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {profileData.name || "Welcome"}
              </h1>
              <p className="text-blue-100 text-lg">{profileData.email}</p>
              <div className="flex items-center mt-2 space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/20 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Active Account
                </span>
                <span className="text-blue-100 text-sm">Member since 2024</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div className="mb-8" variants={cardVariants}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div variants={cardVariants}>
        {activeTab === "profile" && (
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
            variants={cardVariants}
            whileHover="hover"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Profile Information
            </h2>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={inputVariants}>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                  />
                </motion.div>
                <motion.div variants={inputVariants}>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                  />
                </motion.div>
                <motion.div variants={inputVariants}>
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                  />
                </motion.div>
                <motion.div variants={inputVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language Preference
                  </label>
                  <select
                    value={profileData.locale}
                    onChange={(e) =>
                      setProfileData({ ...profileData, locale: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="en-CA">English</option>
                    <option value="zh-CN">中文</option>
                  </select>
                </motion.div>
              </div>
              <motion.div variants={inputVariants}>
                <Input
                  type="text"
                  placeholder="Address"
                  value={profileData.address}
                  onChange={(e) =>
                    setProfileData({ ...profileData, address: e.target.value })
                  }
                />
              </motion.div>
              <motion.div
                className="flex justify-end"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <LoadingSpinner /> : "Update Profile"}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        )}

        {activeTab === "security" && (
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
            variants={cardVariants}
            whileHover="hover"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Security Settings
            </h2>
            <form onSubmit={handlePasswordUpdate} className="space-y-6">
              <motion.div variants={inputVariants}>
                <Input
                  type="password"
                  placeholder="Current Password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                />
              </motion.div>
              <motion.div variants={inputVariants}>
                <Input
                  type="password"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
              </motion.div>
              <motion.div variants={inputVariants}>
                <Input
                  type="password"
                  placeholder="Confirm New Password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </motion.div>
              <motion.div
                className="flex justify-end"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <LoadingSpinner /> : "Update Password"}
                </Button>
              </motion.div>
            </form>

            {/* Security Info */}
            <motion.div
              className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Security Tips
              </h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Use a strong password with at least 8 characters</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    Include uppercase, lowercase, numbers, and symbols
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Don&apos;t reuse passwords from other accounts</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "preferences" && (
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
            variants={cardVariants}
            whileHover="hover"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Preferences
            </h2>

            <div className="space-y-8">
              {/* Notification Settings */}
              <motion.div variants={inputVariants}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Notification Settings
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      id: "email_notifications",
                      label: "Email Notifications",
                      description: "Receive updates via email",
                    },
                    {
                      id: "rent_reminders",
                      label: "Rent Reminders",
                      description: "Get notified about upcoming rent payments",
                    },
                    {
                      id: "maintenance_alerts",
                      label: "Maintenance Alerts",
                      description: "Alerts for property maintenance issues",
                    },
                    {
                      id: "tenant_updates",
                      label: "Tenant Updates",
                      description: "Notifications about tenant activities",
                    },
                  ].map((setting) => (
                    <motion.div
                      key={setting.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      whileHover={{ backgroundColor: "rgb(243 244 246)" }}
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {setting.label}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {setting.description}
                        </p>
                      </div>
                      <motion.label
                        className="relative inline-flex items-center cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                      >
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </motion.label>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Display Settings */}
              <motion.div variants={inputVariants}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Display Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Format
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>USD ($)</option>
                      <option>CAD (C$)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
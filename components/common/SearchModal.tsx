"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchData } from "@/utils/http";
import useAppStore from "@/stores/appStore";
import LinkText from "./LinkText";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: "property" | "room" | "tenant";
  href: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const { t } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < searchResults.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && searchResults[selectedIndex]) {
            // Navigate to selected result
            window.location.href = searchResults[selectedIndex].href;
            onClose();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, searchResults, onClose]);

  // Search function with debouncing
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        // Fetch properties, rooms, and tenants
        const [propertiesRes, roomsRes, tenantsRes] = await Promise.all([
          fetchData({ url: "/api/properties" }),
          fetchData({ url: "/api/rooms" }),
          fetchData({ url: "/api/tenants" }),
        ]);

        const results: SearchResult[] = [];

        // Search properties
        if (propertiesRes.properties) {
          propertiesRes.properties
            .filter(
              (property: any) =>
                property.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                property.address
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()),
            )
            .forEach((property: any) => {
              results.push({
                id: property._id,
                title: property.name,
                subtitle: property.address || "No address",
                type: "property",
                href: `/dashboard/properties/${property._id}`,
              });
            });
        }

        // Search rooms
        if (roomsRes.rooms) {
          roomsRes.rooms
            .filter((room: any) =>
              room.name?.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .forEach((room: any) => {
              results.push({
                id: room._id,
                title: room.name,
                subtitle: `${room.property?.name || "Unknown Property"} - ${room.tpTxt || "Room"}`,
                type: "room",
                href: `/dashboard/rooms/${room._id}`,
              });
            });
        }

        // Search tenants
        if (tenantsRes.tenants) {
          tenantsRes.tenants
            .filter((tenant: any) =>
              tenant.name?.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .forEach((tenant: any) => {
              results.push({
                id: tenant._id,
                title: tenant.name,
                subtitle: `Tenant - $${tenant.deposit || 0} deposit`,
                type: "tenant",
                href: `/dashboard/tenants/${tenant._id}`,
              });
            });
        }

        setSearchResults(results);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setSearchResults([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "property":
        return (
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        );
      case "room":
        return (
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        );
      case "tenant":
        return (
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "property":
        return "text-blue-600 bg-blue-100";
      case "room":
        return "text-green-600 bg-green-100";
      case "tenant":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.15,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const resultVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Search Input */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
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
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border-0 text-lg placeholder-gray-500 focus:outline-none focus:ring-0"
                  placeholder="Search properties, rooms, tenants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {loading && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {searchQuery.trim().length < 2 ? (
                <div className="p-8 text-center text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <p className="text-lg font-medium mb-2">
                    Search your properties
                  </p>
                  <p className="text-sm">
                    Type at least 2 characters to search properties, rooms, and
                    tenants
                  </p>
                </div>
              ) : searchResults.length === 0 && !loading ? (
                <div className="p-8 text-center text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-lg font-medium mb-2">No results found</p>
                  <p className="text-sm">
                    Try searching with different keywords
                  </p>
                </div>
              ) : (
                <div className="py-2">
                  {searchResults.map((result, index) => (
                    <motion.div
                      key={result.id}
                      custom={index}
                      variants={resultVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <LinkText
                        href={result.href}
                        text=""
                        className={`block px-4 py-3 hover:bg-gray-50 transition-colors duration-150 ${
                          selectedIndex === index ? "bg-blue-50" : ""
                        }`}
                      >
                        <div
                          className="flex items-center space-x-3"
                          onClick={onClose}
                        >
                          <div
                            className={`p-2 rounded-lg ${getTypeColor(result.type)}`}
                          >
                            {getTypeIcon(result.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {result.title}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {result.subtitle}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getTypeColor(
                                result.type,
                              )}`}
                            >
                              {result.type}
                            </span>
                          </div>
                        </div>
                      </LinkText>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-mono">
                      ↑↓
                    </kbd>
                    <span className="ml-2">Navigate</span>
                  </span>
                  <span className="flex items-center">
                    <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-mono">
                      Enter
                    </kbd>
                    <span className="ml-2">Select</span>
                  </span>
                </div>
                <span className="flex items-center">
                  <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-mono">
                    Esc
                  </kbd>
                  <span className="ml-2">Close</span>
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;

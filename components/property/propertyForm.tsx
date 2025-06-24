"use client";
import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import { showToast } from "../common/Toast";
import {
  EMPTY_PROPERTY,
  Property,
  PROPERTY_PTYPE_ARRAY,
  Suggestion,
} from "@/types/property";
import usePropertyStore from "@/stores/propertyStore";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import FormWrapper from "@/components/common/form/FormWrapper";
import SelectGroup from "../common/SelectGroup";
import FormBackdrop from "../common/form/FormBackdrop";
import FormTitle from "../common/form/FormTitle";
import useAppStore from "@/stores/appStore";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyFormProps {
  showPropertyForm: Function;
  property: Property;
}

export default function PropertyForm({
  showPropertyForm,
  property,
}: PropertyFormProps) {
  const { t } = useAppStore();
  const { fetchProperties } = usePropertyStore();

  const [curProperty, setCurProperty] = useState<Property>(property);
  const [address, setAddress] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => setCurProperty(property), [property]);

  // Initialize address field with current property address
  useEffect(() => {
    if (property.address) {
      setAddress(property.address);
    }
  }, [property.address]);

  const handlePropertySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = curProperty._id ? "PUT" : "POST";
    const url = curProperty._id
      ? `/api/properties/${curProperty._id}`
      : `/api/properties`;
    const { msg, err } = await fetchData({ url, method, body: curProperty });
    showPropertyForm(false);
    showToast(err || msg);
    fetchProperties();
    setCurProperty(EMPTY_PROPERTY);
  };

  const handleAddressChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setAddress(value);
    setSelectedIndex(-1);

    // Update the property address immediately for form submission
    setCurProperty({ ...curProperty, address: value });

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (value.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&limit=5`,
        );
        const data = await response.json();
        setSuggestions(data.features || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
    setDebounceTimeout(timeoutId);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setAddress(suggestion.place_name);
    setCurProperty({
      ...curProperty,
      address: suggestion.place_name,
      loc: suggestion.geometry.coordinates,
      mapbox_id: suggestion.id,
    });
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for click events
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 200);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0 && address.trim().length >= 3) {
      setShowSuggestions(true);
    }
  };

  // Animation variants
  const suggestionVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
      },
    },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <FormBackdrop>
      <FormWrapper onSubmit={handlePropertySubmit}>
        <FormTitle
          title={curProperty._id ? "Edit Property" : "Add New Property"}
        />

        <Input
          type="text"
          placeholder={t("dashboard.Name")}
          value={curProperty.name || ""}
          onChange={(e) =>
            setCurProperty({ ...curProperty, name: e.target.value })
          }
        />

        {/* Address Input with Suggestions */}
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter property address"
              value={address}
              onChange={handleAddressChange}
              onKeyDown={handleKeyDown}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-900 transition-all duration-300 pr-10"
              autoComplete="off"
            />

            {/* Loading spinner */}
            {isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="animate-spin h-5 w-5 text-purple-500"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}

            {/* Location icon */}
            {!isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto"
                variants={suggestionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.ul
                  className="py-2"
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {suggestions.map((suggestion, index) => (
                    <motion.li
                      key={suggestion.id}
                      variants={itemVariants}
                      className={`px-4 py-3 cursor-pointer transition-all duration-200 flex items-start space-x-3 ${
                        selectedIndex === index
                          ? "bg-purple-50 border-l-4 border-purple-500"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div
                        className={`p-1.5 rounded-lg ${
                          selectedIndex === index
                            ? "bg-purple-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <svg
                          className={`w-4 h-4 ${
                            selectedIndex === index
                              ? "text-purple-600"
                              : "text-gray-500"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${
                            selectedIndex === index
                              ? "text-purple-900"
                              : "text-gray-900"
                          }`}
                        >
                          {suggestion.place_name.split(",")[0]}
                        </p>
                        <p
                          className={`text-xs truncate ${
                            selectedIndex === index
                              ? "text-purple-600"
                              : "text-gray-500"
                          }`}
                        >
                          {suggestion.place_name
                            .split(",")
                            .slice(1)
                            .join(",")
                            .trim()}
                        </p>
                      </div>
                      {selectedIndex === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex-shrink-0"
                        >
                          <svg
                            className="w-4 h-4 text-purple-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Helper text */}
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                  <p className="text-xs text-gray-500 flex items-center">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Use ↑↓ to navigate, Enter to select, Esc to close
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* No results message */}
          <AnimatePresence>
            {showSuggestions &&
              suggestions.length === 0 &&
              !isLoading &&
              address.trim().length >= 3 && (
                <motion.div
                  className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
                  variants={suggestionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="px-4 py-6 text-center">
                    <svg
                      className="mx-auto h-8 w-8 text-gray-300 mb-2"
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
                    <p className="text-sm text-gray-500">No addresses found</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Try a different search term
                    </p>
                  </div>
                </motion.div>
              )}
          </AnimatePresence>
        </div>

        <SelectGroup
          value={curProperty.ptype || ""}
          label="Property Type"
          options={PROPERTY_PTYPE_ARRAY}
          handleSelect={(value) =>
            setCurProperty({ ...curProperty, ptype: value })
          }
        />

        <div className="flex justify-between gap-4">
          <Button
            type="submit"
            fullWidth={true}
          >
            {t(curProperty._id ? "dashboard.Update" : "dashboard.Add")}
          </Button>
          <Button
            onClick={() => {
              setCurProperty(EMPTY_PROPERTY);
              setAddress("");
              setSuggestions([]);
              setShowSuggestions(false);
              showPropertyForm(false);
            }}
            buttonType="danger"
            fullWidth={true}
          >
            {t("dashboard.Cancel")}
          </Button>
        </div>
      </FormWrapper>
    </FormBackdrop>
  );
}
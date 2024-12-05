"use client";
import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";
import { showToast } from "../common/Toast";
import { EMPTY_PROPERTY, Property, PROPERTY_PTYPE_ARRAY, Suggestion } from "@/types/property";
import usePropertyStore from "@/stores/propertyStore";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import SelectGroup from "../common/SelectGroup";
import FormBackdrop from "../common/form/FormBackdrop";
import FormTitle from "../common/form/FormTitle";
import useAppStore from "@/stores/appStore";

interface PropertyFormProps {
  showPropertyForm: Function;
  property: Property;
}

export default function PropertyForm({
  showPropertyForm,
  property,
}: PropertyFormProps) {
  const {t} = useAppStore();
  const { fetchProperties } = usePropertyStore();

  const [curProperty, setCurProperty] = useState<Property>(property);
  const [address, setAddress] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => setCurProperty(property), [property]);

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

  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeoutId = setTimeout(async () => {
      if (value) {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`);
        const data = await response.json();
        setSuggestions(data.features);
      } else {
        setSuggestions([]);
      }
    }, 300);
    setDebounceTimeout(timeoutId);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setCurProperty({ 
      ...curProperty, 
      address: suggestion.place_name, 
      loc: suggestion.geometry.coordinates, 
      mapbox_id: suggestion.id 
    });
    setSuggestions([]);
  };

  return (
    <FormBackdrop>
      <form
        className="form-container"
        onSubmit={handlePropertySubmit}
      >
        <Input
          type="text"
          placeholder={t('dashboard.Name')}
          value={curProperty.name || ""}
          onChange={(e) =>
            setCurProperty({ ...curProperty, name: e.target.value })
          }
        />
        <Input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={handleAddressChange}
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md max-h-48 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <li key={suggestion.id} className="py-2 px-4 cursor-pointer hover:bg-gray-100 text-gray-800 text-sm" onClick={() => handleSuggestionClick(suggestion)}>{suggestion.place_name}</li>
            ))}
          </ul>
        )}
        <SelectGroup
          value={curProperty.ptype || ""}
          label="Property Type"
          options={PROPERTY_PTYPE_ARRAY}
          handleSelect={(value) =>
            setCurProperty({ ...curProperty, ptype: value })
          }
        />
        <div className="flex justify-between">
          <Button tl={t(curProperty._id?'dashboard.Update':'dashboard.Add')} handleClick={handlePropertySubmit} />
          <Button tl={t('dashboard.Cancel')} handleClick={()=>{
            setCurProperty(EMPTY_PROPERTY);
            showPropertyForm(false);
          }} tp="danger" />
        </div>
      </form>
    </FormBackdrop>
  );
}

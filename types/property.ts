export interface Property {
  _id?: string,
  name: string,
  ptype?: string,
  address?:string,
  loc?:Array<number>,
  mapbox_id?:string
}

export const EMPTY_PROPERTY: Property = {
  _id: "",
  name: "",
}

interface PROPERTY_PTYPE_MAP_TYPE {
  [key: string]: string
}

export const PROPERTY_PTYPE_MAP:PROPERTY_PTYPE_MAP_TYPE = {
  "1": "House",
  "2": "Townhouse",
  "3": "Condo",
  "4": "Apartment",
}

function convertMap2Array() {
  const arr = []
  for (const key in PROPERTY_PTYPE_MAP) {
    arr.push({
      key: key,
      text: PROPERTY_PTYPE_MAP[key]
    })
  }
  return arr
}

export const PROPERTY_PTYPE_ARRAY = convertMap2Array();

export interface MapboxSuggestion {
  place_name: string;
  geometry: {
    coordinates: [number, number];
  };
  id: string;
}

export interface Suggestion {
  place_name: string;
  geometry: {
    coordinates: [number, number];
  };
  id: string;
}
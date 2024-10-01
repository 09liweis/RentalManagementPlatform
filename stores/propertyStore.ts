import { showToast } from '@/components/common/Toast';
import { Property } from '@/types/property';
import { fetchData } from '@/utils/http';
import { create } from 'zustand'

interface PropertyState {
  properties: Property[];
  propertiesFetched:boolean;
  fetchProperties: () => void;
  fetchPropertyStats: ({propertyId,date}:any) => Promise<any>;
}

const usePropertyStore = create<PropertyState>((set) => ({
  properties: [],
  propertiesFetched: false,
  fetchProperties: async () => {
    const {properties,err} = await fetchData({url:'/api/properties'});
    if (err) {
      showToast(err);
    } else {
      set({properties,propertiesFetched:true});
    }
  },

  fetchPropertyStats: async ({propertyId, date}:any) => {
    const apiUrl = propertyId ? `/api/properties/${propertyId}?date=${date}` : `/api/overview?date=${date}`;
    const statsResponse = await fetchData({
      url: apiUrl,
    });
    return statsResponse;
  }
}))

export default usePropertyStore;
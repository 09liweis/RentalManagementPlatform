import { showToast } from '@/components/common/Toast';
import { Property } from '@/types/property';
import { Room } from '@/types/room';
import { fetchData } from '@/utils/http';
import { create } from 'zustand'

interface RentStats {
  date?:string;
  totalRents?:number;
  pendingRents?:number;
  receivedRents?:number;
  totalCost?:number;
}

interface PropertyState {
  rentStats:RentStats,
  properties: Property[];
  rooms: Room[];
  tenants:any;
  propertiesFetched:boolean;
  fetchProperties: () => void;
  fetchPropertyStats: ({propertyId,date}:any) => void;
}

const usePropertyStore = create<PropertyState>((set) => ({
  rentStats:{},
  properties: [],
  rooms: [],
  tenants:[],
  propertiesFetched: false,
  fetchProperties: async () => {
    const {properties,err} = await fetchData({url:'/api/properties'});
    if (err) {
      showToast(err);
    } else {
      set({properties,propertiesFetched:true});
    }
  },

  fetchPropertyStats: async ({propertyId, selectDate}:any) => {
    const apiUrl = propertyId ? `/api/properties/${propertyId}?date=${selectDate||''}` : `/api/overview?date=${selectDate||''}`;
    const {properties,rooms,tenants,totalRents,receivedRents,pendingRents,totalCost,date} = await fetchData({
      url: apiUrl,
    });
    set({properties,rooms,tenants});
    set({rentStats:{totalRents,receivedRents,pendingRents,totalCost,date}})
  }
}))

export default usePropertyStore;
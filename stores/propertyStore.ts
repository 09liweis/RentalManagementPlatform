import { showToast } from '@/components/common/Toast';
import { Property } from '@/types/property';
import { Rent } from '@/types/rent';
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
  curTenant:any;
  setCurTenant:(tenant:any)=>void;
  rents:Rent[];
  propertiesFetched:boolean;
  fetchProperties: () => void;
  fetchRents:(tenantId:String) => void;
  fetchPropertyStats: ({propertyId,date}:any) => void;
  curRent: Rent;
  setCurRent:(rent:Rent) => void;
  showRentForm:Boolean;
  setShowRentForm:()=>void;
  handleRentSubmit:(param:any) => void;
  handleDeleteRent: ({tenantId, rentId}:any)=> void;
}

const usePropertyStore = create<PropertyState>((set, get) => ({
  rentStats:{},
  properties: [],
  rooms: [],
  tenants:[],
  curTenant:{},
  setCurTenant:(tenant:any) => {
    set({curTenant:tenant});
  },
  rents:[],
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
  },

  curRent:{},
  setCurRent: (rent:Rent) => {
    set({curRent:rent});
  },
  showRentForm:false,
  setShowRentForm:() => {
    set({showRentForm:!get().showRentForm});
  },
  fetchRents: async (tenantId:String) => {
    const { rents, tenant, room, property, err } = await fetchData({
      url: `/api/tenants/${tenantId}/rents`,
    });
    if (err) {
      showToast(err);
    } else {
      set({rents});
    }
  },

  handleRentSubmit: async (e:any) => {
    e.preventDefault();
    const method = get().curRent?._id ? "PUT" : "POST";
    const url = get().curRent?._id
      ? `/api/rents/${get().curRent?._id}`
      : `/api/tenants/${get().curTenant._id}/rents`;
    const { msg, err } = await fetchData({
      url,
      method,
      body: get().curRent,
    });
    showToast(msg || err);
    set({curRent:{}});
    get().fetchRents(get().curTenant._id);
    get().setShowRentForm();
  },

  handleDeleteRent: async ({tenantId, rentId}:any) => {
    const { msg, err } = await fetchData({
      url: `/api/rents/${rentId}`,
      method: "DELETE",
    });
    showToast(msg || err);
    get().fetchRents(tenantId);
  }

}))

export default usePropertyStore;
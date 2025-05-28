import { showToast } from '@/components/common/Toast';
import { Cost } from '@/types/cost';
import { EMPTY_PROPERTY, Property } from '@/types/property';
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
  pendingRentTenants?: any[]
}

interface PropertyState {
  rentStats:RentStats,
  properties: Property[];
  curProperty: Property;
  rooms: Room[];
  curRoom: Room;
  setCurRoom:(room:Room)=>void;
  tenants:any;
  curTenant:any;
  setCurTenant:(tenant:any)=>void;
  fetchTenants:(roomId:string) => void;
  rents:Rent[];
  propertiesFetched:boolean;
  fetchProperties: () => void;
  costs: Cost[],
  fetchCosts: (propertyId:string) => void;
  fetchRents:(tenantId:String) => void;
  fetchPropertyStats: ({propertyId,roomId,tenantId,date}:any) => void;
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
  curProperty:EMPTY_PROPERTY,
  rooms: [],
  curRoom:{},
  setCurRoom: (room:Room) => {
    set({curRoom: room});
  },
  tenants:[],
  curTenant:{},
  setCurTenant:(tenant:any) => {
    set({curTenant:tenant});
  },

  fetchTenants: async(roomId: string) => {
    const {properties,rooms,curRoom,tenants,curProperty,costs,totalRents,receivedRents,pendingRents,pendingRentTenants,totalCost,date, err} = await fetchData({url:`/api/rooms/${roomId}/tenants`});
    if (err) {
      showToast(err);
    } else {
      set({rooms,tenants,costs,properties,curProperty,curRoom});
      set({rentStats:{totalRents,receivedRents,pendingRents,pendingRentTenants,totalCost,date}});
    }
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

  fetchPropertyStats: async ({propertyId, roomId, tenantId, selectDate}:any) => {
    let apiUrl = propertyId ? `/api/properties/${propertyId}?date=${selectDate||''}` : `/api/overview?date=${selectDate||''}`;
    if (roomId) {
      apiUrl = `/api/rooms/${roomId}/tenants`;
    } else if (tenantId) {
      apiUrl = `/api/tenants/${tenantId}/rents`;
    }
    const {properties,rooms,curRoom,tenants,curTenant,curProperty,costs,rents,totalRents,receivedRents,pendingRents,pendingRentTenants,totalCost,date} = await fetchData({
      url: apiUrl,
    });
    set({rooms,curRoom,tenants,curTenant,costs,properties,curProperty,rents});
    set({rentStats:{totalRents,receivedRents,pendingRents,pendingRentTenants,totalCost,date}});
  },

  costs:[],
  fetchCosts: async (propertyId:string) => {
    const {costs, err} = await fetchData({url:`/api/properties/${propertyId}/costs`})
    if (err) {
      showToast(err);
      return;
    }
    set({costs});
  },

  curRent:{},
  setCurRent: (rent:Rent) => {
    set({curRent:rent});
  },
  showRentForm:false,
  setShowRentForm:() => {
    const curShowRentForm = get().showRentForm;
    if (curShowRentForm) {
      set({curRent:{}});
    }
    set({showRentForm:!curShowRentForm});
  },
  fetchRents: async (tenantId:String) => {
    const { rents, tenant, room, property, err } = await fetchData({
      url: `/api/tenants/${tenantId}/rents`,
    });
    if (err) {
      showToast(err);
    } else {
      set({rents,curTenant:tenant, curProperty:property,curRoom:room});
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
export const USER_LOGIN = '/api/login';

export const USER_DETAIL = '/api/user';

export const PROPERTY_LIST = '/api/properties';

export const PROPERTY_DETAIL = (propId: string) => `/api/properties/${propId}`;

export const PROPERTY_ROOMS = (propId: string) => `/api/properties/${propId}/rooms`;
export const PROPERTY_COSTS = (propId: string) => `/api/properties/${propId}/costs`;

export const ROOM_LIST = '/api/rooms';

export const ROOM_DETAIL = (roomId: string) => `/api/rooms/${roomId}`;

export const ROOM_TENANTS = (roomId: string) => `/api/rooms/${roomId}/tenants`;
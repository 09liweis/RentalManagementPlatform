export const USER_LOGIN = '/api/login';

export const USER_DETAIL = '/api/user';

export const PROPERTY_LIST = '/api/properties';

export const PROPERTY_DETAIL = (propId: string) => `/api/properties/${propId}`;

export const PROPERTY_ROOMS = (propId: string) => `/api/properties/${propId}/rooms`;
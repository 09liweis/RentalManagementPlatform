export interface Tenant {
    _id?: string;
    name?: string;
    deposit?: string;
    startDate?: string;
    endDate?: string;
    totalRent?: number;
    isCurrent?: boolean;
  }
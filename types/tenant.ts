export interface Tenant {
    _id?: string;
    name?: string;
    deposit?: string;
    rent?: string;
    numberOfPeople?: string | number;
    note?: string;
    startDate?: string;
    endDate?: string;
    totalRent?: number;
    isCurrent?: boolean;
    rentDays?: number;
  }
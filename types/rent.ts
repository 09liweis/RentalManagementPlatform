interface Rent {
  status: string;
}

interface RentStatus {
  [key: string]: string;
}

export const RENT_STATUS: RentStatus = {
  1: "pending",
  2: "paid",
  3: "cancelled",
}

function getRentStatusArray() {
  return Object.keys(RENT_STATUS).map((key) => {
    return {
      key,
      text: RENT_STATUS[key],
    };
  });
}

export const RENT_STATUS_ARRAY = getRentStatusArray();
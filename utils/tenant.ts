interface DurationResult {
  value: number;
  unit: "days" | "months" | "years";
  formatted: string;
}

interface CalculateDaysParams {
  startDate: string;
  endDate?: string | null | undefined;
}

export function calculateDays(params: CalculateDaysParams): number {
  const { startDate, endDate } = params;

  const start = new Date(startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let end: Date;

  // Calculate end date
  if (endDate) {
    end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
  } else {
    // If no end date and start date is not in the future, use today as end date
    if (start <= today) {
      end = today;
    } else {
      // Start date is in the future, use start date as end date
      end = start;
    }
  }

  // Calculate days between start and end date
  const diffTime = end.getTime() - start.getTime();
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return days > 0 ? days : 0;
}

export function getDuration(rentDays: number): DurationResult {
  if (rentDays <= 0) {
    return {
      value: 0,
      unit: "days",
      formatted: ''
    };
  }

  const years = Math.floor(rentDays / 365);
  const remainingDaysAfterYears = rentDays % 365;
  const months = Math.floor(remainingDaysAfterYears / 30);
  const days = remainingDaysAfterYears % 30;

  if (years >= 2) {
    return {
      value: years,
      unit: "years",
      formatted: `${years} year${years !== 1 ? "s" : ""}`,
    };
  } else if (months >= 2) {
    return {
      value: months,
      unit: "months",
      formatted: `${months} month${months !== 1 ? "s" : ""}`,
    };
  } else {
    return {
      value: days,
      unit: "days",
      formatted: `${days} day${days !== 1 ? "s" : ""}`,
    };
  }
}

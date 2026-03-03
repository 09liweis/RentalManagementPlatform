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

  // Build formatted string with years, months, and days together
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} year${years !== 1 ? "s" : ""}`);
  }

  if (months > 0) {
    parts.push(`${months} month${months !== 1 ? "s" : ""}`);
  }

  if (days > 0) {
    parts.push(`${days} day${days !== 1 ? "s" : ""}`);
  }

  const formatted = parts.length > 0 ? parts.join(' ') : '0 days';

  // Determine the main unit for sorting/display purposes
  let mainUnit: "days" | "months" | "years";
  let mainValue: number;

  if (years > 0) {
    mainUnit = "years";
    mainValue = years;
  } else if (months > 0) {
    mainUnit = "months";
    mainValue = months;
  } else {
    mainUnit = "days";
    mainValue = days;
  }

  return {
    value: mainValue,
    unit: mainUnit,
    formatted,
  };
}

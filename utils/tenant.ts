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

export function getDuration(
  startDate: string,
  endDate: string | null | undefined,
): DurationResult {
  // Parse the start date (yyyy-mm-dd format)
  const start = new Date(startDate);

  // Handle null/empty endDate by using current date
  const end = endDate ? new Date(endDate) : new Date();

  // Format current date as yyyy-mm-dd if endDate was null/empty
  if (!endDate) {
    const year = end.getFullYear();
    const month = String(end.getMonth() + 1).padStart(2, '0');
    const day = String(end.getDate()).padStart(2, '0');
    endDate = `${year}-${month}-${day}`; // Optional: store formatted date
  }

  // Validate dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return {
      value: 0,
      unit: "days",
      formatted: ''
    };
  }

  // Ensure start date is before end date
  if (start > end) {
    console.log("Tenant didnt start yet");
    return {
      value: 0,
      unit: "days",
      formatted: ''
    };
  }

  // Calculate differences (rest of the logic remains the same)
  const diffMs = end.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (end.getDate() < start.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  const totalMonths = years * 12 + months;

  if (years >= 2) {
    return {
      value: years,
      unit: "years",
      formatted: `${years} year${years !== 1 ? "s" : ""}`,
    };
  } else if (totalMonths >= 2) {
    return {
      value: totalMonths,
      unit: "months",
      formatted: `${totalMonths} month${totalMonths !== 1 ? "s" : ""}`,
    };
  } else {
    return {
      value: diffDays,
      unit: "days",
      formatted: `${diffDays} day${diffDays !== 1 ? "s" : ""}`,
    };
  }
}

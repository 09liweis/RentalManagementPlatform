interface DurationResult {
  value: number;
  unit: "days" | "months" | "years";
  formatted: string;
}

export function getDuration(
  startDate: string,
  endDate: string,
): DurationResult {
  // Parse the date strings (yyyy-mm-dd format)
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Validate dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid date format. Please use yyyy-mm-dd format.");
  }

  // Ensure start date is before end date
  if (start > end) {
    throw new Error("Start date must be before end date.");
  }

  // Calculate differences
  const diffMs = end.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Calculate years and months more accurately
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  // Adjust for day differences
  if (end.getDate() < start.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  const totalMonths = years * 12 + months;

  // Determine the most appropriate unit to return
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

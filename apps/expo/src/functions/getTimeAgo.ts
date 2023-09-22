export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInMonth(month: number, year: number): number {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month < 0 || month > 11) {
    throw new Error(
      `Invalid month: ${month}. Month should be between 0 (January) and 11 (December).`,
    );
  }

  if (month === 1 && isLeapYear(year)) return 29;
  return daysInMonth[month] || 0;
}

export function formatOutput(value: number, unit: string): string {
  return `${value} ${unit}${value !== 1 ? "s" : ""} ago`;
}

export function getTimeAgo(dateFrom: Date, dateTo: Date): string {
  let yearsDifference = dateTo.getFullYear() - dateFrom.getFullYear();
  let monthsDifference = dateTo.getMonth() - dateFrom.getMonth();
  let daysDifference = dateTo.getDate() - dateFrom.getDate();

  if (daysDifference < 0) {
    monthsDifference -= 1;
    daysDifference += getDaysInMonth(
      (dateTo.getMonth() - 1 + 12) % 12,
      dateTo.getFullYear(),
    );
  }

  if (monthsDifference < 0) {
    yearsDifference -= 1;
    monthsDifference += 12;
  }

  const hoursDifference = dateTo.getHours() - dateFrom.getHours();
  const minutesDifference = dateTo.getMinutes() - dateFrom.getMinutes();
  const secondsDifference = dateTo.getSeconds() - dateFrom.getSeconds();

  if (yearsDifference > 0) return formatOutput(yearsDifference, "year");
  if (monthsDifference > 0) return formatOutput(monthsDifference, "month");
  if (daysDifference > 0) return formatOutput(daysDifference, "day");
  if (hoursDifference > 0) return formatOutput(hoursDifference, "hour");
  if (minutesDifference > 0) return formatOutput(minutesDifference, "minute");
  if (secondsDifference > 0) return formatOutput(secondsDifference, "second");

  return "Just Now";
}

import {
  isLeapYear,
  getDaysInMonth,
  formatOutput,
  getTimeAgo,
} from "../timeAgo";

test("isLeapYear returns true for leap years", () => {
  expect(isLeapYear(2000)).toBe(true);
  expect(isLeapYear(2004)).toBe(true);
});

test("isLeapYear returns false for non-leap years", () => {
  expect(isLeapYear(2001)).toBe(false);
  expect(isLeapYear(1900)).toBe(false);
});

test("getDaysInMonth returns correct days for given month", () => {
  expect(getDaysInMonth(0, 2000)).toBe(31); // January
  expect(getDaysInMonth(1, 2000)).toBe(29); // February in leap year
  expect(getDaysInMonth(1, 2001)).toBe(28); // February in non-leap year
});

test("getDaysInMonth throws error for invalid month", () => {
  expect(() => getDaysInMonth(12, 2000)).toThrow(
    "Invalid month: 12. Month should be between 0 (January) and 11 (December).",
  );
  expect(() => getDaysInMonth(-1, 2000)).toThrow(
    "Invalid month: -1. Month should be between 0 (January) and 11 (December).",
  );
});

test("formatOutput returns correctly formatted string", () => {
  expect(formatOutput(1, "day")).toBe("1 day ago");
  expect(formatOutput(2, "month")).toBe("2 months ago");
});

test("getTimeAgo returns correct difference", () => {
  const now = new Date(2023, 8, 22, 12, 0, 0); // 22nd September 2023, 12:00:00
  const oneDayAgo = new Date(2023, 8, 21, 12, 0, 0);
  const twoHoursAgo = new Date(2023, 8, 22, 10, 0, 0);
  const oneYearAgo = new Date(2022, 8, 22, 12, 0, 0);

  expect(getTimeAgo(oneDayAgo, now)).toBe("1 day ago");
  expect(getTimeAgo(twoHoursAgo, now)).toBe("2 hours ago");
  expect(getTimeAgo(oneYearAgo, now)).toBe("1 year ago");
  expect(getTimeAgo(now, now)).toBe("Just Now");
});

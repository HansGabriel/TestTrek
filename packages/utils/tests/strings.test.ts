import { expect, test } from "vitest";
import { getFullName, truncateString } from "../src/strings";

test("getFullName returns full name", () => {
  expect(getFullName("John", "Doe")).toBe("John Doe");
});

test("getFullName returns Anonymous if no name is provided", () => {
  expect(getFullName(undefined, undefined)).toBe("Anonymous");
});

test("getFullName returns Anonymous if only first name is provided", () => {
  expect(getFullName("John", undefined)).toBe("Anonymous");
});

test("getFullName returns Anonymous if only last name is provided", () => {
  expect(getFullName(undefined, "Doe")).toBe("Anonymous");
});

test("truncateString returns truncated string", () => {
  expect(truncateString("Hello World", 5)).toBe("He...");
});

test("truncateString returns truncated string with custom omission", () => {
  expect(truncateString("Hello World", 5, "***")).toBe("He***");
});

test("truncateString returns original string if length is greater than string length", () => {
  expect(truncateString("Hello World", 20)).toBe("Hello World");
});

test("truncateString returns original string if length is equal to string length", () => {
  expect(truncateString("Hello World", 11)).toBe("Hello World");
});

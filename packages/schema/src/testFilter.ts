import { z } from "zod";

export const testTypeSchema = z.enum(["user", "other", "favorite"]);
export const testSortSchema = z
  .enum(["newest", "oldest", "alphabetical"])
  .optional();

export const testFiltersSchema = z.object({
  testType: testTypeSchema,
  sortBy: testSortSchema,
});

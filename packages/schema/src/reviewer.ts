import { z } from "zod";

export const reviewerSchema = z.object({
  imageUrl: z.string(),
  title: z.string().min(5).max(50),
  content: z.string(),
  visibility: z.enum(["public", "private"]),
});

export const reviewerTypeSchema = z.enum(["user", "other"]);
export const reviewerSortSchema = z
  .enum(["newest", "oldest", "alphabetical"])
  .optional();

export const reviewerFiltersSchema = z.object({
  reviewerType: reviewerTypeSchema,
  sortBy: reviewerSortSchema,
});

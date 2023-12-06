import { z } from "zod";

export const reviewerSchema = z.object({
  imageUrl: z.string({
    errorMap: () => ({
      message: "Image is required",
    }),
  }),
  title: z
    .string({
      errorMap: () => ({
        message: "Title is required",
      }),
    })
    .min(5, {
      message: "Title must be at least 5 characters",
    })
    .max(50, {
      message: "Title must be at most 50 characters",
    }),
  content: z.string(),
  visibility: z.enum(["public", "private"], {
    errorMap: () => ({
      message: "Visibility is required",
    }),
  }),
});

export const reviewerTypeSchema = z.enum(["user", "other", "public"]);
export const reviewerSortSchema = z
  .enum(["newest", "oldest", "alphabetical"])
  .optional();

export const reviewerFiltersSchema = z.object({
  reviewerType: reviewerTypeSchema,
  sortBy: reviewerSortSchema,
});
export const highLightReviewersInput = z
  .object({ amountOfReviewers: z.number().optional() })
  .optional();

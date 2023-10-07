import { z } from "zod";

export const collectionsSchema = z.object({
  image: z.string({
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
  visibility: z.enum(["public", "private"], {
    errorMap: () => ({
      message: "Visibility is required",
    }),
  }),
});

export const collectionSortSchema = z.object({
  sortBy: z.enum(["newest", "oldest", "alphabetical"]).optional(),
});

export const collectionByUserIdSchema = z.object({
  userId: z.string(),
  sortBy: z.enum(["newest", "oldest", "alphabetical"]).optional(),
});

export const highlightCollectionsInput = z
  .object({
    amountOfCollections: z.number().optional(),
  })
  .optional();

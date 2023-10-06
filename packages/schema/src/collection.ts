import { z } from "zod";

export const collectionsSchema = z.object({
  image: z.string(),
  title: z.string().min(5).max(50),
  visibility: z.enum(["public", "private"]),
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
    amountOfColletions: z.number().optional(),
  })
  .optional();

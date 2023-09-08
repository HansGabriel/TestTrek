import { z } from "zod";

export const collectionsSchema = z.object({
  image: z.string(),
  title: z.string().min(5).max(50),
});

import { z } from "zod";

export const testDetailsSchema = z.object({
  image: z.string().url(),
  title: z.string().min(5).max(50),
  description: z.string().min(10).max(100),
  collection: z.string().min(5).max(50),
  visibility: z.enum(["public", "private"]),
  keywords: z.array(z.string().min(3).max(20)),
});

import { z } from "zod";

export const imageSchema = z.object({
  publicId: z.string(),
  secureUrl: z.string(),
});

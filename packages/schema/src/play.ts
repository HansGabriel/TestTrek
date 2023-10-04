import { z } from "zod";

export const playerHighscoreSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  imageUrl: z.string(),
  highScore: z.number(),
  createdAt: z.date(),
});

export const playersHighscoreSchema = z.array(playerHighscoreSchema);

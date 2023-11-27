import { z } from "zod";

export const createTestHistoryInputSchema = z.object({
  creatorName: z.string(),
  creatorUsername: z.string(),
  imageUrl: z.string(),
  title: z.string(),
  description: z.string(),
  visibility: z.enum(["public", "private"]),
  keywords: z.array(z.string()),
  score: z.number().int(),
  time: z.number().int(),
  questions: z.array(
    z.object({
      title: z.string(),
      image: z.string().optional(),
      time: z.number().int(),
      points: z.number().int(),
      type: z.enum([
        "multiple_choice",
        "true_or_false",
        "multi_select",
        "identification",
      ]),
      choices: z.array(
        z.object({
          text: z.string(),
          isCorrect: z.boolean(),
          isChosen: z.boolean(),
        }),
      ),
    }),
  ),
});

import { z } from "zod";

export const createTestHistoryInputSchema = z.object({
  testId: z.string(),
  playId: z.string(),
  score: z.number().int(),
  time: z.number().int(),
  questions: z.array(
    z.object({
      title: z.string(),
      image: z.string().optional(),
      time: z.number().int(),
      points: z.number().int(),
      pointsEarned: z.number().int(),
      timeElapsed: z.number().int(),
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

export type CreateTestHistoryInput = z.infer<
  typeof createTestHistoryInputSchema
>;
export type QuestionHistory = CreateTestHistoryInput["questions"];
export type ChoiceHistory = QuestionHistory[0]["choices"][0];

import { z } from "zod";

export const timeLimitSchema = z
  .number()
  .int()
  .positive()
  .transform((n) => {
    if (n <= 0) {
      return 10;
    }
    return n;
  });

export const pointsSchema = z
  .number()
  .int()
  .positive()
  .transform((n) => {
    if (n <= 0) {
      return 50;
    }
    return n;
  });

export const choicesSchema = z
  .array(
    z.object({
      isCorrect: z.boolean(),
      text: z.string(),
    }),
  )
  .refine((choices) => choices.some((choice) => choice.isCorrect));

export const questionSchema = z.discriminatedUnion("type", [
  z.object({
    question: z.string(),
    choices: choicesSchema,
    type: z.literal("multipleChoice"),
    timeLimit: timeLimitSchema,
    points: pointsSchema,
  }),
  z.object({
    question: z.string(),
    choices: choicesSchema,
    type: z.literal("identification"),
    timeLimit: timeLimitSchema,
    points: pointsSchema,
  }),
  z.object({
    question: z.string(),
    choices: choicesSchema,
    type: z.literal("multiselect"),
    timeLimit: timeLimitSchema,
    points: pointsSchema,
  }),
  z.object({
    question: z.string(),
    choices: choicesSchema,
    type: z.literal("trueOrFalse"),
    timeLimit: timeLimitSchema,
    points: pointsSchema,
  }),
]);

export const questionsSchema = z.array(questionSchema);

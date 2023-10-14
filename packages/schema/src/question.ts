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

export const questionSchema = z.discriminatedUnion("type", [
  z.object({
    question: z.string(),
    choices: z.array(
      z.object({
        isCorrect: z.boolean(),
        text: z.string(),
      }),
    ),
    type: z.literal("multipleChoice"),
    timeLimit: timeLimitSchema,
    points: pointsSchema,
  }),
  z.object({
    question: z.string(),
    answer: z.string(),
    type: z.literal("identification"),
    timeLimit: timeLimitSchema,
    points: pointsSchema,
  }),
  z.object({
    question: z.string(),
    choices: z.array(
      z.object({
        isCorrect: z.boolean(),
        text: z.string(),
      }),
    ),
    type: z.literal("multiselect"),
    timeLimit: timeLimitSchema,
    points: pointsSchema,
  }),
  z.object({
    question: z.string(),
    answer: z.string(),
    type: z.literal("trueOrFalse"),
    timeLimit: timeLimitSchema,
    points: pointsSchema,
  }),
  z.object({
    question: z.string(),
    choices: z.array(
      z.object({
        isCorrect: z.boolean(),
        text: z.string(),
      }),
    ),
    type: z.literal("enumeration"),
    timeLimit: timeLimitSchema,
    points: pointsSchema,
  }),
]);

export const questionsSchema = z.array(questionSchema);

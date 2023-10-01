import { z } from "zod";

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
  }),
  z.object({
    question: z.string(),
    answer: z.string(),
    type: z.literal("identification"),
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
  }),
  z.object({
    question: z.string(),
    answer: z.string(),
    type: z.literal("trueOrFalse"),
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
  }),
]);

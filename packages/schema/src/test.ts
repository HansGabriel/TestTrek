import { z } from "zod";

export const choiceSchema = z.object({
  text: z.string().min(1).max(50),
  isCorrect: z.boolean(),
});

export const modifiedChoiceSchema = choiceSchema.merge(
  z.object({
    possibleAnswers: z.array(z.string().min(1).max(50)),
  }),
);

export const questionSchema = z.discriminatedUnion("type", [
  z.object({
    title: z.string().min(1).max(50),
    image: z.string().min(5).max(200).optional(),
    time: z.number().min(1).max(1000),
    points: z.number().min(1).max(10_000),
    type: z.literal("multiple_choice"),
    choices: z.array(choiceSchema),
  }),
  z.object({
    title: z.string().min(1).max(50),
    image: z.string().min(5).max(200).optional(),
    time: z.number().min(1).max(1000),
    points: z.number().min(1).max(10_000),
    type: z.literal("true_or_false"),
    choices: z.array(choiceSchema),
  }),
  z.object({
    title: z.string().min(1).max(50),
    image: z.string().min(5).max(200).optional(),
    time: z.number().min(1).max(1000),
    points: z.number().min(1).max(10_000),
    type: z.literal("multi_select"),
    choices: z.array(choiceSchema),
  }),
  z.object({
    title: z.string().min(1).max(50),
    image: z.string().min(5).max(200).optional(),
    time: z.number().min(1).max(1000),
    points: z.number().min(1).max(10_000),
    type: z.literal("identification"),
    answer: z.string().min(1).max(50),
    possibleAnswers: z.array(z.string().min(1).max(50)),
  }),
  z.object({
    title: z.string().min(1).max(50),
    image: z.string().min(5).max(200).optional(),
    time: z.number().min(1).max(1000),
    points: z.number().min(1).max(10_000),
    type: z.literal("enumeration"),
    choices: z.array(modifiedChoiceSchema),
  }),
]);

export const testDetailsSchema = z.object({
  image: z.string(),
  title: z.string().min(5).max(50),
  description: z.string().min(10).max(100),
  collections: z.array(z.string().min(3).max(100)),
  visibility: z.enum(["public", "private"]),
  keywords: z.array(z.string().min(3).max(20)),
});

export const testInputSchema = z.object({
  image: z.string(),
  title: z.string().min(5).max(50),
  description: z.string().min(10).max(100),
  collection: z.string().min(3).max(100).optional(),
  visibility: z.enum(["public", "private"]),
  keywords: z.array(z.string().min(3).max(20)),
  questions: z.array(questionSchema),
});

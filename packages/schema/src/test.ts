import { z } from "zod";

export const choiceSchema = z.object({
  text: z.string().min(1).max(100),
  isCorrect: z.boolean(),
});

export const modifiedChoiceSchema = choiceSchema.merge(
  z.object({
    possibleAnswers: z.array(z.string().min(1).max(100)),
  }),
);

export const questionSchema = z.discriminatedUnion("type", [
  z.object({
    title: z.string().min(1).max(150),
    image: z.string().min(5).max(200).nullable().optional(),
    time: z.number().min(1).max(1000),
    points: z.number().min(1).max(10_000),
    type: z.literal("multiple_choice"),
    choices: z.array(choiceSchema),
  }),
  z.object({
    title: z.string().min(1).max(150),
    image: z.string().min(5).max(200).nullable().optional(),
    time: z.number().min(1).max(1000),
    points: z.number().min(1).max(10_000),
    type: z.literal("true_or_false"),
    choices: z.array(choiceSchema),
  }),
  z.object({
    title: z.string().min(1).max(150),
    image: z.string().min(5).max(200).nullable().optional(),
    time: z.number().min(1).max(1000),
    points: z.number().min(1).max(10_000),
    type: z.literal("multi_select"),
    choices: z.array(choiceSchema),
  }),
  z.object({
    title: z.string().min(1).max(150),
    image: z.string().min(5).max(200).nullable().optional(),
    time: z.number().min(1).max(1000),
    points: z.number().min(1).max(10_000),
    type: z.literal("identification"),
    choices: z.array(choiceSchema),
  }),
  z.object({
    title: z.string().min(1).max(150),
    image: z.string().min(5).max(200).nullable().optional(),
    time: z.number().min(1).max(1000),
    points: z.number().min(1).max(10_000),
    type: z.literal("enumeration"),
    choices: z.array(modifiedChoiceSchema),
  }),
]);

export const testDetailsSchema = z.object({
  image: z.string(),
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(1000),
  collections: z.array(z.string().min(3).max(100)),
  visibility: z.enum(["public", "private"]),
  keywords: z.array(z.string().min(3).max(20)),
});

export const highlightTestsInput = z
  .object({ amountOfTests: z.number().optional() })
  .optional();

export const testInputSchema = z.object({
  image: z.string({
    errorMap: () => ({
      message: "Image is required",
    }),
  }),
  title: z
    .string({
      errorMap: () => ({
        message: "Title is required",
      }),
    })
    .min(5, {
      message: "Title must be at least 5 characters",
    })
    .max(50, {
      message: "Title must be at most 100 characters",
    }),
  description: z
    .string({
      errorMap: () => ({
        message: "Description is required",
      }),
    })
    .min(10, {
      message: "Description must be at least 10 characters",
    })
    .max(1000, {
      message: "Description must be at most 1000 characters",
    }),
  visibility: z.enum(["public", "private"], {
    errorMap: () => ({
      message: "Visibility is required",
    }),
  }),
  keywords: z.array(
    z
      .string()
      .min(3, {
        message: "Keyword must be at least 3 characters",
      })
      .max(20, {
        message: "Keyword must be at most 20 characters",
      }),
  ),
  questions: z
    .array(questionSchema)
    .min(5, {
      message: "At least five questions is required",
    })
    .max(100, {
      message: "At most 100 questions are allowed",
    }),
});

import { z } from "zod";

export const singleQuestionPromptInput = z.object({
  message: z.string(),
  questionType: z.enum([
    "multipleChoice",
    "identification",
    "trueOrFalse",
    "multiselect",
  ]),
});

export const multipleQuestionsPromptInput = z.object({
  message: z.string(),
  questionType: z.enum([
    "multipleChoice",
    "identification",
    "trueOrFalse",
    "multiselect",
  ]),
  numOfQuestions: z.number().optional(),
  numOfChoicesPerQuestion: z.number().optional(),
  maxCharsPerQuestion: z.number().optional(),
  maxCharsPerChoice: z.number().optional(),
});

export const multipleRandomQuestionsPromptInput = z.object({
  message: z.string(),
  numOfQuestions: z.number(),
});

import { z } from "zod";

export const singleQuestionPromptInput = z.object({
  message: z.string(),
  questionType: z.enum([
    "multipleChoice",
    "identification",
    "trueOrFalse",
    "enumeration",
    "multiselect",
  ]),
});

export const multipleQuestionsPromptInput = z.object({
  message: z.string(),
  questionType: z.enum([
    "multipleChoice",
    "identification",
    "trueOrFalse",
    "enumeration",
    "multiselect",
  ]),
  numOfQuestions: z.number().optional(),
  numOfChoicesPerQuestion: z.number().optional(),
  maxCharsPerQuestion: z.number().optional(),
  maxCharsPerChoice: z.number().optional(),
});

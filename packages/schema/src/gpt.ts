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
  numOfQuestions: z.number(),
  numOfChoicesPerQuestion: z.number(),
  maxCharsPerQuestion: z.number(),
  maxCharsPerChoice: z.number(),
});

import { generateChoicesPrompt, timeAndPointsPrompt } from "./gptHandlers";
import {
  parseMultipleChoiceResponse,
  parseMultiselectResponse,
  parseIdentificationResponse,
  parseTrueOrFalseResponse,
  MultipleChoicePrompt,
  MultiselectPrompt,
  IdentificationPrompt,
  TrueOrFalsePrompt,
} from "./gptHandlers";

type ParsedQuestion =
  | MultipleChoicePrompt
  | MultiselectPrompt
  | IdentificationPrompt
  | TrueOrFalsePrompt;

export type QuestionType =
  | "multipleChoice"
  | "multiselect"
  | "identification"
  | "trueOrFalse";

const questionTypes: QuestionType[] = [
  "multipleChoice",
  "multiselect",
  "identification",
  "trueOrFalse",
];
const typeCounts: Record<QuestionType, number> = {
  multipleChoice: 0,
  multiselect: 0,
  identification: 0,
  trueOrFalse: 0,
};

export const questionFormatGenerators: {
  [key in QuestionType]: (
    numChoices?: number,
    maxCharsForQuestion?: number,
    maxCharsForChoice?: number,
  ) => string;
} = {
  multipleChoice: (
    numChoices = 4,
    maxCharsForQuestion = 100,
  ) => `separator\nQuestion: [Your question here, max ${maxCharsForQuestion} characters]
  ${generateChoicesPrompt(
    numChoices,
  )}\nCorrect Answer: Option [Correct option number] ${timeAndPointsPrompt}`,

  multiselect: (
    numChoices = 4,
    maxCharsForQuestion = 100,
  ) => `separator\nQuestion: [Your question here, max ${maxCharsForQuestion} characters]
  ${generateChoicesPrompt(
    numChoices,
  )}\nAll Correct Answers: Options [Correct option numbers separated by commas, e.g., 1,3] ${timeAndPointsPrompt}`,

  identification: (maxCharsForQuestion = 100, maxCharsForChoice = 68) =>
    `separator\nQuestion: [Your question here, max ${maxCharsForQuestion} characters]\nAnswer: [Your answer here, max ${maxCharsForChoice} characters] ${timeAndPointsPrompt}`,

  trueOrFalse: (maxCharsForQuestion = 100) =>
    `separator\nQuestion: [Your question here, max ${maxCharsForQuestion} characters]\nAnswer: [True/False] ${timeAndPointsPrompt}`,
};

export const generateCombinedQuestionPrompts = (
  numQuestions: number,
  message: string,
): string => {
  for (let i = 0; i < numQuestions; i++) {
    const randomType =
      questionTypes[Math.floor(Math.random() * questionTypes.length)];
    typeCounts[randomType as QuestionType]++;
  }

  let combinedPrompts = `Based on: "${message}", create the following questions:\n`;

  questionTypes.forEach((type) => {
    if (typeCounts[type] > 0) {
      combinedPrompts += `\n${
        typeCounts[type]
      } questions of type '${type}' using the format:\n${questionFormatGenerators[
        type
      ]()}\n`;
    }
  });

  return combinedPrompts.trim();
};

export const processGeneratedQuestions = (
  generatedMessage: string,
): ParsedQuestion[] => {
  const questionBlocks = generatedMessage
    .split("separator")
    .filter((block) => block.trim() !== "");
  const parsedQuestions: ParsedQuestion[] = [];

  questionBlocks.forEach((questionBlock) => {
    if (questionBlock.includes("Correct Answer:")) {
      parsedQuestions.push(parseMultipleChoiceResponse(questionBlock));
    } else if (questionBlock.includes("All Correct Answers:")) {
      parsedQuestions.push(parseMultiselectResponse(questionBlock));
    } else if (
      questionBlock.includes("Answer:") &&
      !(questionBlock.includes("True") || questionBlock.includes("False"))
    ) {
      parsedQuestions.push(parseIdentificationResponse(questionBlock));
    } else if (
      questionBlock.includes("True") ||
      questionBlock.includes("False")
    ) {
      parsedQuestions.push(parseTrueOrFalseResponse(questionBlock));
    }
  });

  return parsedQuestions;
};

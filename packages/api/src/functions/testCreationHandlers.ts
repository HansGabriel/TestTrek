import {
  MultipleChoicePrompt,
  TrueOrFalsePrompt,
  parseMultipleChoiceResponse,
  parseTrueOrFalseResponse,
  promptGenerators,
} from "./gptHandlers";

export interface QuestionPromptInput {
  content: string;
  type: keyof typeof promptGenerators;
  numOfQuestions?: number;
  numOfChoicesPerQuestion?: number;
  maxCharsPerQuestion?: number;
  maxCharsPerChoice?: number;
}

export const generateQuestionPrompt = ({
  content,
  type,
  numOfQuestions = 1,
  numOfChoicesPerQuestion = 4,
  maxCharsPerQuestion = 100,
  maxCharsPerChoice = 68,
}: QuestionPromptInput): string => {
  const generatorFunction = promptGenerators[type];
  let basePrompt = "";

  if (typeof generatorFunction === "function") {
    basePrompt = generatorFunction(
      content,
      numOfChoicesPerQuestion,
      maxCharsPerQuestion,
      maxCharsPerChoice,
    );
  } else {
    basePrompt = `Please provide information based on: "${content}"`;
  }

  return `Generate ${numOfQuestions} questions of type "${type}" based on the content provided:\n\n${basePrompt}`;
};

export const parseMultipleChoiceQuestions = (
  generatedMessage: string,
): MultipleChoicePrompt[] => {
  return generatedMessage
    .split(/(?=Question:)/)
    .filter((segment) => segment.trim().length > 0)
    .map((segment) => {
      return parseMultipleChoiceResponse(segment.trim());
    });
};

export const parseTrueOrFalseQuestions = (
  generatedMessage: string,
): TrueOrFalsePrompt[] => {
  return generatedMessage
    .split(/(?=Question:)/)
    .filter((segment) => segment.trim().length > 0)
    .map((segment) => {
      return parseTrueOrFalseResponse(segment.trim());
    });
};

//Handle other question types soon

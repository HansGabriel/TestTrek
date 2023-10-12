import {
  MultipleChoicePrompt,
  parseMultipleChoiceResponse,
  promptGenerators,
} from "./gptHandlers";

interface QuestionPromptInput {
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

  const fullPromptArray = Array(numOfQuestions).fill(basePrompt);
  const numberedPrompt = fullPromptArray
    .map((prompt, index) => `${index + 1}. ${prompt}`)
    .join("\n\n");

  return `Generate ${numOfQuestions} questions of type "${type}" based on the content provided:\n\n${numberedPrompt}`;
};

export const parseMultipleChoiceQuestions = (
  generatedMessage: string,
): MultipleChoicePrompt[] => {
  return generatedMessage
    .split(/(?=\d+\.\s*Question:)/)
    .filter((segment) => segment.trim().length > 0)
    .map((segment) => {
      const cleanedSegment = segment.replace(/^\d+\.\s*/, "");
      return parseMultipleChoiceResponse(cleanedSegment);
    });
};

//Handle other question types soon

import { generateChoicesPrompt, timeAndPointsPrompt } from "./gptHandlers";
import { fetchGPT } from "../services/gptApiHandlers";
import { chunk } from "lodash";
import { questionsSchema } from "@acme/schema/src/question";
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

export type ParsedQuestion =
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
    maxCharsForChoice = 50,
  ) => `separator\nQuestion: [Your question here, max ${maxCharsForQuestion} characters]
${generateChoicesPrompt(
  numChoices,
  maxCharsForChoice,
)}\nCorrect Answer: Option [Correct option number and only 1 correct answer] ${timeAndPointsPrompt}`,
  multiselect: (
    numChoices = 4,
    maxCharsForQuestion = 100,
    maxCharsForChoice = 50,
  ) => `separator\nQuestion: [Your question here, max ${maxCharsForQuestion} characters]
${generateChoicesPrompt(
  numChoices,
  maxCharsForChoice,
)}\nAll Correct Answers: Options [Correct option numbers separated by commas (e.g., 1,3) and at least one correct answer] ${timeAndPointsPrompt}`,
  identification: (maxCharsForQuestion = 100, maxCharsForChoice = 50) =>
    `separator\nQuestion: [Your question here, max ${maxCharsForQuestion} characters]\nAnswer: [Your answer here, max ${maxCharsForChoice} characters, and the answer should be concise and straight to the point and must not include unnesessary words or phrases] ${timeAndPointsPrompt}`,
  trueOrFalse: (maxCharsForQuestion = 100) =>
    `separator\nQuestion: [Your question here, max ${maxCharsForQuestion} characters]\nAnswer: [True/False] ${timeAndPointsPrompt}`,
};

export const parseTopicsList = (topicsList: string): string[] => {
  const topics = topicsList.split("|").map((topic) => topic.trim());

  return topics;
};

export const divideStringIntoChunks = (
  string: string,
  chunkSize = 3000,
): string[] => {
  const chunks = chunk(string.split("\n"), chunkSize);

  return chunks.map((chunk) => chunk.join("\n"));
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

    typeCounts[type] = 0;
  });

  return combinedPrompts.trim();
};

export const processGeneratedQuestions = (
  generatedMessage: string,
  numOfQuestions: number,
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

  const sliceParsedQuestions = parsedQuestions.slice(0, numOfQuestions);

  return sliceParsedQuestions;
};

export const generateCombinedQuestions = async (
  messages: string | string[],
  numOfQuestions: number,
  BATCH_SIZE = 2,
  RETRY_LIMIT = 5,
) => {
  const arrayLength = Math.floor(numOfQuestions / BATCH_SIZE);

  if (typeof messages === "string") {
    const processedQuestions = await Promise.all(
      Array.from({ length: arrayLength }, async () => {
        let retryCount = 0;
        let finalProcessedQuestions: ParsedQuestion[] = [];
        let hasOneAnswer = false;

        while (!hasOneAnswer && retryCount < RETRY_LIMIT) {
          const promptText = generateCombinedQuestionPrompts(
            BATCH_SIZE,
            messages,
          );

          const generatedMessage = await fetchGPT(promptText);

          const processedQuestions = processGeneratedQuestions(
            generatedMessage,
            BATCH_SIZE,
          );

          const parseResult = questionsSchema.safeParse(processedQuestions);

          if (parseResult.success) {
            hasOneAnswer = true;
            finalProcessedQuestions = processedQuestions;
          }

          retryCount++;
        }

        return finalProcessedQuestions;
      }),
    );

    return processedQuestions.flat();
  }
  if (Array.isArray(messages)) {
    const processedQuestions = await Promise.all(
      messages.map(async (_, index) => {
        let retryCount = 0;
        let finalProcessedQuestions: ParsedQuestion[] = [];
        let hasOneAnswer = false;

        while (!hasOneAnswer && retryCount < RETRY_LIMIT) {
          const promptText = generateCombinedQuestionPrompts(
            BATCH_SIZE,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            messages[index] ??
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              messages[Math.floor(Math.random() * messages.length)]!,
          );

          const generatedMessage = await fetchGPT(promptText);

          const processedQuestions = processGeneratedQuestions(
            generatedMessage,
            BATCH_SIZE,
          );

          const parseResult = questionsSchema.safeParse(processedQuestions);

          if (parseResult.success) {
            hasOneAnswer = true;
            finalProcessedQuestions = processedQuestions;
          }

          retryCount++;
        }

        return finalProcessedQuestions;
      }),
    );
    return processedQuestions.flat();
  }

  return [];
};

import { protectedProcedure, router } from "../trpc";
import {
  parseMultipleChoiceResponse,
  parseIdentificationResponse,
  parseMultiselectResponse,
  parseTrueOrFalseResponse,
  generatePromptForType,
  generateTopicsPrompt,
} from "../functions/gptHandlers";
import "dotenv/config";
import { questionSchema, questionsSchema } from "@acme/schema/src/question";
import {
  generateQuestionPrompt,
  parseIdentificationQuestions,
  parseMultipleChoiceQuestions,
  parseMultiselectQuestions,
  parseTrueOrFalseQuestions,
} from "../functions/testCreationHandlers";
import {
  multipleQuestionsPromptInput,
  multipleRandomQuestionsPromptInput,
  singleQuestionPromptInput,
} from "../../../schema/src/gpt";
import { fetchGPT } from "../services/gptApiHandlers";
import {
  parseTopicsList,
  divideStringIntoChunks,
} from "../functions/randomQuestionsHandlers";
import { generateCombinedQuestions } from "../functions/randomQuestionsHandlers";

export const gptApiRouter = router({
  generateQuestion: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/gpt/question",
      },
    })
    .input(singleQuestionPromptInput)
    .output(questionSchema)
    .mutation(async ({ input }) => {
      const { message, questionType } = input;

      const promptText = generatePromptForType(message, questionType);

      const generatedMessage = await fetchGPT(promptText);

      let answer;

      switch (questionType) {
        case "multipleChoice":
          answer = parseMultipleChoiceResponse(generatedMessage);
          break;
        case "identification":
          answer = parseIdentificationResponse(generatedMessage);
          break;
        case "trueOrFalse":
          answer = parseTrueOrFalseResponse(generatedMessage);
          break;
        case "multiselect":
          answer = parseMultiselectResponse(generatedMessage);
          break;
        default:
          answer = generatedMessage;
          break;
      }

      return answer;
    }),

  generateMultipleQuestions: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/gpt/questions",
      },
    })
    .input(multipleQuestionsPromptInput)
    .output(questionsSchema)
    .mutation(async ({ input }) => {
      const {
        message,
        questionType,
        numOfQuestions,
        numOfChoicesPerQuestion,
        maxCharsPerQuestion,
        maxCharsPerChoice,
      } = input;

      const promptText = generateQuestionPrompt({
        content: message,
        type: questionType,
        numOfQuestions: numOfQuestions,
        numOfChoicesPerQuestion: numOfChoicesPerQuestion,
        maxCharsPerQuestion: maxCharsPerQuestion,
        maxCharsPerChoice: maxCharsPerChoice,
      });

      const generatedMessage = await fetchGPT(promptText);

      let answer;

      switch (questionType) {
        case "multipleChoice":
          answer = parseMultipleChoiceQuestions(generatedMessage);
          break;
        case "trueOrFalse":
          answer = parseTrueOrFalseQuestions(generatedMessage);
          break;
        case "multiselect":
          answer = parseMultiselectQuestions(generatedMessage);
          break;
        case "identification":
          answer = parseIdentificationQuestions(generatedMessage);
          break;
        default:
          answer = generatedMessage;
          break;
      }

      return answer;
    }),

  generateMultipleRandomQuestions: protectedProcedure
    .input(multipleRandomQuestionsPromptInput)
    .mutation(async ({ input }) => {
      const { message, numOfQuestions, messageType } = input;

      let topics: string[] = [];

      if (messageType === "generate-topics") {
        const topicsPrompt = generateTopicsPrompt(message);

        const topicsResponse = await fetchGPT(topicsPrompt);

        topics = parseTopicsList(topicsResponse);
      } else if (messageType === "batch-messages") {
        topics = divideStringIntoChunks(message);
      }

      let partialQuestions = await generateCombinedQuestions(
        !messageType ? message : topics,
        numOfQuestions,
      );

      let remainingQuestionsLength = numOfQuestions - partialQuestions.length;

      while (remainingQuestionsLength > 0) {
        const remainingQuestions = await generateCombinedQuestions(
          message,
          remainingQuestionsLength,
          1,
        );

        partialQuestions = [...partialQuestions, ...remainingQuestions];
        remainingQuestionsLength = numOfQuestions - partialQuestions.length;
      }

      return partialQuestions;
    }),
});

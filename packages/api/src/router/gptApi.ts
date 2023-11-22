import { protectedProcedure, router } from "../trpc";
import {
  parseMultipleChoiceResponse,
  parseEnumerationResponse,
  parseIdentificationResponse,
  parseMultiselectResponse,
  parseTrueOrFalseResponse,
  generatePromptForType,
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
  singleQuestionPromptInput,
} from "../../../schema/src/gpt";
import { fetchGPT } from "../services/gptApiHandlers";

export const gptApiRouter = router({
  generateQuestion: protectedProcedure
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
        case "enumeration":
          answer = parseEnumerationResponse(generatedMessage);
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
});

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
import { questionSchema } from "@acme/schema/src/question";
import {
  generateQuestionPrompt,
  parseMultipleChoiceQuestions,
} from "../functions/testCreationHandlers";
import {
  multipleQuestionsPromptInput,
  singleQuestionPromptInput,
} from "../../../schema/src/gpt";

export const gptApiRouter = router({
  generateQuestion: protectedProcedure
    .input(singleQuestionPromptInput)
    .output(questionSchema)
    .mutation(async ({ input }) => {
      const { message, questionType } = input;
      const apiKey = process.env.GPT_KEY;

      const promptText = generatePromptForType(message, questionType);

      const prompt = {
        role: "user",
        content: promptText,
      };

      const apiRequestBody = {
        model: "gpt-3.5-turbo",
        messages: [prompt],
      };

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        },
      );

      const data = await response.json();
      const generatedMessage = data.choices[0].message.content;

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
    .output(questionSchema)
    .mutation(async ({ input }) => {
      const {
        message,
        questionType,
        numOfQuestions,
        numOfChoicesPerQuestion,
        maxCharsPerQuestion,
        maxCharsPerChoice,
      } = input;
      const apiKey = process.env.GPT_KEY;

      const promptText = generateQuestionPrompt({
        content: message,
        type: questionType,
        numOfQuestions: numOfQuestions,
        numOfChoicesPerQuestion: numOfChoicesPerQuestion,
        maxCharsPerQuestion: maxCharsPerQuestion,
        maxCharsPerChoice: maxCharsPerChoice,
      });

      const prompt = {
        role: "user",
        content: promptText,
      };

      const apiRequestBody = {
        model: "gpt-3.5-turbo",
        messages: [prompt],
      };

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        },
      );

      const data = await response.json();
      const generatedMessage = data.choices[0].message.content;

      let answer;

      switch (questionType) {
        case "multipleChoice":
          answer = parseMultipleChoiceQuestions(generatedMessage);
          break;
        //Handle other question types soon
        default:
          answer = generatedMessage;
          break;
      }

      return answer;
    }),
});

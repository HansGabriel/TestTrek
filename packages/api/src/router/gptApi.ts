import { z } from "zod";
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

export const gptApiRouter = router({
  generateQuestion: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        questionType: z.enum([
          "multipleChoice",
          "identification",
          "trueOrFalse",
          "enumeration",
          "multiselect",
        ]),
      }),
    )
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

      console.log("GPT-3 Response:", data);

      console.log(generatedMessage);

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
});

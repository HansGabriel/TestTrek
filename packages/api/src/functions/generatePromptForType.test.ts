import { generatePromptForType } from "./gptHandlers";
import { describe, it, expect } from "vitest";
import { timeAndPointsPrompt } from "./gptHandlers"; // Make sure this import is correct

describe("generatePromptForType", () => {
  const message = "sample message";

  it("should generate prompt for multipleChoice with default number of choices", () => {
    const result = generatePromptForType(message, "multipleChoice");
    expect(result).toEqual(
      `Create a multiple choice question about: "${message}" with 4 choices. Each choice must not exceed 68 characters. Format as:
Question: [Your question here]
Option 1: [Choice 1]
Option 2: [Choice 2]
Option 3: [Choice 3]
Option 4: [Choice 4]
Correct Answer: Option [Correct option number]
${timeAndPointsPrompt}`,
    );
  });

  it("should generate prompt for identification", () => {
    const result = generatePromptForType(message, "identification");
    expect(result).toEqual(
      `Create an identification question based on: "${message}". The answer must not exceed 68 characters. Format as:
Question: [Your question here]
Answer: [Your answer here]
${timeAndPointsPrompt}`,
    );
  });

  it("should generate prompt for trueOrFalse", () => {
    const result = generatePromptForType(message, "trueOrFalse");
    expect(result).toEqual(
      `Based on the information "${message}", generate a true or false question. The answer must not exceed 68 characters. Format as:
Question: [Your question here]
Answer: [True/False]
${timeAndPointsPrompt}`,
    );
  });

  it("should generate prompt for multiselect with default number of choices", () => {
    const result = generatePromptForType(message, "multiselect");
    expect(result).toEqual(
      `Create a multiselect question about: "${message}" with 4 choices. The choices must not exceed 68 characters. Multiple answers can be correct. Format as:
Question: [Your question here]
Option 1: [Choice 1]
Option 2: [Choice 2]
Option 3: [Choice 3]
Option 4: [Choice 4]
Correct Answers: Options [Correct option numbers separated by commas, e.g., 1,3]
${timeAndPointsPrompt}`,
    );
  });

  it("should generate prompt for enumeration with default number of answers", () => {
    const result = generatePromptForType(message, "enumeration");
    expect(result).toEqual(
      `Provide an enumeration question related to "${message}" with a maximum of 4 inputs. The choices or answer must not exceed 68 characters. Format as:
Question: [Your question here]
Answers: [1. Answer1, 2. Answer2, 3. Answer3, 4. Answer4]
${timeAndPointsPrompt}`,
    );
  });

  it("should generate default prompt", () => {
    // Use a type not handled
    const result = generatePromptForType(message, "unhandledType" as any);
    expect(result).toEqual(`Please provide information based on: "${message}"`);
  });
});

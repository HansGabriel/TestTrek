import { generatePromptForType } from "./gptHandlers";
import { describe, it, expect } from "vitest";

describe("generatePromptForType", () => {
  const message = "sample message";

  it("should generate prompt for multipleChoice", () => {
    const result = generatePromptForType(message, "multipleChoice");
    expect(result).toEqual(
      `Create a multiple choice question about: "${message}" with 4 choices. Each choices must not exceed 68 characters. Format as:\nQuestion: [Your question here]\nOption 1: [Choice 1]\nOption 2: [Choice 2]\nOption 3: [Choice 3]\nOption 4: [Choice 4]\nCorrect Answer: Option [Correct option number]`,
    );
  });

  it("should generate prompt for identification", () => {
    const result = generatePromptForType(message, "identification");
    expect(result).toEqual(
      `Create an identification question based on: "${message}". The answer must not exceed 68 characters. Format as: Question: [Your question here]\nAnswer: [Your answer here]`,
    );
  });

  it("should generate prompt for trueOrFalse", () => {
    const result = generatePromptForType(message, "trueOrFalse");
    expect(result).toEqual(
      `Based on the information "${message}", generate a true or false question. The answer must not exceed 68 characters. Format as: Question: [Your question here]\nAnswer: [True/False]`,
    );
  });

  it("should generate prompt for multiselect", () => {
    const result = generatePromptForType(message, "multiselect");
    expect(result).toEqual(
      `Create a multiselect question about: "${message}" with 4 choices. The choices must not exceed 68 characters. Multiple answers can be correct. Format as:\nQuestion: [Your question here]\nOption 1: [Choice 1]\nOption 2: [Choice 2]\nOption 3: [Choice 3]\nOption 4: [Choice 4]\nCorrect Answers: Options [Correct option numbers separated by commas, e.g., 1,3]`,
    );
  });

  it("should generate prompt for enumeration", () => {
    const result = generatePromptForType(message, "enumeration");
    expect(result).toEqual(
      `Provide an enumeration question related to "${message}" with a maximum of 4 inputs. The choices or answer must not exceed 68 characters. Format as: Question: [Your question here]\nAnswers: [1. Answer1, 2. Answer2, ...]`,
    );
  });

  it("should generate default prompt", () => {
    // Use a type not handled by the switch statement
    const result = generatePromptForType(message, "unhandledType" as any);
    expect(result).toEqual(`Please provide information based on: "${message}"`);
  });
});

import { generatePromptForType } from "../gptHandlers";
import { describe, it, expect } from "vitest";
import { timeAndPointsPrompt } from "../gptHandlers";

describe("generatePromptForType", () => {
  const message = "sample message";

  it("should generate prompt for multipleChoice with default number of choices", () => {
    const result = generatePromptForType(message, "multipleChoice");
    expect(result).toEqual(
      `Create a multiple choice question (maximum of 100 characters) about: "${message}" with 4 choices. Each choice must not exceed 68 characters. Format as:
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
      `Create an identification question (maximum of 100 characters) based on: "${message}". The answer must not exceed 68 characters. Format as:
Question: [Your question here]
Answer: [Your answer here]
${timeAndPointsPrompt}`,
    );
  });

  it("should generate prompt for trueOrFalse", () => {
    const result = generatePromptForType(message, "trueOrFalse");
    expect(result).toEqual(
      `Based on the information "${message}", generate a true or false question (maximum of 100 characters). The answer must not exceed 68 characters. Format as:
Question: [Your question here]
Answer: [True/False]
${timeAndPointsPrompt}`,
    );
  });

  it("should generate prompt for multiselect with default number of choices", () => {
    const result = generatePromptForType(message, "multiselect");
    expect(result).toEqual(
      `Create a multiselect question (maximum of 100 characters) about: "${message}" with 4 choices. The choices must not exceed 68 characters. Multiple answers can be correct. Format as:
Question: [Your question here]
Option 1: [Choice 1]
Option 2: [Choice 2]
Option 3: [Choice 3]
Option 4: [Choice 4]
Correct Answers: Options [Correct option numbers separated by commas, e.g., 1,3]
${timeAndPointsPrompt}`,
    );
  });

  it("should generate default prompt", () => {
    // Use a type not handled
    const result = generatePromptForType(message, "unhandledType" as any);
    expect(result).toEqual(`Please provide information based on: "${message}"`);
  });

  it("should generate prompt for multipleChoice with custom number of choices and max characters", () => {
    const result = generatePromptForType(message, "multipleChoice", 3, 80, 50);
    expect(result).toEqual(
      `Create a multiple choice question (maximum of 80 characters) about: "${message}" with 3 choices. Each choice must not exceed 50 characters. Format as:
Question: [Your question here]
Option 1: [Choice 1]
Option 2: [Choice 2]
Option 3: [Choice 3]
Correct Answer: Option [Correct option number]
${timeAndPointsPrompt}`,
    );
  });

  it("should generate prompt for identification with custom max characters", () => {
    const result = generatePromptForType(message, "identification", 90, 60);
    expect(result).toEqual(
      `Create an identification question (maximum of 90 characters) based on: "${message}". The answer must not exceed 60 characters. Format as:
Question: [Your question here]
Answer: [Your answer here]
${timeAndPointsPrompt}`,
    );
  });
});

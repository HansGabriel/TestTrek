import { describe, it, expect } from "vitest";
import {
  parseMultipleChoiceQuestions,
  generateQuestionPrompt,
  QuestionPromptInput,
} from "../testCreationHandlers";

describe("generateQuestionPrompt", () => {
  it("should generate custom prompt for defined types", () => {
    const input: QuestionPromptInput = {
      content: "exampleContent",
      type: "type1",
      numOfQuestions: 2,
      numOfChoicesPerQuestion: 4,
      maxCharsPerQuestion: 100,
      maxCharsPerChoice: 68,
    };

    const result = generateQuestionPrompt(input);
    const expected = `Generate 2 questions of type "type1" based on the content provided:\n\nPlease provide information based on: "exampleContent"`;

    expect(result).toBe(expected);
  });

  it("should generate default prompt for undefined types", () => {
    const input: QuestionPromptInput = {
      content: "exampleContent",
      type: "undefinedType",
    };

    const result = generateQuestionPrompt(input);
    const expected = `Generate 1 questions of type "undefinedType" based on the content provided:\n\nPlease provide information based on: "exampleContent"`;

    expect(result).toBe(expected);
  });
});

describe("parseMultipleChoiceQuestions", () => {
  it("should parse multiple choice questions correctly", () => {
    const input = `
Question: How many stars are in the Milky Way?
Option 1: 200 billion
Option 2: 500 billion
Option 3: 1 trillion
Option 4: 2 trillion
Correct Answer: Option 2
Time Limit: 10 sec
Points: 100 pt

Question: How many stars are in the Milky Way?
Option 1: 200 billion
Option 2: 500 billion
Option 3: 1 trillion
Option 4: 2 trillion
Correct Answer: Option 2
Time Limit: 10 sec
Points: 100 pt

Question: How many stars are in the Galaxy?
Option 1: A lot
Option 2: Very Many
Option 3: Sometimes
Option 4: Yes
Correct Answer: Option 3
Time Limit: 5 sec
Points: 50 pt
`;

    const result = parseMultipleChoiceQuestions(input);

    expect(result).toHaveLength(3);

    expect(result).toBeDefined();
    expect(result[0]?.question).toBe("How many stars are in the Milky Way?");
    expect(result[0]?.choices).toBeDefined();
    expect(result[0]?.choices[0]?.text).toBe("200 billion");
    expect(result[0]?.choices[0]?.isCorrect).toBeFalsy();
    expect(result[0]?.choices[1]?.text).toBe("500 billion");
    expect(result[0]?.choices[1]?.isCorrect).toBeTruthy();
    expect(result[0]?.timeLimit).toBe(10);
    expect(result[0]?.points).toBe(100);

    expect(result[2]?.question).toBe("How many stars are in the Galaxy?");
    expect(result[2]?.choices).toBeDefined();
    expect(result[2]?.choices[0]?.text).toBe("A lot");
    expect(result[2]?.choices[0]?.isCorrect).toBeFalsy();
    expect(result[2]?.choices[2]?.text).toBe("Sometimes");
    expect(result[2]?.choices[2]?.isCorrect).toBeTruthy();
    expect(result[2]?.timeLimit).toBe(5);
    expect(result[2]?.points).toBe(50);
  });
});

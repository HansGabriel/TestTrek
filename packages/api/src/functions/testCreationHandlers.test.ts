import { describe, it, expect } from "vitest";
import { parseMultipleChoiceQuestions } from "./testCreationHandlers";

describe("parseMultipleChoiceQuestions", () => {
  it("should parse multiple choice questions correctly", () => {
    const input = `
1. Question: How many stars are in the Milky Way?
Option 1: 200 billion
Option 2: 500 billion
Option 3: 1 trillion
Option 4: 2 trillion
Correct Answer: Option 2
Time Limit: 10 sec
Points: 100 pt

1. Question: How many stars are in the Milky Way?
Option 1: 200 billion
Option 2: 500 billion
Option 3: 1 trillion
Option 4: 2 trillion
Correct Answer: Option 2
Time Limit: 10 sec
Points: 100 pt

1. Question: How many stars are in the Galaxy?
Option 1: A lot
Option 2: Very Many
Option 3: Sometimes
Option 4: Yes
Correct Answer: Option 3
Time Limit: 1 sec
Points: 10 pt
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
    expect(result[2]?.timeLimit).toBe(1);
    expect(result[2]?.points).toBe(10);
  });
});

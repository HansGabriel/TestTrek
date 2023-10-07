import {
  parseMultipleChoiceResponse,
  parseEnumerationResponse,
  parseMultiselectResponse,
  parseIdentificationResponse,
  parseTrueOrFalseResponse,
} from "./gptHandlers";
import { describe, it, expect } from "vitest";

describe("parseMultipleChoiceResponse", () => {
  it("should correctly parse a well-formatted multiple choice response", () => {
    const generatedMessage = `
      Question: What is the capital of France?
      Option 1: Berlin
      Option 2: Madrid
      Option 3: Paris
      Option 4: Rome
      Correct Answer: Option 3
    `;
    const result = parseMultipleChoiceResponse(generatedMessage);
    expect(result).toEqual({
      question: "What is the capital of France?",
      choices: [
        { text: "Berlin", isCorrect: false },
        { text: "Madrid", isCorrect: false },
        { text: "Paris", isCorrect: true },
        { text: "Rome", isCorrect: false },
      ],
      type: "multipleChoice",
    });
  });

  it("should handle incorrect formatting gracefully", () => {
    //If the question is missing, the result should still be somewhat sensible
    const generatedMessageWithoutQuestion = `
      Option 1: Berlin
      Option 2: Madrid
      Option 3: Paris
      Option 4: Rome
      Correct Answer: Option 3
    `;
    const resultWithoutQuestion = parseMultipleChoiceResponse(
      generatedMessageWithoutQuestion,
    );
    expect(resultWithoutQuestion).toEqual({
      question: "", // question is missing
      choices: [
        { text: "Berlin", isCorrect: false },
        { text: "Madrid", isCorrect: false },
        { text: "Paris", isCorrect: true },
        { text: "Rome", isCorrect: false },
      ],
      type: "multipleChoice",
    });
  });

  it("should handle missing correct answer option", () => {
    const generatedMessageWithoutCorrectAnswer = `
      Question: What is the capital of France?
      Option 1: Berlin
      Option 2: Madrid
      Option 3: Paris
      Option 4: Rome
    `;
    const result = parseMultipleChoiceResponse(
      generatedMessageWithoutCorrectAnswer,
    );
    expect(result).toEqual({
      question: "What is the capital of France?",
      choices: [
        { text: "Berlin", isCorrect: false },
        { text: "Madrid", isCorrect: false },
        { text: "Paris", isCorrect: false }, // No correct answer mentioned
        { text: "Rome", isCorrect: false },
      ],
      type: "multipleChoice",
    });
  });

  it("should handle out-of-order options", () => {
    const generatedMessageOutOfOrder = `
      Question: What is the capital of France?
      Option 3: Paris
      Option 1: Berlin
      Option 4: Rome
      Option 2: Madrid
      Correct Answer: Option 3
    `;
    const result = parseMultipleChoiceResponse(generatedMessageOutOfOrder);
    expect(result).toEqual({
      question: "What is the capital of France?",
      choices: [
        { text: "Berlin", isCorrect: false },
        { text: "Madrid", isCorrect: false },
        { text: "Paris", isCorrect: true },
        { text: "Rome", isCorrect: false },
      ],
      type: "multipleChoice",
    });
  });

  it("should handle missing option values", () => {
    const generatedMessageMissingOptions = `
      Question: What is the capital of France?
      Option 1: Berlin
      Option 3: Paris
      Correct Answer: Option 3
    `;
    const result = parseMultipleChoiceResponse(generatedMessageMissingOptions);
    expect(result).toEqual({
      question: "What is the capital of France?",
      choices: [
        { text: "Berlin", isCorrect: false },
        undefined,
        { text: "Paris", isCorrect: true },
      ],
      type: "multipleChoice",
    });
  });

  it("should handle completely empty input", () => {
    const resultForEmpty = parseMultipleChoiceResponse("");
    const expectedResult = {
      question: "",
      choices: [],
      type: "multipleChoice",
    };
    expect(resultForEmpty).toEqual(expectedResult);
  });

  it("should handle invalid option format", () => {
    const generatedMessageInvalidOption = `
      Question: What is the capital of France?
      Option 1: Berlin
      Option X: Madrid
      Option 3: Paris
      Correct Answer: Option 3
    `;
    const result = parseMultipleChoiceResponse(generatedMessageInvalidOption);
    expect(result).toEqual({
      question: "What is the capital of France?",
      choices: [
        { text: "Berlin", isCorrect: false },
        undefined,
        { text: "Paris", isCorrect: true },
      ],
      type: "multipleChoice",
    });
  });

  it("should handle invalid correct answer format", () => {
    const generatedMessageInvalidCorrectAnswer = `
      Question: What is the capital of France?
      Option 1: Berlin
      Option 2: Madrid
      Option 3: Paris
      Option 4: Rome
      Correct Answer: Option X
    `;
    const result = parseMultipleChoiceResponse(
      generatedMessageInvalidCorrectAnswer,
    );
    expect(result).toEqual({
      question: "What is the capital of France?",
      choices: [
        { text: "Berlin", isCorrect: false },
        { text: "Madrid", isCorrect: false },
        { text: "Paris", isCorrect: false }, // No valid correct answer mentioned
        { text: "Rome", isCorrect: false },
      ],
      type: "multipleChoice",
    });
  });
});

describe("parseEnumerationResponse", () => {
  it("should correctly parse a well-formatted enumeration response", () => {
    const generatedMessage = `
        Question: List fruits.
        Answers: 1. Apple, 2. Banana, 3. Cherry
      `;
    const result = parseEnumerationResponse(generatedMessage);
    expect(result).toEqual({
      question: "List fruits.",
      answers: ["Apple", "Banana", "Cherry"],
    });
  });

  it("should handle missing question", () => {
    const generatedMessageWithoutQuestion = `
        Answers: 1. Apple, 2. Banana, 3. Cherry
      `;
    const result = parseEnumerationResponse(generatedMessageWithoutQuestion);
    expect(result).toEqual({
      question: "", // question is missing
      answers: ["Apple", "Banana", "Cherry"],
    });
  });

  it("should handle missing answers", () => {
    const generatedMessageWithoutAnswers = `
        Question: List fruits.
      `;
    const result = parseEnumerationResponse(generatedMessageWithoutAnswers);
    expect(result).toEqual({
      question: "List fruits.",
      answers: [], // answers are missing
    });
  });

  it("should handle incorrect answer format", () => {
    const generatedMessageWithIncorrectAnswers = `
        Question: List fruits.
        Answers: Apple, Banana, Cherry
      `;
    const result = parseEnumerationResponse(
      generatedMessageWithIncorrectAnswers,
    );
    expect(result).toEqual({
      question: "List fruits.",
      answers: ["Apple", "Banana", "Cherry"], // even without numbers, it extracts the answers
    });
  });

  it("should handle completely empty input", () => {
    const resultForEmpty = parseEnumerationResponse("");
    const expectedResult = {
      question: "",
      answers: [],
    };
    expect(resultForEmpty).toEqual(expectedResult);
  });
});

describe("parseMultiselectResponse", () => {
  it("should correctly parse a well-formatted multiselect response", () => {
    const generatedMessage = `
        Question: Choose the fruits.
        Option 1: Apple
        Option 2: Car
        Option 3: Banana
        Option 4: Bus
        Correct Answers: Options 1,3
      `;
    const result = parseMultiselectResponse(generatedMessage);
    expect(result).toEqual({
      question: "Choose the fruits.",
      choices: [
        { text: "Apple", isCorrect: true },
        { text: "Car", isCorrect: false },
        { text: "Banana", isCorrect: true },
        { text: "Bus", isCorrect: false },
      ],
      type: "multiselect",
    });
  });

  it("should handle missing question", () => {
    const generatedMessageWithoutQuestion = `
        Option 1: Apple
        Option 2: Car
        Correct Answers: Options 1
      `;
    const result = parseMultiselectResponse(generatedMessageWithoutQuestion);
    expect(result).toEqual({
      question: "",
      choices: [
        { text: "Apple", isCorrect: true },
        { text: "Car", isCorrect: false },
      ],
      type: "multiselect",
    });
  });

  it("should handle missing correct answers", () => {
    const generatedMessageWithoutCorrectAnswers = `
        Question: Choose the fruits.
        Option 1: Apple
        Option 2: Car
      `;
    const result = parseMultiselectResponse(
      generatedMessageWithoutCorrectAnswers,
    );
    expect(result).toEqual({
      question: "Choose the fruits.",
      choices: [
        { text: "Apple", isCorrect: false },
        { text: "Car", isCorrect: false },
      ],
      type: "multiselect",
    });
  });

  it("should handle out-of-order options", () => {
    const generatedMessageOutOfOrder = `
        Question: Choose the fruits.
        Option 3: Banana
        Option 1: Apple
        Option 4: Bus
        Option 2: Car
        Correct Answers: Options 1,3
      `;
    const result = parseMultiselectResponse(generatedMessageOutOfOrder);
    expect(result).toEqual({
      question: "Choose the fruits.",
      choices: [
        { text: "Apple", isCorrect: true },
        { text: "Car", isCorrect: false },
        { text: "Banana", isCorrect: true },
        { text: "Bus", isCorrect: false },
      ],
      type: "multiselect",
    });
  });

  it("should handle completely empty input", () => {
    const resultForEmpty = parseMultiselectResponse("");
    const expectedResult = {
      question: "",
      choices: [],
      type: "multiselect",
    };
    expect(resultForEmpty).toEqual(expectedResult);
  });
});

describe("parseIdentificationResponse", () => {
  it("should correctly parse a well-formatted identification response", () => {
    const generatedMessage = `
        Question: Who was the first president of the United States?
        Answer: George Washington
      `;
    const result = parseIdentificationResponse(generatedMessage);
    expect(result).toEqual({
      question: "Who was the first president of the United States?",
      answer: "George Washington",
      type: "identification",
    });
  });

  it("should handle missing question", () => {
    const generatedMessage = `
        Answer: George Washington
      `;
    const result = parseIdentificationResponse(generatedMessage);
    expect(result).toEqual({
      question: "",
      answer: "George Washington",
      type: "identification",
    });
  });

  it("should handle missing answer", () => {
    const generatedMessage = `
        Question: Who was the first president of the United States?
      `;
    const result = parseIdentificationResponse(generatedMessage);
    expect(result).toEqual({
      question: "Who was the first president of the United States?",
      answer: "",
      type: "identification",
    });
  });

  it("should handle completely empty input", () => {
    const generatedMessage = ``;
    const result = parseIdentificationResponse(generatedMessage);
    expect(result).toEqual({
      question: "",
      answer: "",
      type: "identification",
    });
  });
});

describe("parseTrueOrFalseResponse", () => {
  it("should correctly parse a well-formatted true response", () => {
    const generatedMessage = `
        Question: Is the sky blue?
        Answer: True
      `;
    const result = parseTrueOrFalseResponse(generatedMessage);
    expect(result).toEqual({
      question: "Is the sky blue?",
      answer: true,
      type: "trueOrFalse",
    });
  });

  it("should correctly parse a well-formatted false response", () => {
    const generatedMessage = `
        Question: Do cows fly?
        Answer: False
      `;
    const result = parseTrueOrFalseResponse(generatedMessage);
    expect(result).toEqual({
      question: "Do cows fly?",
      answer: false,
      type: "trueOrFalse",
    });
  });

  it("should handle missing question", () => {
    const generatedMessage = `
        Answer: False
      `;
    const result = parseTrueOrFalseResponse(generatedMessage);
    expect(result).toEqual({
      question: "",
      answer: false,
      type: "trueOrFalse",
    });
  });

  it("should handle missing answer", () => {
    const generatedMessage = `
        Question: Do cows fly?
      `;
    const result = parseTrueOrFalseResponse(generatedMessage);
    expect(result).toEqual({
      question: "Do cows fly?",
      answer: false, // defaults to false
      type: "trueOrFalse",
    });
  });

  it("should handle case-insensitivity in the answer", () => {
    const generatedMessage = `
        Question: Is the sky blue?
        Answer: tRuE
      `;
    const result = parseTrueOrFalseResponse(generatedMessage);
    expect(result).toEqual({
      question: "Is the sky blue?",
      answer: true,
      type: "trueOrFalse",
    });
  });

  it("should handle completely empty input", () => {
    const generatedMessage = ``;
    const result = parseTrueOrFalseResponse(generatedMessage);
    expect(result).toEqual({
      question: "",
      answer: false, // defaults to false
      type: "trueOrFalse",
    });
  });
});

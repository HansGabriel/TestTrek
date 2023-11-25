import {
  parseMultipleChoiceResponse,
  parseMultiselectResponse,
  parseIdentificationResponse,
  parseTrueOrFalseResponse,
} from "../gptHandlers";
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
      Time Limit: 20 sec
      Points: 200 pt
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
      timeLimit: 20,
      points: 200,
    });
  });

  it("should handle incorrect formatting gracefully", () => {
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
      question: "",
      choices: [
        { text: "Berlin", isCorrect: false },
        { text: "Madrid", isCorrect: false },
        { text: "Paris", isCorrect: true },
        { text: "Rome", isCorrect: false },
      ],
      type: "multipleChoice",
      timeLimit: 0,
      points: 0,
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
        { text: "Paris", isCorrect: false },
        { text: "Rome", isCorrect: false },
      ],
      type: "multipleChoice",
      timeLimit: 0,
      points: 0,
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
      timeLimit: 0,
      points: 0,
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
      timeLimit: 0,
      points: 0,
    });
  });

  it("should handle completely empty input", () => {
    const resultForEmpty = parseMultipleChoiceResponse("");
    const expectedResult = {
      question: "",
      choices: [],
      type: "multipleChoice",
      timeLimit: 0,
      points: 0,
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
      timeLimit: 0,
      points: 0,
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
        { text: "Paris", isCorrect: false },
        { text: "Rome", isCorrect: false },
      ],
      type: "multipleChoice",
      timeLimit: 0,
      points: 0,
    });
  });

  it("should handle missing time limit and points", () => {
    const generatedMessageWithoutTimeAndPoints = `
      Question: What is the capital of France?
      Option 1: Berlin
      Option 2: Madrid
      Option 3: Paris
      Option 4: Rome
      Correct Answer: Option 3
    `;
    const result = parseMultipleChoiceResponse(
      generatedMessageWithoutTimeAndPoints,
    );
    expect(result).toEqual({
      question: "What is the capital of France?",
      choices: [
        { text: "Berlin", isCorrect: false },
        { text: "Madrid", isCorrect: false },
        { text: "Paris", isCorrect: true },
        { text: "Rome", isCorrect: false },
      ],
      type: "multipleChoice",
      timeLimit: 0, // Default when missing
      points: 0, // Default when missing
    });
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
        Time Limit: 30
        Points: 100
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
      timeLimit: 30,
      points: 100,
      type: "multiselect",
    });
  });

  it("should handle missing question", () => {
    const generatedMessageWithoutQuestion = `
        Option 1: Apple
        Option 2: Car
        Correct Answers: Options 1
        Time Limit: 45
        Points: 50
      `;
    const result = parseMultiselectResponse(generatedMessageWithoutQuestion);
    expect(result).toEqual({
      question: "",
      choices: [
        { text: "Apple", isCorrect: true },
        { text: "Car", isCorrect: false },
      ],
      timeLimit: 45,
      points: 50,
      type: "multiselect",
    });
  });

  it("should handle missing time and points", () => {
    const generatedMessageWithoutTimePoints = `
        Question: Choose the fruits.
        Option 1: Apple
        Option 2: Car
        Correct Answers: Options 1
      `;
    const result = parseMultiselectResponse(generatedMessageWithoutTimePoints);
    expect(result).toEqual({
      question: "Choose the fruits.",
      choices: [
        { text: "Apple", isCorrect: true },
        { text: "Car", isCorrect: false },
      ],
      timeLimit: 0,
      points: 0,
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
        Time Limit: 60
        Points: 150
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
      timeLimit: 60,
      points: 150,
      type: "multiselect",
    });
  });

  it("should handle completely empty input", () => {
    const resultForEmpty = parseMultiselectResponse("");
    const expectedResult = {
      question: "",
      choices: [],
      timeLimit: 0,
      points: 0,
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
        Time Limit: 10
        Points: 100
      `;
    const result = parseIdentificationResponse(generatedMessage);
    expect(result).toEqual({
      question: "Who was the first president of the United States?",
      answer: "George Washington",
      timeLimit: 10,
      points: 100,
      type: "identification",
    });
  });

  it("should handle missing question", () => {
    const generatedMessage = `
        Answer: George Washington
        Time Limit: 20
        Points: 200
      `;
    const result = parseIdentificationResponse(generatedMessage);
    expect(result).toEqual({
      question: "",
      answer: "George Washington",
      timeLimit: 20,
      points: 200,
      type: "identification",
    });
  });

  it("should handle missing answer", () => {
    const generatedMessage = `
        Question: Who was the first president of the United States?
        Time Limit: 30
        Points: 300
      `;
    const result = parseIdentificationResponse(generatedMessage);
    expect(result).toEqual({
      question: "Who was the first president of the United States?",
      answer: "",
      timeLimit: 30,
      points: 300,
      type: "identification",
    });
  });

  it("should handle completely empty input", () => {
    const generatedMessage = ``;
    const result = parseIdentificationResponse(generatedMessage);
    expect(result).toEqual({
      question: "",
      answer: "",
      timeLimit: 0,
      points: 0,
      type: "identification",
    });
  });
});

describe("parseTrueOrFalseResponse", () => {
  it("should correctly parse a well-formatted true response with time and points", () => {
    const generatedMessage = `
        Question: Is the sky blue?
        Answer: True
        Time Limit: 30 seconds
        Points: 5
      `;
    const result = parseTrueOrFalseResponse(generatedMessage);
    expect(result).toEqual({
      question: "Is the sky blue?",
      answer: true,
      timeLimit: 30,
      points: 5,
      type: "trueOrFalse",
    });
  });

  it("should correctly parse a well-formatted false response with time and points", () => {
    const generatedMessage = `
        Question: Do cows fly?
        Answer: False
        Time Limit: 45 seconds
        Points: 10
      `;
    const result = parseTrueOrFalseResponse(generatedMessage);
    expect(result).toEqual({
      question: "Do cows fly?",
      answer: false,
      timeLimit: 45,
      points: 10,
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
      timeLimit: 0,
      points: 0,
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
      timeLimit: 0,
      points: 0,
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
      timeLimit: 0,
      points: 0,
      type: "trueOrFalse",
    });
  });

  it("should handle completely empty input", () => {
    const generatedMessage = ``;
    const result = parseTrueOrFalseResponse(generatedMessage);
    expect(result).toEqual({
      question: "",
      answer: false, // defaults to false
      timeLimit: 0,
      points: 0,
      type: "trueOrFalse",
    });
  });

  it("should parse a true response without time and points", () => {
    const generatedMessage = `
        Question: Is the sun hot?
        Answer: True
      `;
    const result = parseTrueOrFalseResponse(generatedMessage);
    expect(result).toEqual({
      question: "Is the sun hot?",
      answer: true,
      timeLimit: 0,
      points: 0,
      type: "trueOrFalse",
    });
  });
});

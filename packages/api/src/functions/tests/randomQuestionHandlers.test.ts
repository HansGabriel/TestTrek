import { describe, it, expect } from "vitest";
import {
  questionFormatGenerators,
  generateCombinedQuestionPrompts,
  processGeneratedQuestions,
} from "../randomQuestionsHandlers";

import { generateChoicesPrompt, timeAndPointsPrompt } from "../gptHandlers";

describe("questionFormatGenerators", () => {
  it("It should generate format for multiple choice question/s", () => {
    const mcqFormat = questionFormatGenerators["multipleChoice"];
    const output = `separator\nQuestion: [Your question here, max 100 characters, and each choice below must not exceed 68 characters]
  ${generateChoicesPrompt(
    4,
  )}\nCorrect Answer: Option [Correct option number and only 1 correct answer] ${timeAndPointsPrompt}`;

    expect(mcqFormat()).toEqual(output);
  });

  it("It should generate format for multiselect question/s", () => {
    const multiselectFormat = questionFormatGenerators["multiselect"];

    const output = `separator\nQuestion: [Your question here, max 100 characters, and each choice below must not exceed 68 characters]
  ${generateChoicesPrompt(
    4,
  )}\nAll Correct Answers: Options [Correct option numbers separated by commas (e.g., 1,3) and at least one correct answer] ${timeAndPointsPrompt}`;

    expect(multiselectFormat()).toEqual(output);
  });

  it("It should generate format for identification question/s", () => {
    const identicationFormat = questionFormatGenerators["identification"];

    const output = `separator\nQuestion: [Your question here, max 100 characters]\nAnswer: [Your answer here, max 68 characters] ${timeAndPointsPrompt}`;

    expect(identicationFormat()).toEqual(output);
  });

  it("It should generate format for true or false question/s", () => {
    const tofFormat = questionFormatGenerators["trueOrFalse"];

    const output = `separator\nQuestion: [Your question here, max 100 characters]\nAnswer: [True/False] ${timeAndPointsPrompt}`;

    expect(tofFormat()).toEqual(output);
  });
});

describe("generateCombinedQuestionPrompts", () => {
  it("should generate correct prompt for a single question", () => {
    const combinedPrompts = generateCombinedQuestionPrompts(
      1,
      "Sample message",
    );
    expect(combinedPrompts).toContain("Sample message");
    expect(combinedPrompts).toContain("separator");
  });
});

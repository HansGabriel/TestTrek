import { MultipleChoicePrompt, timeAndPointsPrompt } from "./gptHandlers";

type QuestionType =
  | "multipleChoice"
  | "identification"
  | "trueOrFalse"
  | "multiselect"
  | "enumeration";

interface QuestionPromptInput {
  content: string;
  type: QuestionType;
  numOfQuestions: number;
  numOfChoicesPerQuestion?: number;
  maxCharsPerQuestion?: number;
  maxCharsPerChoice?: number;
}

export const generateQuestionPrompt = ({
  content,
  type,
  numOfQuestions,
  numOfChoicesPerQuestion = 4,
  maxCharsPerQuestion = 100,
  maxCharsPerChoice = 68,
}: QuestionPromptInput): string => {
  let basePrompt = "";

  switch (type) {
    case "multipleChoice":
    case "multiselect":
      const optionsPrompt = Array.from(
        { length: numOfChoicesPerQuestion },
        (_, i) => `Option ${i + 1}: [Choice ${i + 1}]`,
      ).join("\n");
      const correctAnswerPrompt =
        type === "multipleChoice"
          ? `Correct Answer: Option [Correct option number]\n`
          : `Correct Answers: Options [Correct option numbers separated by commas, e.g., 1,3]\n`;
      basePrompt = `Create a ${type} question (maximum of ${maxCharsPerQuestion} characters) about "${content}". Each choice must not exceed ${maxCharsPerChoice} characters. Format as:\nQuestion: [Your question here]\n${optionsPrompt}\n${correctAnswerPrompt}${timeAndPointsPrompt}`;
      break;
    case "identification":
      basePrompt = `Create an identification question (max ${maxCharsPerQuestion} chars) based on "${content}". Format as:\nQuestion: [Your question here]\nAnswer: [Your answer here]\n${timeAndPointsPrompt}`;
      break;
    case "trueOrFalse":
      basePrompt = `Based on the information "${content}", generate a true or false question (max ${maxCharsPerQuestion} chars). Format as:\nQuestion: [Your question here]\nAnswer: [True/False]\n${timeAndPointsPrompt}`;
      break;
    case "enumeration":
      const enumerationPrompt = `Answers: [${Array.from(
        { length: numOfChoicesPerQuestion },
        (_, i) => `${i + 1}. Answer${i + 1}`,
      ).join(", ")}]`;
      basePrompt = `Provide an enumeration question (maximum of ${maxCharsPerQuestion} characters) related to "${content}" with a maximum of ${numOfChoicesPerQuestion} inputs. Each answer must not exceed ${maxCharsPerChoice} characters. Format as:\nQuestion: [Your question here]\n${enumerationPrompt}\n${timeAndPointsPrompt}`;
      break;
    default:
      throw new Error("Invalid question type provided.");
  }

  const fullPromptArray = Array(numOfQuestions).fill(basePrompt);
  const numberedPrompt = fullPromptArray
    .map((prompt, index) => `${index + 1}. ${prompt}`)
    .join("\n\n");

  return `Generate ${numOfQuestions} questions of type "${type}" based on the content provided:\n\n${numberedPrompt}`;
};

const parseSegmentMultipleChoice = (segment: string): MultipleChoicePrompt => {
  const extractFromPattern = (pattern: RegExp, defaultVal = ""): string => {
    const match = segment.match(pattern);
    return match && match[1] ? match[1].trim() : defaultVal;
  };

  const question = extractFromPattern(/^\d+\.\s*Question: (.+)/);

  const timeLimit = parseInt(extractFromPattern(/Time Limit: (\d+) sec/), 10);
  const points = parseInt(extractFromPattern(/Points: (\d+) pt/), 10);

  const extractAllMatches = (pattern: RegExp): RegExpMatchArray[] => {
    const matches: RegExpMatchArray[] = [];
    let match;
    while ((match = pattern.exec(segment))) {
      if (match) {
        matches.push(match);
      }
    }
    return matches;
  };

  const choiceMatches = extractAllMatches(/Option (\d): (.+)/g);
  const choices: { text: string; isCorrect: boolean }[] = choiceMatches.map(
    (match) => {
      const text = match[2]?.trim() ?? "";
      return { text, isCorrect: false };
    },
  );

  const correctOptionMatch = segment.match(/Correct Answer: Option (\d+)/);
  const correctOption =
    correctOptionMatch && correctOptionMatch[1]
      ? parseInt(correctOptionMatch[1], 10) - 1
      : -1;

  if (correctOption >= 0 && correctOption < choices.length) {
    const correctChoice = choices[correctOption];
    if (correctChoice) {
      correctChoice.isCorrect = true;
    }
  }

  return {
    question,
    choices,
    type: "multipleChoice",
    timeLimit,
    points,
  };
};

export const parseMultipleChoiceQuestions = (
  generatedMessage: string,
): MultipleChoicePrompt[] => {
  return generatedMessage
    .split(/(?=\d+\.\s*Question:)/)
    .filter((segment) => segment.trim().length > 0)
    .map(parseSegmentMultipleChoice);
};

//Handle other question types soon

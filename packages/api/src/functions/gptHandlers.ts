import { TIME_LIMIT_OPTIONS, POINT_OPTIONS } from "./constants";

export interface MCQPrompt {
  question: string;
  choices: { text: string; isCorrect: boolean }[];
  type: "multipleChoice";
  timeLimit: number;
  points: number;
}

export interface MultiselectPrompt {
  question: string;
  choices: { text: string; isCorrect: boolean }[];
  type: "multiselect";
  timeLimit: number;
  points: number;
}

export interface IdentificationPrompt {
  question: string;
  answer: string;
  type: "identification";
}

export interface TrueOrFalsePrompt {
  question: string;
  answer: boolean;
  type: "trueOrFalse";
}

export const timeAndPointsPrompt = `
Time Limit: [Select from the following options based on how difficult you think the question is, lower value means easy while higher value means harder, choose between ${TIME_LIMIT_OPTIONS.map(
  (time) => time.title,
).join(", ")}]
Points: [Select from the following options based on how difficult you think the question is, lower value means easy while higher value means harder, choose between ${POINT_OPTIONS.map(
  (points) => points.title,
).join(", ")}]`;

const promptGenerators: { [key: string]: (message: string) => string } = {
  multipleChoice: (message) =>
    `Create a multiple choice question about: "${message}" with 4 choices. Each choice must not exceed 68 characters. Format as:
Question: [Your question here]
Option 1: [Choice 1]
Option 2: [Choice 2]
Option 3: [Choice 3]
Option 4: [Choice 4]
Correct Answer: Option [Correct option number]
${timeAndPointsPrompt}`,

  identification: (message) =>
    `Create an identification question based on: "${message}". The answer must not exceed 68 characters. Format as:
Question: [Your question here]
Answer: [Your answer here]
${timeAndPointsPrompt}`,

  trueOrFalse: (message) =>
    `Based on the information "${message}", generate a true or false question. The answer must not exceed 68 characters. Format as:
Question: [Your question here]
Answer: [True/False]
${timeAndPointsPrompt}`,

  multiselect: (message) =>
    `Create a multiselect question about: "${message}" with 4 choices. The choices must not exceed 68 characters. Multiple answers can be correct. Format as:
Question: [Your question here]
Option 1: [Choice 1]
Option 2: [Choice 2]
Option 3: [Choice 3]
Option 4: [Choice 4]
Correct Answers: Options [Correct option numbers separated by commas, e.g., 1,3]
${timeAndPointsPrompt}`,

  enumeration: (message) =>
    `Provide an enumeration question related to "${message}" with a maximum of 4 inputs. The choices or answer must not exceed 68 characters. Format as:
Question: [Your question here]
Answers: [1. Answer1, 2. Answer2, ...]
${timeAndPointsPrompt}`,
};

export const generatePromptForType = (
  message: string,
  questionType: keyof typeof promptGenerators,
): string => {
  const promptGenerator = promptGenerators[questionType];
  return promptGenerator
    ? promptGenerator(message)
    : `Please provide information based on: "${message}"`;
};

export const parseMultipleChoiceResponse = (
  generatedMessage: string,
): MCQPrompt => {
  const lines = generatedMessage.split("\n").map((line) => line.trim());

  let question = "";
  const choices: { text: string; isCorrect: boolean }[] = [];
  let timeLimit = 0;
  let points = 0;

  lines.forEach((line) => {
    if (line.startsWith("Question:")) {
      const q = line.replace("Question:", "").trim();
      if (q) question = q;
    } else if (line.startsWith("Option")) {
      const optionMatch = line.match(/^Option (\d): (.+)$/);
      if (optionMatch) {
        const [, index, text] = optionMatch;
        const optionText = text?.trim();
        const optionIndex = index ? parseInt(index, 10) - 1 : -1;
        if (optionText && optionIndex >= 0) {
          choices[optionIndex] = {
            text: optionText,
            isCorrect: false,
          };
        }
      }
    } else if (line.startsWith("Correct Answer: Option")) {
      const correctIndexMatch = line.match(/\d$/);
      if (correctIndexMatch && correctIndexMatch[0]) {
        const correctIndex = parseInt(correctIndexMatch[0], 10) - 1;
        const choice = choices[correctIndex];
        if (choice) choice.isCorrect = true;
      }
    } else if (line.startsWith("Time Limit:")) {
      const time = line.replace("Time Limit:", "").trim();
      const matchedOption = TIME_LIMIT_OPTIONS.find((o) => o.title === time);
      if (matchedOption) {
        timeLimit = matchedOption.value;
      }
    } else if (line.startsWith("Points:")) {
      const point = line.replace("Points:", "").trim();
      const matchedOption = POINT_OPTIONS.find((o) => o.title === point);
      if (matchedOption) {
        points = matchedOption.value;
      }
    }
  });

  return {
    question,
    choices,
    type: "multipleChoice",
    timeLimit,
    points,
  };
};

export const parseEnumerationResponse = (generatedMessage: string) => {
  const lines = generatedMessage.split("\n").map((line) => line.trim());

  let question = "";
  let timeLimit = 0;
  let points = 0;
  const answers: string[] = [];

  lines.forEach((line) => {
    if (line.startsWith("Question:")) {
      question = line.replace("Question:", "").trim();
    } else if (line.startsWith("Answers:")) {
      const ans = line
        .replace("Answers:", "")
        .split(",")
        .map((a) => a.trim().replace(/^\d+\.\s*/, ""));
      answers.push(...ans);
    } else if (line.startsWith("Time Limit:")) {
      const timeMatch = line.match(/\d+/);
      if (timeMatch && timeMatch[0]) {
        timeLimit = parseInt(timeMatch[0], 10);
      }
    } else if (line.startsWith("Points:")) {
      const pointsMatch = line.match(/\d+/);
      if (pointsMatch && pointsMatch[0]) {
        points = parseInt(pointsMatch[0], 10);
      }
    }
  });

  return { question, answers, timeLimit, points };
};

export const parseMultiselectResponse = (
  generatedMessage: string,
): MultiselectPrompt => {
  const lines = generatedMessage.split("\n").map((line) => line.trim());

  let question = "";
  let timeLimit = 0;
  let points = 0;
  const choices: { text: string; isCorrect: boolean }[] = [];

  lines.forEach((line) => {
    if (line.startsWith("Question:")) {
      question = line.replace("Question:", "").trim();
    } else if (line.startsWith("Option")) {
      const optionMatch = line.match(/^Option (\d): (.+)$/);
      if (optionMatch) {
        const [, index, text] = optionMatch;
        const optionText = text?.trim();
        const optionIndex = index ? parseInt(index, 10) - 1 : -1;
        if (optionText && optionIndex >= 0) {
          choices[optionIndex] = {
            text: optionText,
            isCorrect: false,
          };
        }
      }
    } else if (line.startsWith("Correct Answers: Options")) {
      const correctIndicesMatch = line.match(/\d+/g);
      if (correctIndicesMatch) {
        correctIndicesMatch.forEach((indexMatch) => {
          const correctIndex = parseInt(indexMatch, 10) - 1;
          const choice = choices[correctIndex];
          if (choice) choice.isCorrect = true;
        });
      }
    } else if (line.startsWith("Time Limit:")) {
      const timeMatch = line.match(/\d+/);
      if (timeMatch && timeMatch[0]) {
        timeLimit = parseInt(timeMatch[0], 10);
      }
    } else if (line.startsWith("Points:")) {
      const pointsMatch = line.match(/\d+/);
      if (pointsMatch && pointsMatch[0]) {
        points = parseInt(pointsMatch[0], 10);
      }
    }
  });

  return {
    question,
    choices,
    timeLimit,
    points,
    type: "multiselect",
  };
};

export const parseIdentificationResponse = (
  generatedMessage: string,
): IdentificationPrompt => {
  const lines = generatedMessage.split("\n").map((line) => line.trim());

  let question = "";
  let answer = "";

  lines.forEach((line) => {
    if (line.startsWith("Question:")) {
      const q = line.replace("Question:", "").trim();
      if (q) question = q;
    } else if (line.startsWith("Answer:")) {
      const a = line.replace("Answer:", "").trim();
      if (a) answer = a;
    }
  });

  return { question, answer, type: "identification" };
};

export const parseTrueOrFalseResponse = (
  generatedMessage: string,
): TrueOrFalsePrompt => {
  const lines = generatedMessage.split("\n").map((line) => line.trim());

  let question = "";
  let answer = false;

  lines.forEach((line) => {
    if (line.startsWith("Question:")) {
      const q = line.replace("Question:", "").trim();
      if (q) question = q;
    } else if (line.startsWith("Answer:")) {
      const a = line.replace("Answer:", "").trim().toLowerCase();
      answer = a === "true";
    }
  });

  return { question, answer, type: "trueOrFalse" };
};

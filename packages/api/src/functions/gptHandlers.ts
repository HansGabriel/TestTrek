export interface MCQPrompt {
  question: string;
  choices: { text: string; isCorrect: boolean }[];
  type: "multipleChoice";
}

export interface MultiselectPrompt {
  question: string;
  choices: { text: string; isCorrect: boolean }[];
  type: "multiselect";
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

const promptGenerators: { [key: string]: (message: string) => string } = {
  multipleChoice: (message) =>
    `Create a multiple choice question about: "${message}" with 4 choices. Each choices must not exceed 68 characters. Format as:\nQuestion: [Your question here]\nOption 1: [Choice 1]\nOption 2: [Choice 2]\nOption 3: [Choice 3]\nOption 4: [Choice 4]\nCorrect Answer: Option [Correct option number]`,

  identification: (message) =>
    `Create an identification question based on: "${message}". The answer must not exceed 68 characters. Format as: Question: [Your question here]\nAnswer: [Your answer here]`,

  trueOrFalse: (message) =>
    `Based on the information "${message}", generate a true or false question. The answer must not exceed 68 characters. Format as: Question: [Your question here]\nAnswer: [True/False]`,

  multiselect: (message) =>
    `Create a multiselect question about: "${message}" with 4 choices. The choices must not exceed 68 characters. Multiple answers can be correct. Format as:\nQuestion: [Your question here]\nOption 1: [Choice 1]\nOption 2: [Choice 2]\nOption 3: [Choice 3]\nOption 4: [Choice 4]\nCorrect Answers: Options [Correct option numbers separated by commas, e.g., 1,3]`,

  enumeration: (message) =>
    `Provide an enumeration question related to "${message}" with a maximum of 4 inputs. The choices or answer must not exceed 68 characters. Format as: Question: [Your question here]\nAnswers: [1. Answer1, 2. Answer2, ...]`,
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
    }
  });

  return {
    question,
    choices,
    type: "multipleChoice",
  };
};

export const parseEnumerationResponse = (generatedMessage: string) => {
  const lines = generatedMessage.split("\n").map((line) => line.trim());

  let question = "";
  const answers: string[] = [];

  lines.forEach((line) => {
    if (line.startsWith("Question:")) {
      const q = line.replace("Question:", "").trim();
      if (q) question = q;
    } else if (line.startsWith("Answers:")) {
      const ans = line
        .replace("Answers:", "")
        .split(",")
        .map((a) => a.trim().replace(/^\d+\.\s*/, ""));
      answers.push(...ans);
    }
  });

  return { question, answers };
};

export const parseMultiselectResponse = (
  generatedMessage: string,
): MultiselectPrompt => {
  const lines = generatedMessage.split("\n").map((line) => line.trim());

  let question = "";
  const choices: { text: string; isCorrect: boolean }[] = [];

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
    } else if (line.startsWith("Correct Answers: Options")) {
      const correctIndicesMatch = line.match(/\d+/g);
      if (correctIndicesMatch) {
        correctIndicesMatch.forEach((indexMatch) => {
          const correctIndex = parseInt(indexMatch, 10) - 1;
          const choice = choices[correctIndex];
          if (choice) choice.isCorrect = true;
        });
      }
    }
  });

  return {
    question,
    choices,
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

export interface MCQPrompt {
  question: string;
  choices: { text: string; isCorrect: boolean }[];
}

export interface MultiselectPrompt {
  question: string;
  options: string[];
  correctAnswers: number[];
}

export interface IdentificationPrompt {
  question: string;
  answer: string;
}

export interface TrueOrFalsePrompt {
  question: string;
  answer: boolean;
}

export const generatePromptForType = (
  message: string,
  questionType: string,
): string => {
  switch (questionType) {
    case "multipleChoice":
      return `Create a multiple choice question about: "${message}" with 4 choices. Format as:\nQuestion: [Your question here]\nOption 1: [Choice 1]\nOption 2: [Choice 2]\nOption 3: [Choice 3]\nOption 4: [Choice 4]\nCorrect Answer: Option [Correct option number]`;
    case "identification":
      return `Create an identification question based on: "${message}". Format as: Question: [Your question here]\nAnswer: [Your answer here]`;
    case "trueOrFalse":
      return `Based on the information "${message}", generate a true or false question. Format as: Question: [Your question here]\nAnswer: [True/False]`;

    case "enumeration":
      return `Provide an enumeration question related to "${message}" with a maximum of 4 inputs. Format as: Question: [Your question here]\nAnswers: [1. Answer1, 2. Answer2, ...]`;

    case "multiselect":
      return `Provide a multiselect question based on "${message}" with 4 options. Format as: Question: [Your question here]\nOptions: [Option1, Option2, ...]\nCorrect Answers: [Option numbers of correct answers, e.g., 1,3, ...]`;

    default:
      return `Please provide information based on: "${message}"`;
  }
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
  const options: string[] = [];
  const correctAnswers: number[] = [];

  lines.forEach((line) => {
    if (line.startsWith("Question:")) {
      const q = line.replace("Question:", "").trim();
      if (q) question = q;
    } else if (line.startsWith("Options:")) {
      const opt = line
        .replace("Options:", "")
        .split(",")
        .map((o) => o.trim().replace(/^\d+\.\s*/, "")); // <-- this line ensures the option numbers are removed
      options.push(...opt);
    } else if (line.startsWith("Correct Answers:")) {
      const ans = line
        .replace("Correct Answers:", "")
        .split(",")
        .map((a) => parseInt(a.trim()));
      correctAnswers.push(...ans);
    }
  });

  return { question, options, correctAnswers };
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

  return { question, answer };
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

  return { question, answer };
};

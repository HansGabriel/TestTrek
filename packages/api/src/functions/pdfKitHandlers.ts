import PDFDocument from "pdfkit";
import { Question, CustomTest, Choice } from "./types/pdfKit";

export const formatChoice = (choices: Choice[]): string => {
  return choices
    .map((choice, index) => {
      const choiceLetter = String.fromCharCode(65 + index);
      return `${choiceLetter}) ${choice.text}`;
    })
    .join("\n");
};

export const formatQuestion = (
  question: Question,
  itemNumber: number,
): string => {
  switch (question.type) {
    case "multiple_choice":
    case "multi_select":
      return `${itemNumber}. ${question.title}\n\n${formatChoice(
        question.choices,
      )}\n`;
    case "true_or_false":
    case "identification":
      return `__________ ${itemNumber}. ${question.title}\n\n`;
    default:
      return "";
  }
};

export const formatTestData = (testData: CustomTest): string => {
  return testData.questions
    .map((question, index) => formatQuestion(question, index + 1))
    .join("\n\n");
};

export const getCorrectAnswers = (question: Question): string[] => {
  return question.choices
    .filter((choice) => choice.isCorrect)
    .map((choice) => choice.text);
};

export const generatePdf = async (test: CustomTest): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40 });
    const buffers: Buffer[] = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
    doc.on("error", reject);

    doc
      .fontSize(15)
      .font("Helvetica-Bold")
      .text(test.title, { align: "center" })
      .moveDown();

    doc
      .fontSize(12)
      .font("Helvetica")
      .text(test.description, { align: "center" })
      .moveDown(2);

    const formattedData = formatTestData(test);
    doc.font("Courier").fontSize(9).text(formattedData, {
      align: "left",
    });

    doc.addPage();

    doc
      .fontSize(15)
      .font("Helvetica-Bold")
      .text("Answer Sheet", { align: "center" })
      .moveDown();

    let answersText = ``;

    test.questions.forEach((question, index) => {
      const correctAnswers = getCorrectAnswers(question);
      if (correctAnswers) {
        answersText += `${index + 1}. ${correctAnswers.join(", ")}\n\n`;
      }
    });

    doc
      .fontSize(12)
      .font("Helvetica")
      .text(answersText, { align: "left", columns: 3 });

    doc.end();
  });
};

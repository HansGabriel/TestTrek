import PDFDocument from "pdfkit";
import { Question, CustomTest, Choice } from "./types/pdfKit";

export const formatChoice = (choices: Choice[]): string => {
  return choices
    .map((choice, index) => {
      return `${String.fromCharCode(65 + index)}. ${choice.text}`;
    })
    .join("    ");
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
      )}`;
    case "true_or_false":
    case "identification":
      return `_______________ ${itemNumber}. ${question.title}`;
    default:
      return "";
  }
};

export const formatTestData = (testData: CustomTest): string => {
  return testData.questions
    .map((question, index) => formatQuestion(question, index + 1))
    .join("\n\n");
};

export const generatePdf = async (test: CustomTest): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
    doc.on("error", reject);

    doc.fontSize(16).text(test.title, { underline: true }).moveDown();
    doc.fontSize(12).text(test.description).moveDown(2);

    const formattedData = formatTestData(test);
    doc.text(formattedData, { indent: 20, align: "left" });

    doc.end();
  });
};

import fs from "fs";
import pdfParser from "pdf-parse";

export const readPDFFile = async (file: string) => {
  const pdfFile = fs.readFileSync(file);
  const extractText = await pdfParser(pdfFile);

  return extractText;
};

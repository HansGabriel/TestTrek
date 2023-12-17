/* eslint-disable @typescript-eslint/no-explicit-any */
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { PDFDocument } from "pdf-lib";

const apiKey = process.env.OCR_API;
const apiEndpoint = "https://api.ocr.space/parse/image";

const splitPDF = async (base64: string) => {
  const pdfBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();
  const chunks = [];

  for (let i = 0; i < pages.length; i += 3) {
    chunks.push(pages.slice(i, i + 3));
  }

  const base64Array = [];
  for (const chunk of chunks) {
    const newPdfDoc = await PDFDocument.create();
    const chunkIndices = chunk.map((page) => pdfDoc.getPages().indexOf(page));
    const copiedPages = await newPdfDoc.copyPages(pdfDoc, chunkIndices);
    for (const copiedPage of copiedPages) {
      newPdfDoc.addPage(copiedPage);
    }
    const newPdfBytes = await newPdfDoc.save();
    const newPdfBase64 = Buffer.from(newPdfBytes).toString("base64");
    base64Array.push(`data:application/pdf;base64,${newPdfBase64}`);
  }

  return base64Array;
};

const createFormData = (file: string, fileType: string) => {
  const formData = new FormData();
  formData.append("base64image", file);
  formData.append("filetype", fileType);
  formData.append("scale", "true");
  formData.append("isTable", "true");
  formData.append("OCREngine", "2");
  if (apiKey) {
    formData.append("apikey", apiKey);
  }
  return formData;
};

const fetchOCR = async (formData: FormData) => {
  const response = await fetch(apiEndpoint, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.IsErroredOnProcessing) {
    throw new Error("Data error on processing");
  }

  if (!response.ok) {
    throw new Error("OCR request failed");
  }
  return data;
};

const processOcrResult = (data: any) => {
  let combinedText = "";
  if (data.ParsedResults.length > 1) {
    data.ParsedResults.forEach((item: any) => {
      combinedText += item.ParsedText + "\n";
    });
  } else {
    combinedText = data.ParsedResults?.[0]?.ParsedText;
  }

  return combinedText;
};

export const textExtractionRouter = router({
  extractText: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/text-extraction",
      },
    })
    .input(
      z.object({
        file: z.string(),
        fileType: z.string(),
      }),
    )
    .output(z.any())
    .mutation(async ({ input }) => {
      const { file, fileType } = input;
      let ocrResult = "";

      if (fileType === "image/*") {
        const imageFormat = `data:image/jpg;base64,${file}`;
        const imageFormData = createFormData(imageFormat, "JPG");
        const imageData = await fetchOCR(imageFormData);
        ocrResult += " " + processOcrResult(imageData);
      } else {
        const pdfDocuments = await splitPDF(file);

        for (let i = 0; i < pdfDocuments.length; i++) {
          if (pdfDocuments[i]) {
            const pdfFormData = createFormData(pdfDocuments[i] ?? "", fileType);
            const pdfData = await fetchOCR(pdfFormData);
            ocrResult += " " + processOcrResult(pdfData);
          }
        }
      }

      return ocrResult;
    }),
});

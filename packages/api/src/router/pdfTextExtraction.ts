/* eslint-disable @typescript-eslint/no-explicit-any */
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

type OCRResult = {
  text: string;
};

export const textExtractionRouter = router({
  extractText: protectedProcedure
    .input(
      z.object({
        file: z.string(),
        fileType: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { file, fileType } = input;

      const apiKey = process.env.OCR_API;
      const apiEndpoint = "https://api.ocr.space/parse/image";

      const formData = new FormData();
      formData.append("base64image", file);
      formData.append("filetype", fileType);
      formData.append("OCREngine", "2");
      formData.append("detectOrientation", "true");
      formData.append("scale", "true");
      if (apiKey) {
        formData.append("apikey", apiKey);
      }

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("OCR request failed");
      }

      const data = await response.json();
      if (data.IsErroredOnProcessing) {
        throw new Error("OCR request failed");
      }
      let combinedText = "";
      if (data.ParsedResults.length > 1) {
        data.ParsedResults.forEach((item: any) => {
          combinedText += item.ParsedText + "\n";
        });
      } else {
        combinedText = data.ParsedResults?.[0]?.ParsedText;
      }

      const ocrResult: OCRResult = {
        text: combinedText,
      };

      return ocrResult;
    }),
});

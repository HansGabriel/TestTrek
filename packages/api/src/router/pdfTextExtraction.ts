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
      }),
    )
    .mutation(async ({ input }) => {
      const { file } = input;

      const apiKey = process.env.OCR_API;
      const apiEndpoint = "https://api.ocr.space/parse/image";

      const formData = new FormData();
      formData.append("file", file);
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
      const ocrResult: OCRResult = {
        text: data.ParsedResults?.[0]?.ParsedText || "",
      };

      return ocrResult;
    }),
});

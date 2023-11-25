import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { readPDFFile } from "../services/pdfTextExtractor";

export const textExtractionRouter = router({
  extractText: protectedProcedure
    .input(
      z.object({
        file: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { file } = input;

      const content = await readPDFFile(file);

      return content;
    }),
});

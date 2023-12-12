import { z } from "zod";
import { premiumProcedure, router } from "../trpc";
import { generatePdf } from "../functions/pdfKitHandlers";

export const pdfKitRouter = router({
  generatePdfByTestId: premiumProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const testData = await ctx.prisma.test.findUnique({
        where: {
          id: input,
        },
        select: {
          id: true,
          title: true,
          description: true,
          imageUrl: true,
          keywords: {
            select: {
              id: true,
              name: true,
            },
          },
          createdAt: true,
          updatedAt: true,
          questions: {
            select: {
              choices: {
                select: {
                  id: true,
                  isCorrect: true,
                  text: true,
                },
              },
              id: true,
              image: true,
              points: true,
              time: true,
              title: true,
              type: true,
            },
          },
        },
      });

      try {
        if (!testData) {
          throw new Error("Test data not found");
        }
        const pdfBuffer = await generatePdf(testData);

        return { pdfBuffer: pdfBuffer.toString("base64") };
      } catch (error) {
        throw new Error("PDF generation failed");
      }
    }),
});

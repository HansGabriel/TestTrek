import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const playRouter = router({
  getTest: protectedProcedure
    .input(
      z.object({
        testId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.play.findFirst({
        where: {
          testId: input.testId,
        },
        select: {
          test: {
            include: {
              questions: {
                include: {
                  choices: true,
                },
              },
            },
          },
        },
      });
    }),
});

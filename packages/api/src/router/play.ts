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
  finishTest: protectedProcedure
    .input(
      z.object({
        playId: z.string(),
        score: z.number().int(),
        time: z.number().int(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.play.update({
        where: {
          id: input.playId,
        },
        data: {
          score: input.score,
          time: input.time,
          isFinished: true,
        },
      });
    }),
});

import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { shuffle } from "lodash";

export const playRouter = router({
  getTest: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/play/{testId}",
      },
    })
    .input(
      z.object({
        testId: z.string(),
      }),
    )
    .output(z.any())
    .query(({ ctx, input }) => {
      return ctx.prisma.play
        .findFirst({
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
        })
        .then((testDetails) => {
          if (!testDetails) {
            return testDetails;
          }

          const questions = shuffle(
            testDetails.test.questions.map((question) => {
              return {
                ...question,
                choices: shuffle(question.choices),
              };
            }),
          );

          return {
            ...testDetails,
            test: {
              ...testDetails.test,
              questions,
            },
          };
        });
    }),
  finishTest: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/play/finish",
      },
    })
    .input(
      z.object({
        playId: z.string(),
        score: z.number().int(),
        time: z.number().int(),
      }),
    )
    .output(z.any())
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

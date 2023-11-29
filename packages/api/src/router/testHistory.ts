import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { createTestHistoryInputSchema } from "@acme/schema/src/testHistory";
import { TRPCError } from "@trpc/server";

export const testHistoryRouter = router({
  getUserTestHistories: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/test-history/me",
      },
    })
    .input(z.void())
    .output(z.any())
    .query(({ ctx }) => {
      const { userId } = ctx.auth;

      return ctx.prisma.testHistory.findMany({
        where: {
          userId,
        },
        include: {
          questions: {
            include: {
              choices: true,
            },
          },
        },
      });
    }),

  getUserHistoryById: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/test-history/me/{historyId}",
      },
    })
    .input(
      z.object({
        historyId: z.string(),
      }),
    )
    .output(z.any())
    .query(({ ctx, input }) => {
      const { historyId } = input;

      return ctx.prisma.testHistory.findFirst({
        where: {
          id: historyId,
        },
        include: {
          questions: {
            include: {
              choices: true,
            },
          },
        },
      });
    }),

  getUserQuestionHistoryById: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/test-history/me/{questionId}",
      },
    })
    .input(
      z.object({
        questionId: z.string(),
      }),
    )
    .output(z.any())
    .query(({ ctx, input }) => {
      const { questionId } = input;

      return ctx.prisma.questionHistory.findFirst({
        where: {
          id: questionId,
        },
        include: {
          choices: true,
        },
      });
    }),

  createTestHistory: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/test-history/",
      },
    })
    .input(createTestHistoryInputSchema)
    .output(z.any())
    .mutation(async ({ ctx, input }) => {
      const { playId, testId, score, time, questions } = input;

      const userId = ctx.auth.userId;

      const testDetails = await ctx.prisma.test.findFirstOrThrow({
        where: {
          id: testId,
        },
        select: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              username: true,
              imageUrl: true,
            },
          },
          title: true,
          imageUrl: true,
          description: true,
          visibility: true,
          keywords: true,
          questions: true,
        },
      });

      await ctx.prisma.play.update({
        where: {
          id: playId,
        },
        data: {
          score,
          time,
          isFinished: true,
        },
      });

      const testHistory = await ctx.prisma.testHistory.create({
        data: {
          userId,
          creatorName: `${testDetails.user.firstName} ${testDetails.user.lastName}`,
          creatorUsername: testDetails.user.username,
          creatorImage: testDetails.user.imageUrl,
          imageUrl: testDetails.imageUrl,
          title: testDetails.title,
          description: testDetails.description,
          visibility: testDetails.visibility,
          keywords: testDetails.keywords.map((keyword) => keyword.name),
          score,
          time,
        },
      });

      await ctx.prisma.$transaction(
        questions.map((question) => {
          return ctx.prisma.questionHistory.create({
            data: {
              test: {
                connect: {
                  id: testHistory.id,
                },
              },
              title: question.title,
              image: question.image,
              time: question.time,
              points: question.points,
              pointsEarned: question.pointsEarned,
              timeElapsed: question.timeElapsed,
              type: question.type,
              choices: {
                createMany: {
                  data: question.choices.map((choice) => ({
                    text: choice.text,
                    isCorrect: choice.isCorrect,
                    isChosen: choice.isChosen,
                  })),
                },
              },
            },
          });
        }),
      );

      return testHistory.id;
    }),

  deleteTestHistory: protectedProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/test-history/{historyId}",
      },
    })
    .input(
      z.object({
        historyId: z.string(),
      }),
    )
    .output(z.any())
    .mutation(async ({ ctx, input }) => {
      const { historyId } = input;

      const testHistory = await ctx.prisma.testHistory.findFirst({
        where: {
          id: historyId,
        },
      });

      if (!testHistory) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Test history not found",
        });
      }

      if (testHistory.userId !== ctx.auth.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to delete this test history",
        });
      }

      return ctx.prisma.testHistory.delete({
        where: {
          id: historyId,
        },
      });
    }),
});

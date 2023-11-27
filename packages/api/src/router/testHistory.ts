import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { createTestHistoryInputSchema } from "@acme/schema/src/testHistory";

export const testHistoryRouter = router({
  getUserHistories: protectedProcedure
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

  createTestHistory: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/test-history/",
      },
    })
    .input(createTestHistoryInputSchema)
    .output(z.any())
    .mutation(({ ctx, input }) => {
      const {
        creatorName,
        creatorUsername,
        imageUrl,
        title,
        description,
        visibility,
        keywords,
        score,
        time,
        questions,
      } = input;

      const userId = ctx.auth.userId;

      return ctx.prisma.testHistory.create({
        data: {
          userId,
          creatorName,
          creatorUsername,
          imageUrl,
          title,
          description,
          visibility,
          keywords,
          score,
          time,
          questions: {
            createMany: {
              data: questions,
            },
          },
        },
      });
    }),
});

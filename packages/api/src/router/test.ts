import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { highlightTestsInput, testInputSchema } from "@acme/schema/src/test";
import { playersHighscoreSchema } from "@acme/schema/src/play";
import { TRPCError } from "@trpc/server";

import { Prisma } from "@acme/db";
import type { PlayersHighscore } from "@acme/schema/src/types";

type QuestionCreateInput = Prisma.QuestionCreateInput;

export const testRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.test.findMany({
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
        questions: {
          select: {
            answer: true,
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
            possibleAnswers: true,
            time: true,
            title: true,
            type: true,
          },
        },
        collections: {
          include: {
            collection: true,
          },
        },
        visibility: true,
        user: {
          select: {
            imageUrl: true,
            firstName: true,
            lastName: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }),
  getCollectionTests: protectedProcedure
    .input(
      z.object({
        collectionId: z.string(),
        type: z.enum(["all", "public", "private"]).default("all"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { collectionId, type } = input;

      const publicTests = await ctx.prisma.test.findMany({
        where: {
          visibility: type === "all" ? undefined : type,
        },
        select: {
          id: true,
          title: true,
          description: true,
          imageUrl: true,
        },
      });

      const collectionTests = await ctx.prisma.collection
        .findUnique({
          where: {
            id: collectionId,
          },
          select: {
            tests: {
              select: {
                testId: true,
              },
            },
          },
        })
        .then((collection) => collection?.tests);

      if (!collectionTests) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Collection not found",
        });
      }

      const mappedPublicTests = publicTests
        .map((test) => {
          const isSelected = collectionTests.some((collectionTest) => {
            return collectionTest.testId === test.id;
          });

          return {
            ...test,
            isSelected,
          };
        })
        .sort((a, b) => {
          if (a.isSelected && !b.isSelected) {
            return -1;
          }

          if (!a.isSelected && b.isSelected) {
            return 1;
          }

          return 0;
        });

      return mappedPublicTests;
    }),
  getById: protectedProcedure
    .input(z.object({ testId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.test.findUnique({
        where: {
          id: input.testId,
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
          collections: {
            include: {
              collection: true,
            },
          },
          visibility: true,
          user: {
            select: {
              imageUrl: true,
              firstName: true,
              lastName: true,
              username: true,
            },
          },
          createdAt: true,
          updatedAt: true,
          questions: {
            select: {
              answer: true,
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
              possibleAnswers: true,
              time: true,
              title: true,
              type: true,
            },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(testInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, description, image, keywords, visibility, questions } =
        input;

      const userId = ctx.auth.userId;

      const test = await ctx.prisma.test.create({
        data: {
          title,
          description,
          imageUrl: image,
          keywords: {
            createMany: {
              data: keywords.map((keyword) => ({
                name: keyword,
              })),
            },
          },
          visibility,
          user: {
            connect: {
              userId,
            },
          },
        },
      });

      const questionTransactions = questions.map((question) => {
        const { title, points, time, type, image } = question;

        const baseQuestionInput: QuestionCreateInput = {
          title,
          points,
          time,
          type,
          image,
          test: {
            connect: {
              id: test.id,
            },
          },
        };

        const choiceQuestionInput: QuestionCreateInput = {
          ...baseQuestionInput,
          choices:
            type === "true_or_false" ||
            type === "multiple_choice" ||
            type === "multi_select"
              ? {
                  createMany: {
                    data: question.choices.map((choice) => ({
                      isCorrect: choice.isCorrect,
                      text: choice.text,
                    })),
                  },
                }
              : undefined,
        };

        const identificationQuestionInput: QuestionCreateInput = {
          ...baseQuestionInput,
          answer: type === "identification" ? question.answer : undefined,
          possibleAnswers:
            type === "identification" ? question.possibleAnswers : undefined,
        };

        const enumerationQuestionInput: QuestionCreateInput = {
          ...baseQuestionInput,
          choices:
            type === "enumeration"
              ? {
                  createMany: {
                    data: question.choices.map((choice) => ({
                      isCorrect: choice.isCorrect,
                      text: choice.text,
                    })),
                  },
                }
              : undefined,
        };

        let mergedQuestionInput: QuestionCreateInput;
        switch (type) {
          case "true_or_false":
          case "multiple_choice":
          case "multi_select":
            mergedQuestionInput = choiceQuestionInput;
            break;
          case "identification":
            mergedQuestionInput = identificationQuestionInput;
            break;
          case "enumeration":
            mergedQuestionInput = enumerationQuestionInput;
            break;
          default:
            throw new Error("Invalid question type");
        }

        return ctx.prisma.question.create({
          data: mergedQuestionInput,
        });
      });

      await ctx.prisma.$transaction(questionTransactions);

      return test;
    }),
  edit: protectedProcedure
    .input(z.object({ testId: z.string() }))
    .input(testInputSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        testId,
        title,

        description,
        image,
        keywords,
        visibility,
        questions,
      } = input;

      const userId = ctx.auth.userId;

      await ctx.prisma.test.update({
        where: {
          id: testId,
        },
        data: {
          collections: {
            deleteMany: {},
          },
          keywords: {
            deleteMany: {},
          },
        },
      });

      const test = await ctx.prisma.test.update({
        where: {
          id: testId,
        },
        data: {
          title,
          description,
          imageUrl: image,
          keywords: {
            createMany: {
              data: keywords.map((keyword) => ({
                name: keyword,
              })),
            },
          },
          visibility,
          user: {
            connect: {
              userId,
            },
          },
        },
      });

      const questionTransactions = questions.map((question) => {
        const { title, points, time, type, image } = question;

        const baseQuestionInput: QuestionCreateInput = {
          title,
          points,
          time,
          type,
          image,
          test: {
            connect: {
              id: test.id,
            },
          },
        };

        const choiceQuestionInput: QuestionCreateInput = {
          ...baseQuestionInput,
          choices:
            type === "true_or_false" ||
            type === "multiple_choice" ||
            type === "multi_select"
              ? {
                  createMany: {
                    data: question.choices.map((choice) => ({
                      isCorrect: choice.isCorrect,
                      text: choice.text,
                    })),
                  },
                }
              : undefined,
        };

        const identificationQuestionInput: QuestionCreateInput = {
          ...baseQuestionInput,
          answer: type === "identification" ? question.answer : undefined,
          possibleAnswers:
            type === "identification" ? question.possibleAnswers : undefined,
        };

        const enumerationQuestionInput: QuestionCreateInput = {
          ...baseQuestionInput,
          choices:
            type === "enumeration"
              ? {
                  createMany: {
                    data: question.choices.map((choice) => ({
                      isCorrect: choice.isCorrect,
                      text: choice.text,
                    })),
                  },
                }
              : undefined,
        };

        let mergedQuestionInput: QuestionCreateInput;
        switch (type) {
          case "true_or_false":
          case "multiple_choice":
          case "multi_select":
            mergedQuestionInput = choiceQuestionInput;
            break;
          case "identification":
            mergedQuestionInput = identificationQuestionInput;
            break;
          case "enumeration":
            mergedQuestionInput = enumerationQuestionInput;
            break;
          default:
            throw new Error("Invalid question type");
        }

        return ctx.prisma.question.create({
          data: mergedQuestionInput,
        });
      });

      await ctx.prisma.question.deleteMany({
        where: {
          testId,
        },
      });

      await ctx.prisma.$transaction(questionTransactions);

      return test;
    }),

  getDiscoverTests: protectedProcedure
    .input(highlightTestsInput)
    .query(({ ctx, input }) => {
      return ctx.prisma.test.findMany({
        ...(input && input.amountOfTests ? { take: input.amountOfTests } : {}),
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
          questions: {
            select: {
              id: true,
            },
          },
          visibility: true,
          user: {
            select: {
              imageUrl: true,
              firstName: true,
              lastName: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });
    }),

  getTrendingTests: protectedProcedure
    .input(highlightTestsInput)
    .query(({ ctx, input }) => {
      return ctx.prisma.test.findMany({
        ...(input && input.amountOfTests ? { take: input.amountOfTests } : {}),
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
          questions: {
            select: {
              id: true,
            },
          },
          visibility: true,
          user: {
            select: {
              imageUrl: true,
              firstName: true,
              lastName: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          plays: {
            _count: "desc",
          },
        },
      });
    }),

  getTopPicks: protectedProcedure
    .input(highlightTestsInput)
    .query(({ ctx, input }) => {
      return ctx.prisma.test.findMany({
        ...(input && input.amountOfTests ? { take: input.amountOfTests } : {}),
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
          questions: {
            select: {
              id: true,
            },
          },
          visibility: true,
          user: {
            select: {
              imageUrl: true,
              firstName: true,
              lastName: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          favoritedUsers: {
            _count: "desc",
          },
        },
      });
    }),

  getDetails: protectedProcedure
    .input(z.object({ testId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { testId } = input;

      const test = await ctx.prisma.test.findUnique({
        where: {
          id: testId,
        },
        select: {
          user: {
            select: {
              userId: true,
            },
          },
        },
      });

      const isOwner = test?.user.userId === ctx.auth.userId;

      const notOwner = test?.user.userId;

      const totalQuestions = await ctx.prisma.question.count({
        where: {
          testId,
        },
      });

      const totalPlays = await ctx.prisma.play.count({
        where: {
          testId,
        },
      });

      const totalFavorites = await ctx.prisma.userOnFavoriteTest.count({
        where: {
          testId,
        },
      });

      return {
        isOwner,
        totalQuestions,
        totalPlays,
        totalFavorites,
        notOwner,
      };
    }),

  play: protectedProcedure
    .input(z.object({ testId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.play.create({
        data: {
          player: {
            connect: {
              userId: ctx.auth.userId,
            },
          },
          test: {
            connect: {
              id: input.testId,
            },
          },
        },
      });
    }),

  getScoreboard: protectedProcedure
    .input(z.object({ testId: z.string() }))
    .output(playersHighscoreSchema)
    .query(async ({ ctx, input }) => {
      const { testId } = input;

      const playsWithHighestScore = await ctx.prisma
        .$queryRaw<PlayersHighscore>(Prisma.sql`
          SELECT
            DISTINCT ON ("Play"."playerId")
            "User"."firstName",
            "User"."imageUrl",
            "Play"."playerId" AS "id",
            "Play"."createdAt",
            MAX("Play"."score") AS "highScore"
          FROM
            "Play"
          JOIN
            "User"
          ON
            "Play"."playerId" = "User"."userId"
          WHERE
            "Play"."isFinished" = TRUE
            AND "Play"."testId" = ${testId}
          GROUP BY
            "Play"."playerId",
            "Play"."createdAt",
            "User"."firstName",
            "User"."imageUrl"
          ORDER BY
            "Play"."playerId",
            "highScore" DESC,
            "Play"."createdAt" ASC;
        `);

      const sortedPlays = playsWithHighestScore.sort((a, b) => {
        return b.highScore - a.highScore;
      });

      return sortedPlays;
    }),

  getIsFavorite: protectedProcedure
    .input(z.object({ testId: z.string() }))
    .output(z.boolean())
    .query(async ({ ctx, input }) => {
      const { testId } = input;

      const favorite = await ctx.prisma.test.findUnique({
        where: {
          id: testId,
        },
        select: {
          favoritedUsers: {
            where: {
              userId: ctx.auth.userId,
            },
          },
        },
      });

      if (!favorite) {
        return false;
      }

      const isSingleFavorite = favorite.favoritedUsers.length === 1;
      if (!isSingleFavorite) {
        return false;
      }

      const user = favorite.favoritedUsers[0];
      if (!user) {
        return false;
      }

      return user.userId === ctx.auth.userId;
    }),

  toggleFavorite: protectedProcedure
    .input(z.object({ testId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { testId } = input;

      const favorite = await ctx.prisma.userOnFavoriteTest.findUnique({
        where: {
          userId_testId: {
            userId: ctx.auth.userId,
            testId: testId,
          },
        },
      });

      if (!favorite) {
        return ctx.prisma.userOnFavoriteTest.create({
          data: {
            test: {
              connect: {
                id: testId,
              },
            },
            user: {
              connect: {
                userId: ctx.auth.userId,
              },
            },
          },
        });
      }

      return ctx.prisma.userOnFavoriteTest.delete({
        where: {
          userId_testId: {
            userId: ctx.auth.userId,
            testId: testId,
          },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ testId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { testId } = input;

      const testDetails = await ctx.prisma.test.findUnique({
        where: {
          id: testId,
        },
        select: {
          user: {
            select: {
              userId: true,
            },
          },
          deletedAt: true,
        },
      });

      if (!testDetails) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Test not found",
        });
      }

      if (testDetails.user.userId !== ctx.auth.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        });
      }

      return ctx.prisma.test.delete({
        where: {
          id: testId,
        },
      });
    }),
});

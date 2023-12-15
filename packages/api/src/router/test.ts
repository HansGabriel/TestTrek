import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { highlightTestsInput, testInputSchema } from "@acme/schema/src/test";
import { playersHighscoreSchema } from "@acme/schema/src/play";
import { TRPCError } from "@trpc/server";

import { Prisma } from "@acme/db";
import {
  deleteTestFromAlgolia,
  updateTestInAlgolia,
} from "../services/algoliaApiHandlers/algoliaCudHandlers";
import type { _PlayersHighscore } from "../types";

type QuestionCreateInput = Prisma.QuestionCreateInput;

export const testRouter = router({
  getAll: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/tests",
      },
    })
    .input(z.void())
    .output(z.any())
    .query(({ ctx }) => {
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
    .meta({
      openapi: {
        method: "GET",
        path: "/tests/collection/{collectionId}",
      },
    })
    .input(
      z.object({
        collectionId: z.string(),
        type: z.enum(["all", "public", "private"]).default("all"),
      }),
    )
    .output(z.any())
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
    .meta({
      openapi: {
        method: "GET",
        path: "/tests/{testId}",
      },
    })
    .input(z.object({ testId: z.string() }))
    .output(z.any())
    .query(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;

      const isOwnerOfTest = await ctx.prisma.test
        .findFirst({
          where: {
            id: input.testId,
          },
          select: {
            userId: true,
          },
        })
        .then((test) => test?.userId === userId);

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
          questions: isOwnerOfTest
            ? {
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
              }
            : undefined,
        },
      });
    }),

  create: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/tests",
      },
    })
    .input(testInputSchema)
    .output(z.any())
    .mutation(async ({ ctx, input }) => {
      const { title, description, image, keywords, visibility, questions } =
        input;

      const userId = ctx.auth.userId;

      const isUserPremium = await ctx.prisma.user
        .findUnique({
          where: {
            userId,
          },
          select: {
            isPremium: true,
          },
        })
        .then((user) => user?.isPremium);

      const userTestCount = await ctx.prisma.test.count({
        where: {
          userId,
        },
      });

      if (!isUserPremium && userTestCount >= 10) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Subscribe to our premium account to create more tests",
        });
      }

      if (isUserPremium && userTestCount >= 50) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You have reached the maximum amount of tests",
        });
      }

      if (!isUserPremium && questions.length >= 25) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Subscribe to our premium account to create more questions",
        });
      }

      if (isUserPremium && questions.length >= 50) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You have reached the maximum amount of questions",
        });
      }

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
          choices:
            type === "identification"
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
          default:
            throw new Error("Invalid question type");
        }

        return ctx.prisma.question.create({
          data: mergedQuestionInput,
        });
      });

      await ctx.prisma.$transaction(questionTransactions);

      const testForAlgolia = await ctx.prisma.test.findUnique({
        where: {
          id: test.id,
        },
        select: {
          id: true,
          title: true,
          description: true,
          imageUrl: true,
          keywords: {
            select: {
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
              userId: true,
              imageUrl: true,
              firstName: true,
              lastName: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });

      if (testForAlgolia !== null) {
        try {
          await updateTestInAlgolia(testForAlgolia);
        } catch (error) {
          console.error(`Error updating test in Algolia: ${error}`);
          console.error(`Error details: ${JSON.stringify(error, null, 2)}`);
        }
      }

      return test;
    }),
  edit: protectedProcedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/tests/{testId}",
      },
    })
    .input(z.object({ testId: z.string() }))
    .input(testInputSchema)
    .output(z.any())
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

      const isUserPremium = await ctx.prisma.user
        .findUnique({
          where: {
            userId,
          },
          select: {
            isPremium: true,
          },
        })
        .then((user) => user?.isPremium);

      if (!isUserPremium && questions.length > 25) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Subscribe to our premium account to create more questions",
        });
      }

      if (isUserPremium && questions.length > 50) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You have reached the maximum amount of questions",
        });
      }

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
          choices:
            type === "identification"
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

      const testForAlgolia = await ctx.prisma.test.findUnique({
        where: {
          id: test.id,
        },
        select: {
          id: true,
          title: true,
          description: true,
          imageUrl: true,
          keywords: {
            select: {
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
              userId: true,
              imageUrl: true,
              firstName: true,
              lastName: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });

      if (testForAlgolia !== null) {
        try {
          await updateTestInAlgolia(testForAlgolia);
        } catch (error) {
          console.error(`Error updating test in Algolia: ${error}`);
          console.error(`Error details: ${JSON.stringify(error, null, 2)}`);
        }
      }

      return test;
    }),

  getDiscoverTests: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/tests/discover",
      },
    })
    .input(highlightTestsInput)
    .output(z.any())
    .query(({ ctx, input }) => {
      return ctx.prisma.test.findMany({
        ...(input && input.amountOfTests
          ? { take: input.amountOfTests }
          : { take: 50 }),
        where: {
          visibility: "public",
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
          updatedAt: "desc",
        },
      });
    }),

  getTrendingTests: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/tests/trending",
      },
    })
    .input(highlightTestsInput)
    .output(z.any())
    .query(({ ctx, input }) => {
      return ctx.prisma.test.findMany({
        ...(input && input.amountOfTests
          ? { take: input.amountOfTests }
          : { take: 50 }),
        where: {
          visibility: "public",
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
        orderBy: [
          {
            plays: {
              _count: "desc",
            },
          },
          {
            updatedAt: "desc",
          },
          {
            questions: {
              _count: "desc",
            },
          },
        ],
      });
    }),

  getTopPicks: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/tests/top-picks",
      },
    })
    .input(highlightTestsInput)
    .output(z.any())
    .query(({ ctx, input }) => {
      return ctx.prisma.test.findMany({
        ...(input && input.amountOfTests
          ? { take: input.amountOfTests }
          : { take: 50 }),
        where: {
          visibility: "public",
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
        orderBy: [
          {
            favoritedUsers: {
              _count: "desc",
            },
          },
          {
            updatedAt: "desc",
          },
          {
            questions: {
              _count: "desc",
            },
          },
        ],
      });
    }),

  getDetails: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/tests/details/{testId}",
      },
    })
    .input(z.object({ testId: z.string() }))
    .output(z.any())
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

  delete: protectedProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/tests/{testId}",
      },
    })
    .input(z.object({ testId: z.string() }))
    .output(z.any())
    .mutation(async ({ ctx, input }) => {
      const { testId } = input;

      const test = await ctx.prisma.test.findUnique({
        where: {
          id: testId,
        },
        select: {
          userId: true,
        },
      });

      if (!test) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Test not found",
        });
      }

      if (test?.userId !== ctx.auth.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Not authorized to delete this test",
        });
      }

      try {
        await deleteTestFromAlgolia(testId);
      } catch (error) {
        console.error(`Error deleting test from Algolia: ${error}`);
      }

      return ctx.prisma.test.delete({
        where: {
          id: testId,
        },
      });
    }),

  play: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/tests/play",
      },
    })
    .input(z.object({ testId: z.string() }))
    .output(z.any())
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
    .meta({
      openapi: {
        method: "GET",
        path: "/tests/scoreboard/{testId}",
      },
    })
    .input(z.object({ testId: z.string() }))
    .output(playersHighscoreSchema)
    .query(async ({ ctx, input }) => {
      const { testId } = input;

      const playsWithHighestScore = await ctx.prisma
        .$queryRaw<_PlayersHighscore[]>(
          Prisma.sql`
        SELECT
          DISTINCT ON ("play"."player_id")
          "user"."user_first_name",
          "user"."user_image_url",
          "play"."player_id" AS "id",
          "play"."play_created_at",
          MAX("play"."play_score") AS "high_score"
        FROM
          "play"
        JOIN
          "user"
        ON
          "play"."player_id" = "user"."clerk_user_id"
        WHERE
          "play"."play_is_finished" = TRUE
          AND "play"."test_id" = ${testId}
        GROUP BY
          "play"."player_id",
          "play"."play_created_at",
          "user"."user_first_name",
          "user"."user_image_url"
        ORDER BY
          "play"."player_id",
          "high_score" DESC,
          "play"."play_created_at" ASC;
      `,
        )
        .then((plays) =>
          plays.map((play) => ({
            id: play.id,
            createdAt: play.play_created_at,
            highScore: play.high_score,
            firstName: play.user_first_name,
            imageUrl: play.user_image_url,
          })),
        );

      const sortedPlays = playsWithHighestScore.sort((a, b) => {
        return b.highScore - a.highScore;
      });

      return sortedPlays;
    }),

  getIsFavorite: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/tests/favorite",
      },
    })
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
    .meta({
      openapi: {
        method: "POST",
        path: "/tests/favorite",
      },
    })
    .input(z.object({ testId: z.string() }))
    .output(z.any())
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
});

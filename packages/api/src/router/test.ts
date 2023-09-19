import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { testInputSchema } from "@acme/schema/src/test";
import { match } from "ts-pattern";

import type { Prisma } from "@acme/db";

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
      const {
        title,
        collection,
        description,
        image,
        keywords,
        visibility,
        questions,
      } = input;

      const userId = ctx.auth.userId;

      const test = await ctx.prisma.test.create({
        data: {
          title,
          collections: collection
            ? {
                create: {
                  collection: {
                    connect: {
                      id: collection,
                    },
                  },
                },
              }
            : undefined,
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

        // merge all the possible inputs
        const mergedQuestionInput = match(type)
          .with("true_or_false", () => choiceQuestionInput)
          .with("multiple_choice", () => choiceQuestionInput)
          .with("multi_select", () => choiceQuestionInput)
          .with("identification", () => identificationQuestionInput)
          .with("enumeration", () => enumerationQuestionInput)
          .exhaustive();

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
        collection,
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
          collections: collection
            ? {
                create: {
                  collection: {
                    connect: {
                      id: collection,
                    },
                  },
                },
              }
            : undefined,
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

        // merge all the possible inputs
        const mergedQuestionInput = match(type)
          .with("true_or_false", () => choiceQuestionInput)
          .with("multiple_choice", () => choiceQuestionInput)
          .with("multi_select", () => choiceQuestionInput)
          .with("identification", () => identificationQuestionInput)
          .with("enumeration", () => enumerationQuestionInput)
          .exhaustive();

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
  getDiscoverTests: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.test.findMany({
      take: 5,
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
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }),

  getTrendingTests: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.test.findMany({
      take: 5,
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
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }),

  getTopPicks: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.test.findMany({
      take: 5,
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
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }),

  delete: protectedProcedure
    .input(z.object({ testId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { testId } = input;

      return ctx.prisma.test.delete({
        where: {
          id: testId,
        },
      });
    }),
});

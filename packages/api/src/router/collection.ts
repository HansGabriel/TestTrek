import { collectionsSchema } from "@acme/schema/src/collection";
import { testSortSchema } from "@acme/schema/src/testFilter";
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const collectionRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.collection.findMany({
      select: {
        id: true,
        title: true,
        userId: true,
        imageUrl: true,
        tests: true,
      },
    });
  }),

  getByCollectionId: protectedProcedure
    .input(z.object({ collectionId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.collection.findUnique({
        where: {
          id: input.collectionId,
        },
        select: {
          id: true,
          title: true,
          imageUrl: true,
          userId: true,
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
          tests: {
            select: {
              test: {
                select: {
                  id: true,
                  title: true,
                  imageUrl: true,
                  description: true,
                  visibility: true,
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
                },
              },
            },
          },
        },
      });
    }),

  getTestsInCollection: protectedProcedure
    .input(
      z.object({
        collectionId: z.string(),
        sortType: z.union([
          z.literal("newest"),
          z.literal("oldest"),
          z.literal("alphabetical"),
        ]),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.testOnCollection.findMany({
        where: {
          collectionsId: input.collectionId,
        },
        orderBy: (() => {
          switch (input.sortType) {
            case "newest":
              return { test: { createdAt: "desc" } };
            case "oldest":
              return { test: { createdAt: "asc" } };
            case "alphabetical":
              return { test: { title: "asc" } };
            default:
              return { test: { createdAt: "desc" } };
          }
        })(),
        select: {
          test: {
            select: {
              id: true,
              title: true,
              imageUrl: true,
              description: true,
              visibility: true,
              createdAt: true,
              user: {
                select: {
                  id: true,
                  username: true,
                  firstName: true,
                  lastName: true,
                  imageUrl: true,
                },
              },
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
            },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(collectionsSchema)
    .mutation(({ ctx, input }) => {
      const { title, image } = input;

      const userId = ctx.auth.userId;

      return ctx.prisma.collection.create({
        data: {
          title,
          imageUrl: image,
          userId,
        },
      });
    }),
  getTopCollections: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.collection.findMany({
      take: 5,
      select: {
        id: true,
        title: true,
        userId: true,
        imageUrl: true,
        tests: true,
      },
    });
  }),
});

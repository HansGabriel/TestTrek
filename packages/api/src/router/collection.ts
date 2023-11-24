import {
  collectionByUserIdSchema,
  collectionSortSchema,
  collectionsSchema,
  highlightCollectionsInput,
} from "@acme/schema/src/collection";
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import {
  deleteCollectionFromAlgolia,
  updateCollectionInAlgolia,
} from "../services/algoliaApiHandlers/algoliaCudHandlers";
import { TRPCError } from "@trpc/server";

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

  getCollectionsByUserId: protectedProcedure
    .input(collectionByUserIdSchema)
    .query(({ ctx, input }) => {
      const { userId, sortBy } = input;

      return ctx.prisma.collection.findMany({
        where: {
          userId: userId,
          visibility: "public",
        },
        orderBy: (() => {
          switch (sortBy) {
            case "newest":
              return { createdAt: "desc" };
            case "oldest":
              return { createdAt: "asc" };
            case "alphabetical":
              return { title: "asc" };
            default:
              return { createdAt: "desc" };
          }
        })(),
        select: {
          id: true,
          title: true,
          imageUrl: true,
          userId: true,
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
              },
            },
          },
        },
      });
    }),

  getByUserId: protectedProcedure
    .input(collectionSortSchema)
    .query(({ ctx, input }) => {
      const { sortBy } = input;

      return ctx.prisma.collection.findMany({
        where: {
          userId: ctx.auth.userId,
        },
        orderBy: (() => {
          switch (sortBy) {
            case "newest":
              return { createdAt: "desc" };
            case "oldest":
              return { createdAt: "asc" };
            case "alphabetical":
              return { title: "asc" };
            default:
              return { createdAt: "desc" };
          }
        })(),
        select: {
          id: true,
          title: true,
          imageUrl: true,
          userId: true,
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
              },
            },
          },
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
          },
        },
      });
    }),

  create: protectedProcedure
    .input(collectionsSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, image, visibility } = input;

      const userId = ctx.auth.userId;

      const newCollection = await ctx.prisma.collection.create({
        data: {
          title,
          imageUrl: image,
          userId,
          visibility,
        },
      });

      if (newCollection.visibility === "public") {
        const collectionForAlgolia = await ctx.prisma.collection.findUnique({
          where: {
            id: newCollection.id,
          },
          select: {
            id: true,
            user: {
              select: {
                userId: true,
                imageUrl: true,
                firstName: true,
                lastName: true,
              },
            },
            title: true,
            imageUrl: true,
            createdAt: true,
            updatedAt: true,
            visibility: true,
          },
        });

        if (collectionForAlgolia !== null) {
          try {
            await updateCollectionInAlgolia(collectionForAlgolia);
            console.log(
              `Public collection ${newCollection.id} added to Algolia`,
            );
          } catch (error) {
            console.error(`Error adding collection to Algolia: `, error);
            console.error(`Error details: ${JSON.stringify(error, null, 2)}`);
          }
        }
      }

      return newCollection;
    }),

  editCollection: protectedProcedure
    .input(collectionsSchema)
    .input(z.object({ collectionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { image, title, visibility, collectionId } = input;

      const userId = ctx.auth.userId;
      const currentVisibility = await ctx.prisma.collection.findUnique({
        where: { id: collectionId },
        select: { visibility: true },
      });

      const editedCollection = await ctx.prisma.collection.update({
        where: {
          id: collectionId,
        },
        data: {
          title,
          imageUrl: image,
          visibility,
          user: {
            connect: {
              userId,
            },
          },
        },
      });

      if (
        currentVisibility?.visibility === "private" &&
        editedCollection.visibility === "public"
      ) {
        const collectionForAlgolia = await ctx.prisma.collection.findUnique({
          where: {
            id: editedCollection.id,
          },
          select: {
            id: true,
            user: {
              select: {
                userId: true,
                imageUrl: true,
                firstName: true,
                lastName: true,
              },
            },
            title: true,
            imageUrl: true,
            createdAt: true,
            updatedAt: true,
            visibility: true,
          },
        });

        if (collectionForAlgolia !== null) {
          try {
            await updateCollectionInAlgolia(collectionForAlgolia);
            console.log(
              `Public collection ${editedCollection.id} added to Algolia`,
            );
          } catch (error) {
            console.error(`Error adding collection to Algolia: `, error);
            console.error(`Error details: ${JSON.stringify(error, null, 2)}`);
          }
        }
      } else if (
        currentVisibility?.visibility === "public" &&
        editedCollection.visibility === "private"
      ) {
        try {
          await deleteCollectionFromAlgolia(collectionId);
        } catch (error) {
          console.error(`Error removing collection from Algolia: ${error}`);
        }
      }

      return editedCollection;
    }),
  getTopCollections: protectedProcedure
    .input(highlightCollectionsInput)
    .query(({ ctx, input }) => {
      return ctx.prisma.collection.findMany({
        ...(input && input.amountOfCollections
          ? { take: input.amountOfCollections }
          : { take: 50 }),
        where: {
          visibility: "public",
        },
        select: {
          id: true,
          title: true,
          userId: true,
          imageUrl: true,
          tests: true,
        },
      });
    }),

  updateTestsOnCollection: protectedProcedure
    .input(
      z.object({
        collectionId: z.string(),
        testIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { collectionId, testIds } = input;

      await ctx.prisma.testOnCollection.deleteMany({
        where: {
          collectionsId: collectionId,
        },
      });

      return ctx.prisma.collection.update({
        where: {
          id: collectionId,
        },
        data: {
          tests: {
            createMany: {
              data: testIds.map((testId) => ({
                testId,
              })),
              skipDuplicates: true,
            },
          },
        },
      });
    }),

  deleteCollection: protectedProcedure
    .input(z.object({ collectionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { collectionId } = input;

      const collection = await ctx.prisma.collection.findUnique({
        where: {
          id: collectionId,
        },
        select: {
          userId: true,
        },
      });

      if (!collection) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Collection not found",
        });
      }

      if (collection?.userId !== ctx.auth.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to delete this collection",
        });
      }

      try {
        await deleteCollectionFromAlgolia(collectionId);
        console.log(`Collection ${collectionId} removed from Algolia`);
      } catch (error) {
        console.error(`Error removing collection from Algolia: `, error);
        console.error(`Error details: ${JSON.stringify(error, null, 2)}`);
      }

      return ctx.prisma.collection.delete({
        where: {
          id: collectionId,
        },
      });
    }),
});

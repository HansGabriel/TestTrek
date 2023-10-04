import { router, protectedProcedure } from "../trpc";
import {
  testByUserIdSchema,
  testFiltersSchema,
} from "@acme/schema/src/testFilter";

export const testFilterRouter = router({
  getAll: protectedProcedure
    .input(testFiltersSchema)
    .query(async ({ ctx, input }) => {
      const { testType, sortBy } = input;

      const userId = ctx.auth.userId;

      let whereCondition = {};

      switch (testType) {
        case "user":
          whereCondition = { userId };
          break;
        case "favorite":
          const favoriteTestIds = await ctx.prisma.userOnFavoriteTest
            .findMany({
              where: {
                userId,
              },
              select: {
                testId: true,
              },
            })
            .then((favorites) => favorites.map((favorite) => favorite.testId));
          whereCondition = {
            userId,
            id: { in: favoriteTestIds },
          };
          break;
        case "other":
          whereCondition = {
            userId: { not: userId },
            visibility: "public",
          };
          break;
        default:
          throw new Error("Invalid testType provided.");
      }

      return ctx.prisma.test.findMany({
        where: whereCondition,

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
          description: true,
          imageUrl: true,
          keywords: {
            select: {
              id: true,
              name: true,
            },
          },
          visibility: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
          collections: {
            include: { collection: true },
          },
          plays: {
            include: {
              player: true,
            },
          },
        },
      });
    }),
  getByUserId: protectedProcedure
    .input(testByUserIdSchema)
    .query(async ({ ctx, input }) => {
      const { userId, sortBy, testType } = input;

      let whereCondition = {};

      switch (testType) {
        case "user":
          whereCondition = { userId };
          break;
        case "favorite":
          const favoriteTestIds = await ctx.prisma.userOnFavoriteTest
            .findMany({
              where: {
                userId,
              },
              select: {
                testId: true,
              },
            })
            .then((favorites) => favorites.map((favorite) => favorite.testId));
          whereCondition = {
            userId,
            id: { in: favoriteTestIds },
          };
          break;
        case "other":
          whereCondition = {
            userId: { not: userId },
          };
          break;
        default:
          throw new Error("Invalid testType provided.");
      }

      return ctx.prisma.test.findMany({
        where: whereCondition,
        orderBy: {
          ...(sortBy === "newest" && { createdAt: "desc" }),
          ...(sortBy === "oldest" && { createdAt: "asc" }),
          ...(sortBy === "alphabetical" && { title: "asc" }),
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
          visibility: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
          collections: {
            include: { collection: true },
          },
          plays: {
            include: {
              player: true,
            },
          },
        },
      });
    }),
});

import { router, protectedProcedure } from "../trpc";
import { testFiltersSchema } from "@acme/schema/src/testFilter";
import { Prisma } from "@acme/db";

export const testFilterRouter = router({
  getAll: protectedProcedure
    .input(testFiltersSchema)
    .query(async ({ ctx, input }) => {
      const { testType, sortBy } = input;

      const isUser: Prisma.TestWhereInput = {
        userId: ctx.auth.userId,
      };

      const isOther: Prisma.TestWhereInput = {
        userId: {
          not: ctx.auth.userId,
        },
      };

      const favoriteTestIds = await ctx.prisma.favoriteTest
        .findMany({
          where: {
            userId: ctx.auth.userId,
          },
          select: {
            testId: true,
          },
        })
        .then((favorites) => favorites.map((favorite) => favorite.testId));

      const isFavorite: Prisma.TestWhereInput = {
        id: {
          in: favoriteTestIds,
        },
      };

      return ctx.prisma.test.findMany({
        where:
          testType === "user"
            ? isUser
            : testType === "favorite"
            ? isFavorite
            : isOther,
        orderBy: (() => {
          switch (sortBy) {
            case "newest":
              return { createdAt: "desc" }; // Sort by newest first
            case "oldest":
              return { createdAt: "asc" }; // Sort by oldest first
            case "alphabetical":
              return { title: "asc" }; // Sort alphabetically by title
            default:
              return { createdAt: "desc" }; // Default to sorting by newest
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
        },
      });
    }),
});

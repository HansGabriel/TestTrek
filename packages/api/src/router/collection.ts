import { collectionsSchema } from "@acme/schema/src/collection";
import { testSortSchema } from "@acme/schema/src/testFilter";
import { router, protectedProcedure } from "../trpc";

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

  getByUserId: protectedProcedure
    .input(testSortSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.collection.findMany({
        where: {
          userId: ctx.auth.userId,
        },
        orderBy: (() => {
          switch (input) {
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
});

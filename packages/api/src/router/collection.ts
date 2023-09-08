import { collectionsSchema } from "@acme/schema/src/collection";
import { router, protectedProcedure } from "../trpc";

export const collectionsRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.collections.findMany({
      select: {
        id: true,
        title: true,
        userId: true,
        imageUrl: true,
        tests: true,
      },
    });
  }),

  getByUserId: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.collections.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      orderBy: {
        title: "asc",
      },
    });
  }),

  create: protectedProcedure
    .input(collectionsSchema)
    .mutation(({ ctx, input }) => {
      const { title, image } = input;

      const userId = ctx.auth.userId;

      return ctx.prisma.collections.create({
        data: {
          title,
          imageUrl: image,
          userId,
        },
      });
    }),
});

import { router, protectedProcedure } from "../trpc";
import { testDetailsSchema } from "@acme/schema/src/test";

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
        collection: true,
        visibility: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }),
  create: protectedProcedure
    .input(testDetailsSchema)
    .mutation(({ ctx, input }) => {
      const { title, collection, description, image, keywords, visibility } =
        input;

      const userId = ctx.auth.user?.id;

      return ctx.prisma.test.create({
        data: {
          title,
          collection,
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
          userId: userId ?? "random id",
        },
      });
    }),
});

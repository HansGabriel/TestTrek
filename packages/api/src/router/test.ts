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
        collections: {
          include: {
            collection: true,
          },
        },
        visibility: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }),
  create: protectedProcedure
    .input(testDetailsSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, collections, description, image, keywords, visibility } =
        input;

      const userId = ctx.auth.userId;

      return await ctx.prisma.test.create({
        data: {
          title,
          collections: {
            create: collections.map((collectionId) => ({
              collection: {
                connect: {
                  id: collectionId,
                },
              },
            })),
          },
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
          userId,
        },
      });
    }),
});

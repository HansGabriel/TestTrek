import { addAllTestsToAlgolia } from "../services/algoliaApiHandlers/algoliaApiAddAllHandlers";
import { router, protectedProcedure } from "../trpc";

export const algoliaRouter = router({
  addAllItemsToAlgolia: protectedProcedure.mutation(({ ctx }) => {
    const queriedTests = ctx.prisma.test.findMany({
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
      orderBy: {
        updatedAt: "desc",
      },
    });

    addAllTestsToAlgolia(queriedTests);
  }),
});

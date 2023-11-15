import {
  addAllCollectionsToAlgolia,
  addAllReviewersToAlgolia,
  addAllTestsToAlgolia,
  addAllUsersToAlgolia,
} from "../services/algoliaApiHandlers/algoliaApiAddAllHandlers";
import { router, protectedProcedure } from "../trpc";

export const algoliaRouter = router({
  addAllTestsToAlgolia: protectedProcedure.mutation(({ ctx }) => {
    const queriedTests = ctx.prisma.test.findMany({
      where: {
        visibility: "public",
      },
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
  addAllUsersToAlgolia: protectedProcedure.mutation(({ ctx }) => {
    const queriedUsers = ctx.prisma.user.findMany({
      select: {
        id: true,
        userId: true,
        firstName: true,
        lastName: true,
        email: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    addAllUsersToAlgolia(queriedUsers);
  }),
  addAllCollectionsToAlgolia: protectedProcedure.mutation(({ ctx }) => {
    const queriedCollections = ctx.prisma.collection.findMany({
      where: {
        visibility: "public",
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
      },
    });
    addAllCollectionsToAlgolia(queriedCollections);
  }),
  addAllReviewersToAlgolia: protectedProcedure.mutation(({ ctx }) => {
    const queriedReviewers = ctx.prisma.reviewer.findMany({
      where: { visibility: "public" },
      select: {
        id: true,
        title: true,
        imageUrl: true,
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
    });
    addAllReviewersToAlgolia(queriedReviewers);
  }),
});

import {
  addAllCollectionsToAlgolia,
  addAllReviewersToAlgolia,
  addAllTestsToAlgolia,
  addAllUsersToAlgolia,
  initializeAlgoliaClient,
} from "./algoliaApiAddAllHandlers";
import { prisma } from "@acme/db";

const clearAlgoliaIndex = async (indexName: string) => {
  const client = initializeAlgoliaClient();
  const index = client.initIndex(indexName);

  await index.clearObjects();
  console.log(`Cleared Algolia Index: ${indexName}`);
};

const initializeAlgolia = async () => {
  try {
    console.log("Running initialization tasks...");

    await clearAlgoliaIndex("tests");
    await clearAlgoliaIndex("users");
    await clearAlgoliaIndex("collections");
    await clearAlgoliaIndex("reviewers");

    await addAllTestsToAlgolia(
      prisma.test.findMany({
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
      }),
    );

    await addAllUsersToAlgolia(
      prisma.user.findMany({
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
      }),
    );

    await addAllCollectionsToAlgolia(
      prisma.collection.findMany({
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
          visibility: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    );

    await addAllReviewersToAlgolia(
      prisma.reviewer.findMany({
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
          visibility: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    );
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};

initializeAlgolia();

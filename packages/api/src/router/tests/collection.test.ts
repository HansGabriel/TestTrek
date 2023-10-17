import { collectionRouter } from "../collection";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MockCtxType, mockCtx } from "./mockCtx";

describe("collectionRouter", () => {
  const ctx: MockCtxType = mockCtx;

  beforeEach(async () => {
    ctx.prisma.collection.findMany = vi.fn().mockResolvedValue([
      {
        id: "collectionId1",
        title: "Sample Collection 1",
        userId: "userId1",
        imageUrl: "https://example.com/image1.jpg",
        tests: [],
      },
      {
        id: "collectionId2",
        title: "Sample Collection 2",
        userId: "userId2",
        imageUrl: "https://example.com/image2.jpg",
        tests: [],
      },
      {
        id: "collectionId3",
        title: "Sample Collection 3",
        userId: "userId3",
        imageUrl: "https://example.com/image3.jpg",
        tests: [],
      },
    ]);

    ctx.prisma.collection.findUnique = vi.fn().mockResolvedValue({
      id: "collectionId1",
      title: "Sample Collection 1",
      userId: "userId1",
      imageUrl: "https://example.com/image1.jpg",
      tests: [],
    });

    ctx.prisma.testOnCollection.findMany = vi.fn().mockResolvedValue([
      {
        test: {
          id: "testId1",
          title: "Sample Test 1",
        },
      },
      {
        test: {
          id: "testId2",
          title: "Sample Test 2",
        },
      },
      {
        test: {
          id: "testId3",
          title: "Sample Test 3",
        },
      },
    ]);

    ctx.prisma.collection.create = vi.fn().mockResolvedValue({
      id: "newCollectionId",
      title: "New Collection",
      imageUrl: "https://example.com/new-image.jpg",
      userId: "userId1",
      visibility: "public",
    });

    ctx.prisma.collection.update = vi.fn().mockResolvedValue({
      id: "collectionId1",
      title: "Updated Collection",
      image: "https://example.com/updated-image.jpg",
      visibility: "private",
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const caller = collectionRouter.createCaller(ctx);

  describe("getAll query", () => {
    it("should handle getAll query for collections", async () => {
      const result = await caller.getAll();
      expect(result).toHaveLength(3);
      const collection = result[0];
      expect(collection).toHaveProperty("id", "collectionId1");
      expect(ctx.prisma.collection.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          title: true,
          userId: true,
          imageUrl: true,
          tests: true,
        },
      });
    });

    it("should handle getCollectionsByUserId query for collections", async () => {
      const input = { userId: "userId1", sortBy: "newest" } as const;
      const result = await caller.getCollectionsByUserId(input);
      expect(result).toHaveLength(3);
      const collection = result[0];
      expect(collection).toHaveProperty("id", "collectionId1");
      expect(ctx.prisma.collection.findMany).toHaveBeenCalledWith({
        where: {
          userId: input.userId,
          visibility: "public",
        },
        orderBy: { createdAt: "desc" },
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
                      answer: true,
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
                      possibleAnswers: true,
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
    });

    it("should handle getByUserId query for collections", async () => {
      const input = { sortBy: "newest" } as const;
      const result = await caller.getByUserId(input);
      expect(result).toHaveLength(3);
      const collection = result[0];
      expect(collection).toHaveProperty("id", "collectionId1");
      expect(ctx.prisma.collection.findMany).toHaveBeenCalledWith({
        where: {
          userId: ctx.auth.userId,
        },
        orderBy: { createdAt: "desc" },
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
                      answer: true,
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
                      possibleAnswers: true,
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
    });

    it("should handle getByCollectionId query for a specific collection", async () => {
      const input = { collectionId: "collectionId1" };
      const result = await caller.getByCollectionId(input);
      expect(result).toHaveProperty("id", "collectionId1");
      expect(ctx.prisma.collection.findUnique).toHaveBeenCalledWith({
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
                      answer: true,
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
                      possibleAnswers: true,
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
    });

    describe("getTestsInCollection query", () => {
      const testSortTypes = (
        sortType: "newest" | "oldest" | "alphabetical",
        orderBy: object,
      ) => {
        it(`should handle getTestsInCollection query with sortType: ${sortType}`, async () => {
          const input = { collectionId: "collectionId1", sortType };
          const result = await caller.getTestsInCollection(input);
          expect(result).toHaveLength(3);
          const test = result[0];
          expect(test).toHaveProperty("test.id", "testId1");
          expect(ctx.prisma.testOnCollection.findMany).toHaveBeenCalledWith({
            where: {
              collectionsId: input.collectionId,
            },
            orderBy,
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
                      answer: true,
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
                      possibleAnswers: true,
                      time: true,
                      title: true,
                      type: true,
                    },
                  },
                },
              },
            },
          });
        });
      };

      testSortTypes("newest", { test: { createdAt: "desc" } });
      testSortTypes("oldest", { test: { createdAt: "asc" } });
      testSortTypes("alphabetical", { test: { title: "asc" } });
    });

    it("should handle create mutation for a new collection", async () => {
      const input = {
        title: "New Collection",
        image: "https://example.com/new-image.jpg",
        visibility: "public" as "public" | "private",
      };

      const result = await caller.create(input);

      expect(result).toHaveProperty("id", "newCollectionId");
      expect(result).toHaveProperty("title", "New Collection");
      expect(result).toHaveProperty(
        "imageUrl",
        "https://example.com/new-image.jpg",
      );
      expect(result).toHaveProperty("userId", "userId1");
      expect(result).toHaveProperty("visibility", "public");

      expect(ctx.prisma.collection.create).toHaveBeenCalledWith({
        data: {
          title: input.title,
          imageUrl: input.image,
          userId: ctx.auth.userId,
          visibility: input.visibility,
        },
      });
    });

    it("should handle editCollection mutation", async () => {
      const input = {
        title: "Updated Collection",
        image: "https://example.com/updated-image.jpg",
        visibility: "private" as "public" | "private",
        collectionId: "collectionId1",
      };

      const result = await caller.editCollection(input);

      expect(result).toEqual({
        id: "collectionId1",
        title: input.title,
        image: input.image,
        visibility: input.visibility,
      });

      expect(ctx.prisma.collection.update).toHaveBeenCalledWith({
        where: { id: input.collectionId },
        data: {
          title: input.title,
          imageUrl: input.image,
          visibility: input.visibility,
          user: { connect: { userId: ctx.auth.userId } },
        },
      });
    });

    it("should handle getTopCollections query", async () => {
      ctx.prisma.collection.findMany = vi.fn().mockResolvedValue([
        {
          id: "collectionId1",
          title: "Sample Collection 1",
          userId: "userId1",
          imageUrl: "https://example.com/image1.jpg",
          tests: [],
        },
        {
          id: "collectionId2",
          title: "Sample Collection 2",
          userId: "userId2",
          imageUrl: "https://example.com/image2.jpg",
          tests: [],
        },
      ]);

      const input = {
        amountOfCollections: 2,
      };

      const result = await caller.getTopCollections(input);

      expect(result).toHaveLength(2);
      const collection = result[0];
      expect(collection).toHaveProperty("id", "collectionId1");

      expect(ctx.prisma.collection.findMany).toHaveBeenCalledWith({
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
    });
  });
});

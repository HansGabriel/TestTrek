import { mockCtx, MockCtxType } from "./mockCtx";
import { testFilterRouter } from "../testFilter";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("testFilterRouter", () => {
  const ctx: MockCtxType = mockCtx;

  beforeEach(async () => {
    ctx.prisma.userOnFavoriteTest.findMany = vi.fn().mockResolvedValue([
      {
        testId: "testId1",
        userId: "userId1",
      },
    ]);
    ctx.prisma.test.findMany = vi.fn().mockResolvedValue([
      {
        id: "testId1",
        userId: "userId1",
        title: "Sample Test",
        description: "This is a sample test",
        imageUrl: "https://example.com/image.jpg",
        visibility: "public",
        keywords: [{ id: "keyword1", name: "keyword1" }],
        createdAt: new Date("2021-01-01"),
        updatedAt: new Date("2021-01-02"),
        collections: [
          {
            collection: {
              id: "collectionId1",
              title: "Sample Collection",
              imageUrl: "https://example.com/collection.jpg",
            },
          },
        ],
        plays: [{ player: { userId: "playerId1", username: "player1" } }],
      },
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const caller = testFilterRouter.createCaller(ctx);

  it("should handle getAll query for user tests", async () => {
    const input = { testType: "user", sortBy: "newest" } as const;
    const result = await caller.getAll(input);
    expect(result).toHaveLength(1);
    const test = result[0];
    expect(test).toHaveProperty("id", "testId1");
  });

  it("should handle getAll query for favorite tests", async () => {
    const input = { testType: "favorite", sortBy: "newest" } as const;
    const result = await caller.getAll(input);
    expect(result).toHaveLength(1);
    const test = result[0];
    expect(test).toHaveProperty("id", "testId1");
  });

  it("should handle getByUserId query", async () => {
    const input = {
      userId: "someUserId",
      sortBy: "newest",
      testType: "user",
    } as const;
    const result = await caller.getByUserId(input);
    expect(result).toHaveLength(1);
    const test = result[0];
    expect(test).toHaveProperty("id", "testId1");
  });

  describe("getAll query with different orderBy options", () => {
    const inputBase = { testType: "user" } as const;

    it("should handle orderBy newest", async () => {
      const input = { ...inputBase, sortBy: "newest" } as const;
      const result = await caller.getAll(input);

      expect(result).toHaveLength(1);
    });

    it("should handle orderBy oldest", async () => {
      const input = { ...inputBase, sortBy: "oldest" } as const;
      const result = await caller.getAll(input);

      expect(result).toHaveLength(1);
    });

    it("should handle orderBy alphabetical", async () => {
      const input = { ...inputBase, sortBy: "alphabetical" } as const;
      const result = await caller.getAll(input);

      expect(result).toHaveLength(1);
    });
  });

  describe("getByUserId query with different orderBy options", () => {
    const inputBase = { userId: "someUserId", testType: "user" } as const;

    it("should handle orderBy newest", async () => {
      const input = { ...inputBase, sortBy: "newest" } as const;
      const result = await caller.getByUserId(input);

      expect(result).toHaveLength(1);
    });

    it("should handle orderBy oldest", async () => {
      const input = { ...inputBase, sortBy: "oldest" } as const;
      const result = await caller.getByUserId(input);

      expect(result).toHaveLength(1);
    });

    it("should handle orderBy alphabetical", async () => {
      const input = { ...inputBase, sortBy: "alphabetical" } as const;
      const result = await caller.getByUserId(input);

      expect(result).toHaveLength(1);
    });
  });
});

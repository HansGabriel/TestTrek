import { mockCtx, MockCtxType } from "./mockCtx";
import { testRouter } from "../test";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("testRouter - queries", () => {
  const ctx: MockCtxType = mockCtx;

  const fixedDate = new Date("2022-10-17");

  const mockData = {
    id: "testId1",
    title: "Sample Test Title",
    description: "Sample Test Description",
    imageUrl: "path/to/image.jpg",
    keywords: [
      {
        id: "keywordId1",
        name: "Sample Keyword",
      },
    ],
    questions: [
      {
        answer: "Sample Answer",
        choices: [
          {
            id: "choiceId1",
            isCorrect: true,
            text: "Sample Choice",
          },
        ],
        id: "questionId1",
        image: "path/to/question/image.jpg",
        points: 10,
        possibleAnswers: ["Answer1", "Answer2"],
        time: 100,
        title: "Sample Question Title",
        type: "multiple_choice",
      },
    ],
    collections: [
      {
        collection: {
          id: "collectionId1",
          userId: "userId1",
          title: "Sample Collection",
          imageUrl: "path/to/collection/image.jpg",
          createdAt: fixedDate,
          updatedAt: fixedDate,
          visibility: "public",
          tests: [],
        },
      },
    ],
    visibility: "public",
    user: {
      imageUrl: "path/to/user/image.jpg",
      firstName: "John",
      lastName: "Doe",
    },
    createdAt: fixedDate,
    updatedAt: fixedDate,
  };

  const mockData2 = {
    ...mockData,
    id: "testId2",
    title: "Sample Test Title 2",
  };

  beforeEach(async () => {
    ctx.prisma.test.findMany = vi.fn().mockResolvedValue([mockData, mockData2]);

    ctx.prisma.test.findUnique = vi.fn().mockResolvedValue(mockData);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const caller = testRouter.createCaller(ctx);

  it("should fetch all tests with the specified fields", async () => {
    const result = await caller.getAll();
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty("id", "testId1");
    expect(result[1]).toHaveProperty("title", "Sample Test Title 2");
  });

  describe("testRouter - getDiscoverTests", () => {
    it("should fetch the specified number of tests", async () => {
      const input = { amountOfTests: 5 };
      const result = await caller.getDiscoverTests(input);
      expect(result.length).toBeLessThanOrEqual(input.amountOfTests);
      expect(result[0]).toHaveProperty("id", "testId1");
      expect(result[1]).toHaveProperty("title", "Sample Test Title 2");
      if (result[0]) {
        if (result[0].user) {
          expect(result[0].user).toHaveProperty("lastName", "Doe");
        }
      }
    });

    it("should fetch all tests if amountOfTests is not provided", async () => {
      const result = await caller.getDiscoverTests({});
      expect(result.length).toBe(2);
      expect(result[0]).toHaveProperty("id", "testId1");
      expect(result[1]).toHaveProperty("id", "testId2");
    });
  });

  describe("testRouter - getTrendingTests", () => {
    it("should fetch the specified number of trending tests", async () => {
      const input = { amountOfTests: 5 };
      const result = await caller.getTrendingTests(input);
      expect(result.length).toBeLessThanOrEqual(input.amountOfTests);
      expect(result[0]).toHaveProperty("id", "testId1");
      expect(result[1]).toHaveProperty("title", "Sample Test Title 2");
      if (result[0]) {
        if (result[0].user) {
          expect(result[0].user).toHaveProperty("lastName", "Doe");
        }
      }
    });

    it("should fetch all trending tests if amountOfTests is not provided", async () => {
      const result = await caller.getTrendingTests({});
      expect(result.length).toBe(2);
      expect(result[0]).toHaveProperty("id", "testId1");
    });
  });

  describe("testRouter - getTopPicks", () => {
    it("should fetch the specified number of top picked tests", async () => {
      const input = { amountOfTests: 5 };
      const result = await caller.getTopPicks(input);
      expect(result.length).toBeLessThanOrEqual(input.amountOfTests);
      expect(result[0]).toHaveProperty("id", "testId1");
      expect(result[1]).toHaveProperty("title", "Sample Test Title 2");
      if (result[0]) {
        if (result[0].user) {
          expect(result[0].user).toHaveProperty("lastName", "Doe");
        }
      }
    });

    it("should fetch all top picked tests if amountOfTests is not provided", async () => {
      const result = await caller.getTopPicks({});
      expect(result.length).toBe(2);
      expect(result[0]).toHaveProperty("id", "testId1");
      expect(result[1]).toHaveProperty("id", "testId2");
    });
  });

  describe("testRouter - getDetails", () => {
    beforeEach(async () => {
      ctx.prisma.test.findUnique = vi.fn().mockResolvedValue({
        user: {
          userId: "sampleUserId",
        },
      });

      ctx.prisma.question.count = vi.fn().mockResolvedValue(10);
      ctx.prisma.play.count = vi.fn().mockResolvedValue(100);
      ctx.prisma.userOnFavoriteTest.count = vi.fn().mockResolvedValue(50);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should return details for a test owned by the user", async () => {
      ctx.auth.userId = "sampleUserId";

      const input = { testId: "testId123" };
      const result = await caller.getDetails(input);

      expect(result).toEqual({
        isOwner: true,
        totalQuestions: 10,
        totalPlays: 100,
        totalFavorites: 50,
        notOwner: "sampleUserId",
      });
    });

    it("should return details for a test not owned by the user", async () => {
      ctx.auth.userId = "anotherUserId";

      const input = { testId: "testId123" };
      const result = await caller.getDetails(input);

      expect(result).toEqual({
        isOwner: false,
        totalQuestions: 10,
        totalPlays: 100,
        totalFavorites: 50,
        notOwner: "sampleUserId",
      });
    });
  });

  describe("testRouter - getScoreboard", () => {
    beforeEach(async () => {
      ctx.prisma.$queryRaw = vi.fn().mockResolvedValue([
        {
          firstName: "John",
          imageUrl: "img1.jpg",
          id: "playerId1",
          createdAt: new Date("2023-01-10T10:00:00Z"),
          highScore: 95,
        },
        {
          firstName: "Doe",
          imageUrl: "img2.jpg",
          id: "playerId2",
          createdAt: new Date("2023-01-05T10:00:00Z"),
          highScore: 89,
        },
        {
          firstName: "Alice",
          imageUrl: "img3.jpg",
          id: "playerId3",
          createdAt: new Date("2023-01-08T10:00:00Z"),
          highScore: 92,
        },
      ]);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    const caller = testRouter.createCaller(ctx);

    it("should return a sorted list of players based on high scores", async () => {
      const input = { testId: "testId123" };
      const result = await caller.getScoreboard(input);

      expect(result).toEqual([
        {
          firstName: "John",
          imageUrl: "img1.jpg",
          id: "playerId1",
          createdAt: new Date("2023-01-10T10:00:00Z"),
          highScore: 95,
        },
        {
          firstName: "Alice",
          imageUrl: "img3.jpg",
          id: "playerId3",
          createdAt: new Date("2023-01-08T10:00:00Z"),
          highScore: 92,
        },
        {
          firstName: "Doe",
          imageUrl: "img2.jpg",
          id: "playerId2",
          createdAt: new Date("2023-01-05T10:00:00Z"),
          highScore: 89,
        },
      ]);
    });

    it("should correctly handle an empty scoreboard", async () => {
      ctx.prisma.$queryRaw = vi.fn().mockResolvedValue([]);

      const input = { testId: "testId123" };
      const result = await caller.getScoreboard(input);

      expect(result).toEqual([]);
    });
  });

  describe("testRouter - getIsFavorite", () => {
    const testId = "testId123";

    beforeEach(async () => {
      ctx.prisma.test.findUnique = vi.fn().mockResolvedValue(null);
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    const caller = testRouter.createCaller(ctx);

    it("should return false if test is not favorited by user", async () => {
      const input = { testId };
      const result = await caller.getIsFavorite(input);
      expect(result).toBe(false);
    });

    it("should return true if test is favorited by user", async () => {
      ctx.prisma.test.findUnique = vi.fn().mockResolvedValue({
        favoritedUsers: [
          {
            userId: ctx.auth.userId,
          },
        ],
      });

      const input = { testId };
      const result = await caller.getIsFavorite(input);
      expect(result).toBe(true);
    });

    it("should return false if multiple users favorited the test but not the auth user", async () => {
      ctx.prisma.test.findUnique = vi.fn().mockResolvedValue({
        favoritedUsers: [
          { userId: "anotherUserId" },
          { userId: "yetAnotherUserId" },
        ],
      });

      const input = { testId };
      const result = await caller.getIsFavorite(input);
      expect(result).toBe(false);
    });

    it("should return false if no users favorited the test", async () => {
      ctx.prisma.test.findUnique = vi.fn().mockResolvedValue({
        favoritedUsers: [],
      });

      const input = { testId };
      const result = await caller.getIsFavorite(input);
      expect(result).toBe(false);
    });
  });
});

import { mockCtx, mockCtxType } from "./mockCtx";
import { useRouter } from "../user";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("useRouter", () => {
  const ctx: mockCtxType = mockCtx;

  beforeEach(async () => {
    ctx.prisma.user.findMany = vi.fn().mockResolvedValue([
      {
        id: "userId1",
        userId: "user1",
        imageUrl: "image1.jpg",
        firstName: "John",
        lastName: "Doe",
      },
      {
        id: "userId2",
        userId: "user2",
        imageUrl: "image2.jpg",
        firstName: "Jane",
        lastName: "Doe",
      },
    ]);

    ctx.prisma.user.findUnique = vi.fn().mockResolvedValue({
      id: "userId1",
      userId: "user1",
      imageUrl: "image1.jpg",
      firstName: "John",
      lastName: "Doe",
    });

    ctx.prisma.user.findFirst = vi.fn().mockResolvedValue({
      id: "userId1",
      userId: "user1",
      imageUrl: "image1.jpg",
      firstName: "John",
      lastName: "Doe",
    });

    ctx.prisma.play.aggregate = vi.fn().mockResolvedValue({
      _count: { playerId: 5 },
      _sum: { score: 500 },
    });

    ctx.prisma.play.findMany = vi.fn().mockResolvedValue([
      {
        id: "playId1",
        testId: "testId1",
        playerId: "playerId1",
        isFinished: true,
        score: 100,
        time: 120,
      },
    ]);

    ctx.prisma.test.aggregate = vi.fn().mockResolvedValue({
      _count: { userId: 3 },
    });

    ctx.prisma.user.update = vi.fn().mockResolvedValue({
      id: "userId1",
      username: "newUsername",
      firstName: "NewFirstName",
      lastName: "NewLastName",
      email: "new@example.com",
      about: "New about text",
    });

    ctx.prisma.$queryRaw = vi.fn().mockResolvedValue([
      {
        id: "playerId1",
        highScore: 100,
      },
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const caller = useRouter.createCaller(ctx);

  it("should handle getTop query", async () => {
    const input = { amountOfUsers: 2 };
    const result = await caller.getTop(input);
    expect(result).toHaveLength(2);
    expect(ctx.prisma.user.findMany).toHaveBeenCalledWith({
      take: input.amountOfUsers,
      select: {
        id: true,
        userId: true,
        imageUrl: true,
        firstName: true,
        lastName: true,
      },
    });
  });

  it("should handle getUserById query", async () => {
    const input = { userId: "user1" };
    const result = await caller.getUserById(input);
    expect(result).toHaveProperty("userId", input.userId);
    expect(ctx.prisma.user.findUnique).toHaveBeenCalledWith({
      where: { userId: input.userId },
    });
  });

  it("should handle editUserDetails mutation", async () => {
    const input = {
      userName: "newUsername",
      firstName: "NewFirstName",
      lastName: "NewLastName",
      email: "new@example.com",
      about: "New about text",
    };
    const result = await caller.editUserDetails(input);
    expect(result).toHaveProperty("username", input.userName);
    expect(ctx.prisma.user.update).toHaveBeenCalledWith({
      where: { userId: ctx.auth.userId },
      data: {
        username: input.userName,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        about: input.about,
      },
    });
  });

  it("should handle getUserDetails query", async () => {
    const result = await caller.getUserDetails();
    expect(result).toHaveProperty("id", "userId1");
    expect(ctx.prisma.user.findFirst).toHaveBeenCalledWith({
      where: { userId: ctx.auth.userId },
    });
  });

  it("should handle getPlaysByUserId query", async () => {
    const input = { userId: "user1" };
    const result = await caller.getPlaysByUserId(input);
    expect(result._count.playerId).toBe(5);
    expect(ctx.prisma.play.aggregate).toHaveBeenCalledWith({
      _count: { playerId: true },
      where: { playerId: input.userId },
    });
  });

  it("should handle getUserPlays query", async () => {
    const result = await caller.getUserPlays();
    expect(result._count.playerId).toBe(5);
    expect(ctx.prisma.play.aggregate).toHaveBeenCalledWith({
      _count: { playerId: true },
      where: { playerId: ctx.auth.userId, isFinished: true },
    });
  });

  it("should handle getTimesUserOnTop query", async () => {
    const result = await caller.getTimesUserOnTop();
    expect(result).toBe(0);
    expect(ctx.prisma.play.findMany).toHaveBeenCalledWith({
      where: { playerId: ctx.auth.userId },
    });
    //Might want to add more expectations based on $queryRaw and pMap logic
  });

  it("should handle getTotalScore query", async () => {
    const result = await caller.getTotalScore();
    expect(result._sum.score).toBe(500);
    expect(ctx.prisma.play.aggregate).toHaveBeenCalledWith({
      _sum: { score: true },
      where: { playerId: ctx.auth.userId },
    });
  });

  it("should handle getTotalTests query", async () => {
    const result = await caller.getTotalTests();
    expect(result._count.userId).toBe(3);
    expect(ctx.prisma.test.aggregate).toHaveBeenCalledWith({
      _count: { userId: true },
      where: { userId: ctx.auth.userId },
    });
  });

  it("should handle getUserWeeklyAndDailyScores query", async () => {
    const result = await caller.getUserWeeklyAndDailyScores();
    expect(result.weeklyScore).toBe(500);
    expect(result.dailyScores).toEqual([500, 500, 500, 500, 500, 500, 500]);
    //Might want to add more expectations based on aggregate and map logic
  });
});
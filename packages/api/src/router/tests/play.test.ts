import { PrismaClient, Prisma } from "@acme/db";
import { SignedInAuthObject, SignedOutAuthObject } from "@clerk/backend";
import { createContextInner } from "../../context";
import { mockCtx } from "./mockCtx";
import { playRouter } from "../play";
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("playRouter", () => {
  let ctx: {
    auth: SignedInAuthObject | SignedOutAuthObject;
    prisma: PrismaClient<
      Prisma.PrismaClientOptions,
      never,
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >;
  };

  beforeEach(async () => {
    ctx = mockCtx;
    ctx.prisma.play.findFirst = vi.fn().mockResolvedValue({
      test: {
        id: "testId1",
        questions: [
          {
            id: "questionId1",
            title: "Sample Question",
            choices: [
              {
                id: "choiceId1",
                text: "Sample Choice",
                isCorrect: true,
              },
            ],
          },
        ],
      },
    });

    ctx.prisma.play.update = vi.fn().mockResolvedValue({
      id: "somePlayId",
      score: 100,
      time: 120,
      isFinished: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should handle getTest query", async () => {
    const caller = playRouter.createCaller(ctx);
    const input = { testId: "testId1" };
    const result = await caller.getTest(input);
    expect(result).toHaveProperty("test");
    expect(ctx.prisma.play.findFirst).toHaveBeenCalledWith({
      where: { testId: input.testId },
      select: {
        test: {
          include: {
            questions: {
              include: {
                choices: true,
              },
            },
          },
        },
      },
    });
  });

  it("should handle finishTest mutation", async () => {
    const caller = playRouter.createCaller(ctx);
    const input = { playId: "somePlayId", score: 100, time: 120 };
    const result = await caller.finishTest(input);
    expect(result).toHaveProperty("score", 100);
    expect(result).toHaveProperty("time", 120);
    expect(ctx.prisma.play.update).toHaveBeenCalledWith({
      where: { id: input.playId },
      data: {
        score: input.score,
        time: input.time,
        isFinished: true,
      },
    });
  });
});

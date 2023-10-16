import { mockCtx, MockCtxType } from "./mockCtx";
import { testRouter } from "../test";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("testRouter - edit mutation", () => {
  const ctx: MockCtxType = mockCtx;

  beforeEach(() => {
    ctx.prisma.test.update = vi.fn().mockResolvedValue({});
    ctx.prisma.question.create = vi.fn().mockResolvedValue(Promise.resolve({}));
    ctx.prisma.question.deleteMany = vi.fn().mockResolvedValue({ count: 0 });
    ctx.prisma.$transaction = vi.fn().mockResolvedValue([]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const caller = testRouter.createCaller(ctx);

  it("should handle edit mutation correctly", async () => {
    const input = {
      testId: "sampleTestId",
      title: "Sample Test",
      collection: "sampleCollectionId",
      description: "Sample Description",
      image: "sampleImageUrl",
      keywords: ["keyword1", "keyword2"],
      visibility: "public" as "public" | "private",
      questions: Array(5).fill({
        title: "Sample Question 1",
        points: 5,
        time: 60,
        type: "multiple_choice" as "multiple_choice",
        image: "sampleQuestionImage",
        choices: [
          {
            isCorrect: true,
            text: "Sample Choice 1",
          },
          {
            isCorrect: false,
            text: "Sample Choice 2",
          },
        ],
      }),
    };

    const result = await caller.edit(input);

    expect(ctx.prisma.test.update).toHaveBeenCalledTimes(2);

    expect(ctx.prisma.question.deleteMany).toHaveBeenCalledWith({
      where: {
        testId: input.testId,
      },
    });
    expect(ctx.prisma.question.create).toHaveBeenCalledTimes(
      input.questions.length,
    );
  });
});

describe("testRouter - play mutation", () => {
  const ctx: MockCtxType = mockCtx;

  beforeEach(() => {
    ctx.prisma.play.create = vi.fn().mockResolvedValue({ id: "samplePlayId" });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const caller = testRouter.createCaller(ctx);

  it("should handle play mutation correctly", async () => {
    const input = {
      testId: "sampleTestId",
    };

    const result = await caller.play(input);

    expect(result.id).toBe("samplePlayId");
    expect(ctx.prisma.play.create).toHaveBeenCalledWith({
      data: {
        player: {
          connect: {
            userId: ctx.auth.userId,
          },
        },
        test: {
          connect: {
            id: input.testId,
          },
        },
      },
    });
  });
});

describe("testRouter - play mutation", () => {
  const ctx: MockCtxType = mockCtx;

  beforeEach(() => {
    ctx.prisma.play.create = vi.fn().mockResolvedValue({ id: "samplePlayId" });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const caller = testRouter.createCaller(ctx);

  it("should handle play mutation correctly", async () => {
    const input = {
      testId: "sampleTestId",
    };

    const result = await caller.play(input);

    expect(result.id).toBe("samplePlayId");
    expect(ctx.prisma.play.create).toHaveBeenCalledWith({
      data: {
        player: {
          connect: {
            userId: ctx.auth.userId,
          },
        },
        test: {
          connect: {
            id: input.testId,
          },
        },
      },
    });
  });
});

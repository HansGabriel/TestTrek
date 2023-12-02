import { mockCtx, MockCtxType } from "./mockCtx";
import { testRouter } from "../test";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("testRouter", () => {
  const ctx: MockCtxType = mockCtx;

  beforeEach(() => {
    ctx.prisma.test.create = vi.fn().mockResolvedValue({
      id: "mockTestId",
      title: "Mock Test",
      description: "Sample Description",
      imageUrl: "sampleImageURL",
      visibility: "public",
      user: {
        connect: {
          userId: "mockUserId",
        },
      },
      keywords: {
        createMany: {
          data: [{ name: "sample1" }, { name: "sample2" }],
        },
      },
    });

    ctx.prisma.question.create = vi.fn().mockResolvedValue({
      id: "mockQuestionId",
      title: "Mock Question",
      points: 10,
      time: 60,
      type: "multiple_choice",
      test: {
        connect: {
          id: "mockTestId",
        },
      },
      choices: {
        createMany: {
          data: [
            { text: "Choice 1", isCorrect: false },
            { text: "Choice 2", isCorrect: true },
          ],
        },
      },
    });

    ctx.prisma.$transaction = vi.fn().mockResolvedValue([]);

    ctx.prisma.test.findUnique = vi.fn().mockResolvedValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const caller = testRouter.createCaller(ctx);

  it("should create a new test with associated details", async () => {
    const input = {
      title: "Sample Test",
      collection: "sampleCollectionId",
      description: "Sample Description",
      image: "sampleImageURL",
      keywords: ["sample1", "sample2"],
      visibility: "public" as "public" | "private",
      questions: [
        {
          title: "MCQ Question",
          points: 10,
          time: 30,
          type: "multiple_choice" as "multiple_choice",
          choices: [
            { text: "Choice 1", isCorrect: false },
            { text: "Choice 2", isCorrect: true },
          ],
        },
        {
          title: "True or False Question",
          points: 5,
          time: 20,
          type: "true_or_false" as "true_or_false",
          choices: [
            { text: "True", isCorrect: true },
            { text: "False", isCorrect: false },
          ],
        },
        {
          title: "True or False Question",
          points: 5,
          time: 20,
          type: "true_or_false" as "true_or_false",
          choices: [
            { text: "True", isCorrect: true },
            { text: "False", isCorrect: false },
          ],
        },
        {
          title: "True or False Question",
          points: 5,
          time: 20,
          type: "true_or_false" as "true_or_false",
          choices: [
            { text: "True", isCorrect: true },
            { text: "False", isCorrect: false },
          ],
        },
        {
          title: "True or False Question",
          points: 5,
          time: 20,
          type: "true_or_false" as "true_or_false",
          choices: [
            { text: "True", isCorrect: true },
            { text: "False", isCorrect: false },
          ],
        },
        {
          title: "True or False Question",
          points: 5,
          time: 20,
          type: "true_or_false" as "true_or_false",
          choices: [
            { text: "True", isCorrect: true },
            { text: "False", isCorrect: false },
          ],
        },
      ],
    };

    const result = await caller.create(input);
    expect(result).toHaveProperty("id", "mockTestId");

    expect(ctx.prisma.test.create).toHaveBeenCalled();
    expect(ctx.prisma.$transaction).toHaveBeenCalled();
  });

  it("should correctly handle multiple_choice type questions", async () => {
    const input = {
      image: "path/to/image.jpg",
      title: "Sample Test",
      description: "Description of the test",
      visibility: "public" as "public" | "private",
      keywords: ["sample", "test"],
      questions: Array(5).fill({
        title: "MCQ Question",
        points: 10,
        time: 30,
        type: "multiple_choice" as "multiple_choice",
        choices: [
          { text: "Choice 1", isCorrect: false },
          { text: "Choice 2", isCorrect: true },
          { text: "Choice 3", isCorrect: false },
          { text: "Choice 4", isCorrect: false },
        ],
      }),
    };

    const result = await caller.create(input);
    expect(ctx.prisma.test.create).toHaveBeenCalled();
  });

  it("should correctly handle true_or_false type questions", async () => {
    const input = {
      image: "path/to/image.jpg",
      title: "Sample Test",
      description: "Description of the test",
      visibility: "public" as "public" | "private",
      keywords: ["sample", "test"],
      questions: Array(5).fill({
        title: "True or False Question",
        points: 5,
        time: 20,
        type: "true_or_false" as "true_or_false",
        choices: [
          { text: "True", isCorrect: true },
          { text: "False", isCorrect: false },
        ],
      }),
    };

    await caller.create(input);
    expect(ctx.prisma.question.create).toHaveBeenCalled();
  });

  it("should correctly handle multi_select type questions", async () => {
    const input = {
      image: "path/to/image.jpg",
      title: "Sample Test",
      description: "Description of the test",
      visibility: "public" as "public" | "private",
      keywords: ["sample", "test"],
      questions: Array(5).fill({
        title: "Multi Select Question",
        points: 10,
        time: 25,
        type: "multi_select" as "multi_select",
        choices: [
          { text: "Option 1", isCorrect: true },
          { text: "Option 2", isCorrect: false },
          { text: "Option 3", isCorrect: true },
        ],
      }),
    };

    await caller.create(input);
    expect(ctx.prisma.question.create).toHaveBeenCalled();
  });

  it("should correctly handle identification type questions", async () => {
    const input = {
      image: "path/to/image.jpg",
      title: "Sample Test",
      description: "Description of the test",
      visibility: "public" as "public" | "private",
      keywords: ["sample", "test"],
      questions: Array(5).fill({
        title: "Identification Question",
        points: 10,
        time: 30,
        type: "identification" as "identification",
        choices: [{ text: "Option 1", isCorrect: true }],
      }),
    };

    await caller.create(input);
    expect(ctx.prisma.question.create).toHaveBeenCalled();
  });
});

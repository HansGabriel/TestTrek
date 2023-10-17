import { reviewerRouter } from "../reviewer";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockCtx, MockCtxType } from "./mockCtx";

const mockReviewerData = {
  id: "reviewerId1",
  title: "Sample Review",
  imageUrl: "sampleImage.jpg",
  content: "Sample content",
  visibility: "public",
  userId: mockCtx.auth.userId,
  createdAt: new Date("2022-11-11"),
  updatedAt: new Date("2022-11-11"),
};

describe("reviewerRouter", () => {
  const ctx: MockCtxType = mockCtx;

  beforeEach(async () => {
    ctx.prisma.reviewer.findMany = vi
      .fn()
      .mockResolvedValue([mockReviewerData]);
    ctx.prisma.reviewer.findUnique = vi
      .fn()
      .mockResolvedValue(mockReviewerData);
    ctx.prisma.reviewer.create = vi.fn().mockResolvedValue(mockReviewerData);
    ctx.prisma.reviewer.update = vi.fn().mockResolvedValue(mockReviewerData);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const caller = reviewerRouter.createCaller(ctx);

  it("should handle getAllReviewers query", async () => {
    const input = { reviewerType: "user", sortBy: "newest" } as const;
    const result = await caller.getAllReviewers(input);
    expect(result).toEqual([mockReviewerData]);
    expect(ctx.prisma.reviewer.findMany).toHaveBeenCalledWith({
      where: { userId: ctx.auth.userId },
      orderBy: { createdAt: "desc" },
      select: expect.any(Object),
    });
  });

  it("should handle getReviewerById query", async () => {
    const input = { reviewerId: "reviewerId1" };
    const result = await caller.getReviewerById(input);
    expect(result).toEqual(mockReviewerData);
    expect(ctx.prisma.reviewer.findUnique).toHaveBeenCalledWith({
      where: { id: input.reviewerId },
      select: expect.any(Object),
    });
  });

  it("should handle createReviewer mutation", async () => {
    const input = {
      title: "Test Title",
      imageUrl: "testImageUrl",
      content: "Test Content",
      visibility: "public",
    } as const;
    const result = await caller.createReviewer(input);
    expect(result).toEqual(mockReviewerData);
    expect(ctx.prisma.reviewer.create).toHaveBeenCalledWith({
      data: { ...input, userId: ctx.auth.userId },
    });
  });

  it("should handle updateReviewer mutation", async () => {
    const input = {
      reviewerId: "reviewerId1",
      title: "Updated Title",
      imageUrl: "updatedImageUrl",
      content: "Updated Content",
      visibility: "private",
    } as const;
    const result = await caller.updateReviewer(input);
    expect(result).toEqual(mockReviewerData);
    expect(ctx.prisma.reviewer.update).toHaveBeenCalledWith({
      where: { id: input.reviewerId },
      data: {
        title: input.title,
        imageUrl: input.imageUrl,
        content: input.content,
        visibility: input.visibility,
      },
    });
  });
});

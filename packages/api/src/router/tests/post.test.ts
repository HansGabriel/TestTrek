import { postRouter } from "../post";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockCtx, MockCtxType } from "./mockCtx";

const mockPostData = {
  id: "postId1",
  title: "Sample Post",
  content: "Sample content",
  createdAt: new Date("2022-11-11"),
  updatedAt: new Date("2022-11-11"),
};

describe("postRouter", () => {
  const ctx: MockCtxType = mockCtx;

  beforeEach(() => {
    ctx.prisma.post.findMany = vi.fn().mockResolvedValue([mockPostData]);
    ctx.prisma.post.findFirst = vi.fn().mockResolvedValue(mockPostData);
    ctx.prisma.post.create = vi.fn().mockResolvedValue(mockPostData);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const caller = postRouter.createCaller(ctx);

  it("should handle all query for posts", async () => {
    const result = await caller.all();
    expect(result).toEqual([mockPostData]);
    expect(ctx.prisma.post.findMany).toHaveBeenCalledWith();
  });

  it("should handle byId query for a specific post", async () => {
    const input = "postId1";
    const result = await caller.byId(input);
    expect(result).toEqual(mockPostData);
    expect(ctx.prisma.post.findFirst).toHaveBeenCalledWith({
      where: { id: input },
    });
  });

  it("should handle create mutation for creating a new post", async () => {
    const input = {
      title: "New Post",
      content: "New post content",
    };
    const result = await caller.create(input);
    expect(result).toEqual(mockPostData);
    expect(ctx.prisma.post.create).toHaveBeenCalledWith({
      data: input,
    });
  });
});

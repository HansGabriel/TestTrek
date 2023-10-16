import { authRouter } from "../auth";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MockCtxType, mockCtx } from "./mockCtx";

describe("authRouter", () => {
  const ctx: MockCtxType = mockCtx;

  beforeEach(async () => {});

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const caller = authRouter.createCaller(ctx);

  describe("getSession query", () => {
    it("should handle undefined", async () => {
      ctx.auth.session = undefined;
      const result = await caller.getSession();
      expect(result).toEqual(undefined);
    });
  });

  describe("getSecretMessage query", () => {
    it("should handle getSecretMessage query for protected secret message", async () => {
      const result = await caller.getSecretMessage();
      expect(result).toEqual("you can see this secret message!");
    });
  });
});

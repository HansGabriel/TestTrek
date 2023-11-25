import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const authRouter = router({
  getSecretMessage: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/auth/secret",
      },
    })
    .input(z.void())
    .output(z.any())
    .query(() => {
      return "you can see this secret message!";
    }),
});

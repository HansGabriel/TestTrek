import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { testRouter } from "./test";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  test: testRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { testRouter } from "./test";
import { testFilterRouter } from "./testFilter";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  test: testRouter,
  testFilter: testFilterRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

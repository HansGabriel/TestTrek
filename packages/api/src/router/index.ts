import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { testRouter } from "./test";
import { testFilterRouter } from "./testFilter";
import { collectionsRouter } from "./collection";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  test: testRouter,
  testFilter: testFilterRouter,
  collections: collectionsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

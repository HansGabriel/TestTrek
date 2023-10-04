import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { testRouter } from "./test";
import { testFilterRouter } from "./testFilter";
import { collectionRouter } from "./collection";
import { imageRouter } from "./image";
import { useRouter } from "./user";
import { playRouter } from "./play";
import { gptApiRouter } from "./gptApi";
import { reviewerRouter } from "./reviewer";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  test: testRouter,
  testFilter: testFilterRouter,
  collection: collectionRouter,
  image: imageRouter,
  user: useRouter,
  play: playRouter,
  gptApi: gptApiRouter,
  reviewer: reviewerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

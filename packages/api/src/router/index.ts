import { router } from "../trpc";
import { authRouter } from "./auth";
import { testRouter } from "./test";
import { testFilterRouter } from "./testFilter";
import { collectionRouter } from "./collection";
import { imageRouter } from "./image";
import { useRouter } from "./user";
import { playRouter } from "./play";
import { gptApiRouter } from "./gptApi";
import { reviewerRouter } from "./reviewer";
import { algoliaSearch } from "./algoliaSearch";
import { textExtractionRouter } from "./pdfTextExtraction";
import { testHistoryRouter } from "./testHistory";

export const appRouter = router({
  auth: authRouter,
  test: testRouter,
  testFilter: testFilterRouter,
  collection: collectionRouter,
  image: imageRouter,
  user: useRouter,
  play: playRouter,
  gptApi: gptApiRouter,
  reviewer: reviewerRouter,
  algolia: algoliaSearch,
  pdfTextExtraction: textExtractionRouter,
  testHistory: testHistoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

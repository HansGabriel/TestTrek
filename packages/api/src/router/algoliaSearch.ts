import { z } from "zod";
import algoliaSearchClient from "../services/algoliaApiHandlers/algoliaSearchClient";
import { multipleAlgoliaQueriesArraySchema } from "@acme/schema/src/algolia";
import { router, protectedProcedure } from "../trpc";
import {
  compileAlgoliaHits,
  AlgoliaSearchResult,
} from "../functions/algoliaHandlers";

export const algoliaSearch = router({
  algoliaSearch: protectedProcedure
    // .meta({
    //   openapi: {
    //     method: "POST",
    //     path: "/algolia/search",
    //   },
    // })
    .input(multipleAlgoliaQueriesArraySchema)
    .output(z.any())
    .query(async ({ input }) => {
      const client = algoliaSearchClient();
      const { results } = await client.multipleQueries(input);

      const compiledHits = compileAlgoliaHits(results as AlgoliaSearchResult[]);
      console.log("Algolia Results From Router:", compiledHits);
      return compiledHits;
    }),
});

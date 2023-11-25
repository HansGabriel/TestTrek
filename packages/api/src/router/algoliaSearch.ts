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

      const modifiedQueries = input.map((item) => {
        return item.params
          ? { ...item }
          : { indexName: item.indexName, query: item.query };
      });

      console.log("lolol: ", modifiedQueries);
      const { results } = await client.multipleQueries(modifiedQueries);

      const compiledHits = compileAlgoliaHits(results as AlgoliaSearchResult[]);

      console.log("Algolia Results From Router:", compiledHits);
      return compiledHits;
    }),
});

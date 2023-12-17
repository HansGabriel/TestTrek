import { z } from "zod";
import algoliaSearchClient from "../services/algoliaApiHandlers/algoliaSearchClient";
import { algoliaQueries } from "@acme/schema/src/algolia";
import { router, protectedProcedure } from "../trpc";
import {
  compileAlgoliaHits,
  AlgoliaSearchResult,
} from "../functions/algoliaHandlers";

export const algoliaSearch = router({
  algoliaSearch: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/algolia/search",
      },
    })
    .input(algoliaQueries)
    .output(z.any())
    .query(async ({ ctx, input }) => {
      const client = algoliaSearchClient();

      const filterBySignedUser = input.filterBySignedUser
        ? ctx.auth.userId
        : "";

      const modifiedQueries = input.details.map((item) => {
        return {
          indexName: item.indexName,
          query: item.query,
        };
      });

      const { results } = await client.multipleQueries(modifiedQueries);

      const compiledHits = compileAlgoliaHits(
        results as AlgoliaSearchResult[],
        filterBySignedUser,
      );

      return compiledHits;
    }),
});

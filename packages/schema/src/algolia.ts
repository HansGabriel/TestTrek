import { z } from "zod";

const multipleAlgoliaQueriesSchema = z.object({
  indexName: z.string(),
  query: z.string(),
});

const multipleAlgoliaQueriesArraySchema = z.array(multipleAlgoliaQueriesSchema);

export const algoliaQueries = z.object({
  details: multipleAlgoliaQueriesArraySchema,
  filterBySignedUser: z.boolean(),
});

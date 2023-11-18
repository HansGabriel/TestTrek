import { z } from "zod";

const multipleAlgoliaQueriesSchema = z.object({
  indexName: z.string(),
  query: z.string(),
});

export const multipleAlgoliaQueriesArraySchema = z.array(
  multipleAlgoliaQueriesSchema,
);

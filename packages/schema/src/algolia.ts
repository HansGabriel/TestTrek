import { z } from "zod";

const multipleAlgoliaQueriesSchema = z.object({
  indexName: z.string(),
  query: z.string(),
  params: z.object({ filters: z.string().optional() }).optional(),
});

export const multipleAlgoliaQueriesArraySchema = z.array(
  multipleAlgoliaQueriesSchema,
);

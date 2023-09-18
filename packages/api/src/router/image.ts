import { z } from "zod";
import { getImagesByQuery } from "../services/image";
import { router, protectedProcedure } from "../trpc";

import type { StockImages } from "@acme/schema/src/types";

export const imageRouter = router({
  getImagesQuery: protectedProcedure
    .input(
      z.object({
        query: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { query } = input;
      const images = await getImagesByQuery(query);
      const result = images.map((image) => ({
        id: image.id,
        description: image.description,
        assetUrl: image.assets.preview.url,
      })) as StockImages;
      return result;
    }),
});

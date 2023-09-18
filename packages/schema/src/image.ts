import { z } from "zod";

type ImageDetails = {
  id: string;
  description: string;
  assetUrl: string;
};

export const imageSchema = z.object({
  publicId: z.string(),
  secureUrl: z.string(),
});

export const stockImageSchema = z.object({
  id: z.string(),
  description: z.string(),
  assets: z.object({
    preview: z.object({
      url: z.string(),
    }),
  }),
});

export const stockImagesSchema = z
  .array(stockImageSchema)
  .transform((images) => {
    return images.map((image) => ({
      id: image.id,
      description: image.description,
      assetUrl: image.assets.preview.url,
    })) as ImageDetails[];
  });

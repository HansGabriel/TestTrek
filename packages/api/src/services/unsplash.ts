/* eslint-disable @typescript-eslint/no-explicit-any */
import "dotenv/config";
import { StockImages } from "@acme/schema/src/types";

const accessKey = process.env.UNSPLASH_ACCESS_KEY;

export async function getUnsplashImages(
  query: string,
  count = 20,
): Promise<StockImages> {
  let url: string;

  if (query) {
    // If a query is provided, search for photos
    url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query,
    )}&per_page=${count}&client_id=${accessKey}`;
  } else {
    // If no query is provided, get random photos
    url = `https://api.unsplash.com/photos/random?count=${count}&client_id=${accessKey}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  const photos: any[] = query ? data.results : data;

  return photos.map((photo) => ({
    id: photo.id,
    description: photo.description || "No description", // Unsplash photos may not have a description
    assetUrl: photo.urls.full,
  }));
}

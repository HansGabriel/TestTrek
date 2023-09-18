import { ImagesApi, setAccessToken } from "shutterstock-api";
import "dotenv/config";

setAccessToken(process.env.SHUTTERSTOCK_API_TOKEN as string);

export const getImagesByQuery = async (query: string) => {
  const imagesApi = new ImagesApi();
  const imagesResult = await imagesApi.searchImages({
    query,
    image_type: "photo",
    page: 1,
    per_page: 10,
    sort: "popular",
    view: "minimal",
  });

  return imagesResult.data;
};

declare module "shutterstock-api" {
  interface SearchImagesResponse {
    data: {
      id: string;
      description: string;
      assets: {
        preview: {
          url: string;
        };
      };
    }[];
  }
  export function setAccessToken(token: string): void;

  export class ImagesApi {
    searchImages: (queryParams: QueryParams) => Promise<SearchImagesResponse>;
  }
}

type QueryParams = {
  query: string;
  image_type: string;
  page: number;
  per_page: number;
  sort: string;
  view: string;
};

import {
  ReturnedAlgoliaCollections,
  ReturnedAlgoliaReviewers,
  ReturnedAlgoliaTests,
  ReturnedAlgoliaUsers,
} from "../services/algoliaApiHandlers/algoliaTypes/algoliaReturnedTestTypes";

export interface AlgoliaSearchResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hits: any[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: object;
  query: string;
  params: string;
  index: string;
  renderingContent: object;
  processingTimeMS: number;
  processingTimingsMS: object;
}

export interface CompiledAlgoliaHits {
  tests: ReturnedAlgoliaTests[];
  users: ReturnedAlgoliaUsers[];
  collections: ReturnedAlgoliaCollections[];
  reviewers: ReturnedAlgoliaReviewers[];
}

export const compileAlgoliaHits = (
  results: AlgoliaSearchResult[],
): CompiledAlgoliaHits => {
  const compiledHits: CompiledAlgoliaHits = {
    tests: [],
    users: [],
    collections: [],
    reviewers: [],
  };

  results.forEach((result) => {
    const hitsWithIndex = result.hits.map(({ objectID, ...rest }) => ({
      ...rest,
      id: objectID,
      index: result.index,
    }));

    switch (result.index) {
      case "tests":
        compiledHits.tests.push(...(hitsWithIndex as ReturnedAlgoliaTests[]));
        break;
      case "users":
        compiledHits.users.push(...(hitsWithIndex as ReturnedAlgoliaUsers[]));
        break;
      case "collections":
        compiledHits.collections.push(
          ...(hitsWithIndex as ReturnedAlgoliaCollections[]),
        );
        break;
      case "reviewers":
        compiledHits.reviewers.push(
          ...(hitsWithIndex as ReturnedAlgoliaReviewers[]),
        );
        break;
    }
  });

  return compiledHits;
};

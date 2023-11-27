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
  signedUserIdFilter = "",
): CompiledAlgoliaHits => {
  const compiledHits: CompiledAlgoliaHits = {
    tests: [],
    users: [],
    collections: [],
    reviewers: [],
  };

  results.forEach((result) => {
    result.hits.forEach((hit) => {
      const { objectID, ...rest } = hit;
      const hitWithIndex = { ...rest, id: objectID, index: result.index };

      if (
        (hit.visibility === "private" &&
          hit.user?.userId !== signedUserIdFilter) ||
        (signedUserIdFilter !== "" && hit.user?.userId !== signedUserIdFilter)
      ) {
        return;
      }

      switch (result.index) {
        case "tests":
          compiledHits.tests.push(hitWithIndex as ReturnedAlgoliaTests);
          break;
        case "users":
          compiledHits.users.push(hitWithIndex as ReturnedAlgoliaUsers);
          break;
        case "collections":
          compiledHits.collections.push(
            hitWithIndex as ReturnedAlgoliaCollections,
          );
          break;
        case "reviewers":
          compiledHits.reviewers.push(hitWithIndex as ReturnedAlgoliaReviewers);
          break;
      }
    });
  });

  return compiledHits;
};

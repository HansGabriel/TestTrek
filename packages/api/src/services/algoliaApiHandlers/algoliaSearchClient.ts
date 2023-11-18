import algoliasearch from "algoliasearch";

const algoliaSearchClient = () => {
  const applicationId = process.env.ALGOLIA_APP_ID;
  const searchKey = process.env.ALGOLIA_SEARCH_KEY;

  if (!applicationId || !searchKey) {
    throw new Error("ALGOLIA_APP_ID and ALGOLIA_SEARCH_KEY are required");
  }

  return algoliasearch(applicationId, searchKey);
};

export default algoliaSearchClient;

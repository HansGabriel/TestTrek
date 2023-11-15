import { TestsForAlgolia } from "./algoliaTypes/algoliaTestsTypes";
import algoliasearch from "algoliasearch";

import "dotenv/config";

const initializeAlgoliaClient = () => {
  const applicationId = process.env.ALGOLIA_APP_ID;
  const adminKey = process.env.ALGOLIA_ADMIN_KEY;

  if (!applicationId || !adminKey) {
    throw new Error("ALGOLIA_APP_ID and ALGOLIA_ADMIN_KEY are required");
  }

  return algoliasearch(applicationId, adminKey);
};

const parseTestsToAlgolia = async (data: Promise<TestsForAlgolia[]>) => {
  const testsAlgoliaRecords = (await data).map(
    ({ id, questions, ...rest }) => ({
      objectID: id,
      questions: questions?.length,
      ...rest,
    }),
  );

  return testsAlgoliaRecords;
};

export const addAllTestsToAlgolia = async (
  queriedTests: Promise<TestsForAlgolia[]>,
) => {
  const data = queriedTests;

  const testsAlgoliaRecords = parseTestsToAlgolia(data);

  const client = initializeAlgoliaClient();
  const testsIndex = client.initIndex("tests");

  testsIndex.saveObjects(await testsAlgoliaRecords).then(({ objectIDs }) => {
    console.log(objectIDs);
    console.log("Tests Succesfully Added to Algolia Index");
  });
};

const parseUsersToAlgolia = async () => {};

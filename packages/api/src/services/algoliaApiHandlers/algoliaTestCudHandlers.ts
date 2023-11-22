import { initializeAlgoliaClient } from "./algoliaApiAddAllHandlers";
import { TestsForAlgolia } from "./algoliaTypes/algoliaTestsTypes";

// Function to add or update a single test
export const updateTestInAlgolia = async (testData: TestsForAlgolia) => {
  const testAlgoliaRecord = {
    objectID: testData.id,
  };

  const client = initializeAlgoliaClient();
  const testsIndex = client.initIndex("tests");

  await testsIndex.saveObject(testAlgoliaRecord);
  console.log(`Test ${testData.id} added/updated in Algolia`);
};

export const deleteTestFromAlgolia = async (testId: string) => {
  const client = initializeAlgoliaClient();
  const testsIndex = client.initIndex("tests");

  await testsIndex.deleteObject(testId);
  console.log(`Test ${testId} deleted from Algolia`);
};

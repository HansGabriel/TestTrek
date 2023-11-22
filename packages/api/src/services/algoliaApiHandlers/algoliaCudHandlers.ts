import { initializeAlgoliaClient } from "./algoliaApiAddAllHandlers";
import {
  TestsForAlgolia,
  CollectionsForAlgolia,
  ReviewersForAlgolia,
} from "./algoliaTypes/algoliaTypes";

// Function to add or update a single test
export const updateTestInAlgolia = async (testData: TestsForAlgolia) => {
  const algoliaObject: Partial<TestsForAlgolia> & { objectID: string } = {
    ...testData,
    objectID: testData.id,
  };

  delete algoliaObject.id;

  const client = initializeAlgoliaClient();
  const index = client.initIndex("tests");

  await index.saveObject(algoliaObject);
  console.log(`Test ${algoliaObject.title} added/updated in Algolia`);
};

export const deleteTestFromAlgolia = async (testId: string) => {
  const client = initializeAlgoliaClient();
  const index = client.initIndex("tests");

  await index.deleteObject(testId);
  console.log(`Test ${testId} deleted from Algolia`);
};

export const updateCollectionInAlgolia = async (
  collectionData: CollectionsForAlgolia,
) => {
  const algoliaObject: Partial<CollectionsForAlgolia> & { objectID: string } = {
    ...collectionData,
    objectID: collectionData.id,
  };

  delete algoliaObject.id;

  const client = initializeAlgoliaClient();
  const index = client.initIndex("collections");

  await index.saveObject(algoliaObject);
  console.log(`Collection ${algoliaObject.title} added/updated in Algolia`);
};

export const deleteCollectionFromAlgolia = async (collectionId: string) => {
  const client = initializeAlgoliaClient();
  const index = client.initIndex("collections");

  await index.deleteObject(collectionId);
  console.log(`Collection ${collectionId} deleted from Algolia`);
};

export const updateReviewerInAlgolia = async (
  reviewerData: ReviewersForAlgolia,
) => {
  const algoliaObject: Partial<ReviewersForAlgolia> & { objectID: string } = {
    ...reviewerData,
    objectID: reviewerData.id,
  };

  delete algoliaObject.id;

  const client = initializeAlgoliaClient();
  const index = client.initIndex("reviewers");

  await index.saveObject(algoliaObject);
  console.log(`Reviewer ${algoliaObject.title} added/updated in Algolia`);
};

export const deleteReviewerFromAlgolia = async (reviewerId: string) => {
  const client = initializeAlgoliaClient();
  const index = client.initIndex("reviewers");

  await index.deleteObject(reviewerId);
  console.log(`Reviewer ${reviewerId} deleted from Algolia`);
};

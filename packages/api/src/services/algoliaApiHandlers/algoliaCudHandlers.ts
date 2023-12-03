import { initializeAlgoliaClient } from "./algoliaApiAddAllHandlers";
import {
  TestsForAlgolia,
  CollectionsForAlgolia,
  ReviewersForAlgolia,
  UsersForAlgolia,
} from "./algoliaTypes/algoliaTypes";

export const updateTestInAlgolia = async (testData: TestsForAlgolia) => {
  const algoliaObject: Partial<TestsForAlgolia> & { objectID: string } = {
    ...testData,
    objectID: testData.id,
  };

  delete algoliaObject.id;

  const client = initializeAlgoliaClient();
  const index = client.initIndex("tests");

  await index.saveObject(algoliaObject);
};

export const deleteTestFromAlgolia = async (testId: string) => {
  const client = initializeAlgoliaClient();
  const index = client.initIndex("tests");

  await index.deleteObject(testId);
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
};

export const deleteCollectionFromAlgolia = async (collectionId: string) => {
  const client = initializeAlgoliaClient();
  const index = client.initIndex("collections");

  await index.deleteObject(collectionId);
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
};

export const deleteReviewerFromAlgolia = async (reviewerId: string) => {
  const client = initializeAlgoliaClient();
  const index = client.initIndex("reviewers");

  await index.deleteObject(reviewerId);
};

export const updateUserInAlgolia = async (userData: UsersForAlgolia) => {
  const algoliaObject: Partial<UsersForAlgolia> & { objectID: string } = {
    ...userData,
    objectID: userData.id,
  };

  delete algoliaObject.id;

  const client = initializeAlgoliaClient();
  const index = client.initIndex("users");

  await index.saveObject(algoliaObject);
};

export const deleteUserFromAlgolia = async (userId: string) => {
  const client = initializeAlgoliaClient();
  const index = client.initIndex("users");

  await index.deleteObject(userId);
};

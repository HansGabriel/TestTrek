import {
  CollectionsForAlgolia,
  ReviewersForAlgolia,
  TestsForAlgolia,
  UsersForAlgolia,
} from "./algoliaTypes/algoliaTypes";
import algoliasearch from "algoliasearch";

import "dotenv/config";

export const initializeAlgoliaClient = () => {
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

  testsIndex.saveObjects(await testsAlgoliaRecords).then(() => {
    console.log("Tests Succesfully Added to Algolia Index");
  });
};

const parseUsersToAlgolia = async (data: Promise<UsersForAlgolia[]>) => {
  const usersAlgoliaRecords = (await data).map(({ id, ...rest }) => ({
    objectID: id,
    ...rest,
  }));

  return usersAlgoliaRecords;
};

export const addAllUsersToAlgolia = async (
  queriedUsers: Promise<UsersForAlgolia[]>,
) => {
  const data = queriedUsers;

  const usersAlgoliaRecords = parseUsersToAlgolia(data);

  const client = initializeAlgoliaClient();
  const usersIndex = client.initIndex("users");

  usersIndex.saveObjects(await usersAlgoliaRecords).then(() => {
    console.log("Users Succesfully Added to Algolia Index");
  });
};

const parseCollectionsToAlgolia = async (
  data: Promise<CollectionsForAlgolia[]>,
) => {
  const collectionsAlgoliaRecords = (await data).map(({ id, ...rest }) => ({
    objectID: id,
    ...rest,
  }));

  return collectionsAlgoliaRecords;
};

export const addAllCollectionsToAlgolia = async (
  queriedCollections: Promise<CollectionsForAlgolia[]>,
) => {
  const data = queriedCollections;

  const collectionsAlgoliaRecords = parseCollectionsToAlgolia(data);

  const client = initializeAlgoliaClient();
  const collectionsIndex = client.initIndex("collections");

  collectionsIndex.saveObjects(await collectionsAlgoliaRecords).then(() => {
    console.log("Collections Succesfully Added to Algolia Index");
  });
};

const parseReviewersToAlgolia = async (
  data: Promise<ReviewersForAlgolia[]>,
) => {
  const reviewersAlgoliaRecords = (await data).map(({ id, ...rest }) => ({
    objectID: id,
    ...rest,
  }));

  return reviewersAlgoliaRecords;
};

export const addAllReviewersToAlgolia = async (
  queriedReviewers: Promise<ReviewersForAlgolia[]>,
) => {
  const data = queriedReviewers;

  const reviewersAlgoliaRecords = parseReviewersToAlgolia(data);

  const client = initializeAlgoliaClient();
  const reviewersIndex = client.initIndex("reviewers");

  reviewersIndex.saveObjects(await reviewersAlgoliaRecords).then(() => {
    console.log("Reviewers Succesfully Added to Algolia Index");
  });
};

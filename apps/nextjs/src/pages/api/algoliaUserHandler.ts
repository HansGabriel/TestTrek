import algoliasearch from "algoliasearch";

export type UsersForAlgolia = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const initializeAlgoliaClient = () => {
  const applicationId = process.env.ALGOLIA_APP_ID;
  const adminKey = process.env.ALGOLIA_ADMIN_KEY;

  if (!applicationId || !adminKey) {
    throw new Error("Expo: ALGOLIA_APP_ID and ALGOLIA_ADMIN_KEY are required");
  }

  return algoliasearch(applicationId, adminKey);
};

export const updateUserInAlgolia = async (userData: UsersForAlgolia) => {
  const client = initializeAlgoliaClient();

  const algoliaObject: Partial<UsersForAlgolia> & { objectID: string } = {
    ...userData,
    objectID: userData.id,
  };

  delete algoliaObject.id;

  const index = client.initIndex("users");

  await index.saveObject(algoliaObject);
};

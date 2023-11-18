type KeywordSelect = {
  name: string;
};

type UserSelect = {
  imageUrl?: string | null;
  firstName: string;
  lastName: string;
};

type QuestionSelect = {
  id: string;
};

export type ReturnedAlgoliaTests = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  keywords: KeywordSelect[];
  questions: QuestionSelect[];
  visibility: "public" | "private";
  user: UserSelect;
  index: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ReturnedAlgoliaUsers = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string | null;
  index: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ReturnedAlgoliaCollections = {
  id: string;
  title: string;
  imageUrl: string | null;
  user: UserSelect;
  index: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ReturnedAlgoliaReviewers = {
  id: string;
  title: string;
  imageUrl: string | null;
  user: UserSelect;
  index: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface CompiledAlgoliaHits {
  tests: ReturnedAlgoliaTests[];
  users: ReturnedAlgoliaUsers[];
  collections: ReturnedAlgoliaCollections[];
  reviewers: ReturnedAlgoliaReviewers[];
}

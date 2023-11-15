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

export type TestsForAlgolia = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  keywords?: KeywordSelect[];
  questions?: QuestionSelect[];
  visibility: "public" | "private";
  user?: UserSelect;
  createdAt: Date;
  updatedAt: Date;
};

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

export type CollectionsForAlgolia = {
  id: string;
  title: string;
  imageUrl: string | null;
  user?: UserSelect;
  createdAt: Date;
  updatedAt: Date;
};

export type ReviewersForAlgolia = {
  id: string;
  title: string;
  imageUrl: string | null;
  user?: UserSelect;
  createdAt: Date;
  updatedAt: Date;
};

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

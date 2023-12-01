export type Keyword = {
  id: string;
  name: string;
};

export type Choice = {
  id: string;
  isCorrect: boolean;
  text: string;
};

export type Question = {
  id: string;
  image?: string | null;
  points: number;
  time: number;
  title: string;
  type: "multiple_choice" | "true_or_false" | "multi_select" | "identification";
  choices: Choice[];
};

export type CustomTest = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  keywords: Keyword[];
  createdAt: Date;
  updatedAt: Date;
  questions: Question[];
};

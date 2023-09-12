export type Choice = {
  id: number;
  text: string | undefined;
  isCorrect: boolean;
  styles: string;
};

export type Option = {
  id: string;
  title: string;
  value: number;
  isSelected: boolean;
};

export type ChoiceStyle = {
  styles: string;
};

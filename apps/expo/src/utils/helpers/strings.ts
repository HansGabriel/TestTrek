import type { QuestionType } from "../../stores/useQuestionStore";

export const mapQuestionType = (type: QuestionType) => {
  switch (type) {
    case "identification":
      return "identification";
    case "multi_select":
      return "multiselect";
    case "true_or_false":
      return "trueOrFalse";
    case "multiple_choice":
      return "multipleChoice";
    default:
      return "multipleChoice";
  }
};

import { create } from "zustand";
import { match } from "ts-pattern";

import type { Question } from "@acme/schema/src/types";
import type { SetOptional } from "type-fest";

type PartialQuestion = SetOptional<Question, "points" | "time"> & {
  inEdit: boolean;
};

type QuestionType = Question["type"];

interface QuestionStore {
  questions: PartialQuestion[];
  selectedIndex: number | undefined;
  addEmptyQuestion: (questionType: QuestionType) => void;
  addQuestion: (question: PartialQuestion) => void;
  getQuestion: (index: number) => PartialQuestion | undefined;
  getSelectedQuestion: () => PartialQuestion | undefined;
  editQuestion: (index: number, question: PartialQuestion) => void;
  deleteQuestion: (index: number) => void;
  setSelectedIndex: (index: number) => void;
  setLastIndex: () => void;
  isLastQuestionInEdit: () => boolean;
}

const useQuestionStore = create<QuestionStore>((set, get) => ({
  questions: [],
  selectedIndex: undefined,
  addEmptyQuestion: (questionType) =>
    set((state) => ({
      questions: [
        ...state.questions,
        match<QuestionType, PartialQuestion>(questionType)
          .with("multiple-choice", () => ({
            title: "",
            type: "multiple-choice",
            choices: [],
            inEdit: true,
          }))
          .with("true-or-false", () => ({
            title: "",
            type: "true-or-false",
            choices: [],
            inEdit: true,
          }))
          .with("multi-select", () => ({
            title: "",
            type: "multi-select",
            choices: [],
            inEdit: true,
          }))
          .with("identification", () => ({
            title: "",
            type: "identification",
            answer: "",
            possibleAnswers: [],
            inEdit: true,
          }))
          .with("enumeration", () => ({
            title: "",
            type: "enumeration",
            choices: [],
            inEdit: true,
          }))
          .exhaustive(),
      ],
    })),
  addQuestion: (question) =>
    set((state) => ({ questions: [...state.questions, question] })),
  getQuestion: (index) => get().questions[index],
  getSelectedQuestion: () => get().questions[get().selectedIndex ?? 0],
  editQuestion: (index, question) =>
    set((state) => {
      const newQuestions = [...state.questions];
      newQuestions[index] = question;
      return { questions: newQuestions };
    }),
  deleteQuestion: (index) =>
    set((state) => ({
      questions: state.questions.filter((_, i) => i !== index),
    })),
  setSelectedIndex: (index) => set({ selectedIndex: index }),
  setLastIndex: () => set({ selectedIndex: get().questions.length - 1 }),
  isLastQuestionInEdit: () => {
    const isInEdit = get().questions[get().questions.length - 1]?.inEdit;
    return isInEdit ?? false;
  },
}));

export default useQuestionStore;

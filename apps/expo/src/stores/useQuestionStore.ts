import { create } from "zustand";
import { match } from "ts-pattern";

import type { Question } from "@acme/schema/src/types";
import type { SetOptional } from "type-fest";

export type PartialQuestion = SetOptional<Question, "points" | "time"> & {
  inEdit: boolean;
};

export type QuestionType = Question["type"];

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
  setQuestions: (questions: PartialQuestion[]) => void;
  setLastIndex: () => void;
  isLastQuestionInEdit: () => boolean;
  resetQuestions: () => void;
  deleteLastQuestion: () => void;
}

const useQuestionStore = create<QuestionStore>((set, get) => ({
  questions: [],
  selectedIndex: undefined,
  addEmptyQuestion: (questionType) =>
    set((state) => ({
      questions: [
        ...state.questions,
        match<QuestionType, PartialQuestion>(questionType)
          .with("multiple_choice", () => ({
            title: "",
            type: "multiple_choice",
            choices: [
              {
                id: "1",
                isCorrect: false,
                text: "",
              },
              {
                id: "2",
                isCorrect: false,
                text: "",
              },
              {
                id: "3",
                isCorrect: false,
                text: "",
              },
              {
                id: "4",
                isCorrect: false,
                text: "",
              },
            ],
            inEdit: true,
          }))
          .with("true_or_false", () => ({
            title: "",
            type: "true_or_false",
            choices: [
              {
                id: "1",
                isCorrect: false,
                text: "",
              },
              {
                id: "2",
                isCorrect: false,
                text: "",
              },
            ],
            inEdit: true,
          }))
          .with("multi_select", () => ({
            title: "",
            type: "multi_select",
            choices: [
              {
                id: "1",
                isCorrect: false,
                text: "",
              },
              {
                id: "2",
                isCorrect: false,
                text: "",
              },
              {
                id: "3",
                isCorrect: false,
                text: "",
              },
              {
                id: "4",
                isCorrect: false,
                text: "",
              },
            ],
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
  setQuestions: (questions) => set({ questions }),
  setLastIndex: () => set({ selectedIndex: get().questions.length - 1 }),
  isLastQuestionInEdit: () => {
    const isInEdit = get().questions[get().questions.length - 1]?.inEdit;
    return isInEdit ?? false;
  },
  resetQuestions: () => set({ questions: [], selectedIndex: undefined }),
  deleteLastQuestion: () =>
    set((state) => ({
      questions: state.questions.slice(0, state.questions.length - 1),
    })),
}));

export default useQuestionStore;

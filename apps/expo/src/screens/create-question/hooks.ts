import { useReducer } from "react";

import type { Option, Choice } from "./types";
import type { Reducer } from "react";

type ErrorState = {
  titleError: string | null;
  choicesError: (string | undefined)[];
  timeLimitError: string | null;
  pointsError: string | null;
  answerError: string | null;
};

type ErrorAction =
  | {
      type: "SET_TITLE_ERROR";
      payload: string | null;
    }
  | {
      type: "SET_CHOICES_ERROR";
      payload: (string | undefined)[];
    }
  | {
      type: "SET_TIME_LIMIT_ERROR";
      payload: string | null;
    }
  | {
      type: "SET_POINTS_ERROR";

      payload: string | null;
    }
  | {
      type: "SET_ANSWER_ERROR";

      payload: string | null;
    }
  | {
      type: "RESET_ERRORS";
    };

type CheckErrorsProps = {
  title: string;
  choices: (string | undefined)[];
  timeLimits: Option[];
  points: Option[];
  answers: Choice[];
};

const initialState: ErrorState = {
  titleError: null,
  choicesError: [undefined, undefined, undefined, undefined],
  timeLimitError: null,
  pointsError: null,
  answerError: null,
};

const errorReducer = (state: ErrorState, action: ErrorAction) => {
  switch (action.type) {
    case "SET_TITLE_ERROR":
      return { ...state, titleError: action.payload };
    case "SET_CHOICES_ERROR":
      return { ...state, choicesError: action.payload };
    case "SET_TIME_LIMIT_ERROR":
      return { ...state, timeLimitError: action.payload };
    case "SET_POINTS_ERROR":
      return { ...state, pointsError: action.payload };
    case "SET_ANSWER_ERROR":
      return { ...state, answerError: action.payload };
    case "RESET_ERRORS":
      return initialState;
    default:
      return state;
  }
};

const useError = () => {
  const [state, dispatch] = useReducer<Reducer<ErrorState, ErrorAction>>(
    errorReducer,
    initialState,
  );

  const resetErrors = () => {
    dispatch({ type: "RESET_ERRORS" });
  };

  const checkTitleError = (title: string) => {
    if (title === "") {
      dispatch({ type: "SET_TITLE_ERROR", payload: "Title cannot be empty" });
      return true;
    }
    if (title.length > 50) {
      dispatch({
        type: "SET_TITLE_ERROR",
        payload: "Title cannot be longer than 50 characters",
      });
      return true;
    }
    return false;
  };

  const checkChoicesError = (choices: (string | undefined)[]) => {
    let hasError = false;
    const oldChoicesError = state.choicesError;
    for (let index = 0; index < choices.length; index++) {
      const choice = choices[index];
      if (choice === undefined) {
        oldChoicesError[index] = undefined;
      } else if (choice === "") {
        hasError = true;
        oldChoicesError[index] = "Choice cannot be empty";
      } else if (choice !== undefined && choice.length > 20) {
        hasError = true;
        oldChoicesError[index] = "Choice cannot be longer than 20 characters";
      } else {
        oldChoicesError[index] = undefined;
      }
    }
    if (oldChoicesError.every((error) => error === undefined)) {
      hasError = false;
    }
    dispatch({ type: "SET_CHOICES_ERROR", payload: oldChoicesError });
    return hasError;
  };

  const checkChoiceError = (index: number, choice: string) => {
    if (choice === "") {
      dispatch({
        type: "SET_CHOICES_ERROR",
        payload: state.choicesError.map((error, i) =>
          i === index ? "Choice cannot be empty" : error,
        ),
      });
      return true;
    }
    if (choice.length > 20) {
      dispatch({
        type: "SET_CHOICES_ERROR",
        payload: state.choicesError.map((error, i) =>
          i === index ? "Choice cannot be longer than 20 characters" : error,
        ),
      });
      return true;
    }
    return false;
  };

  const checkTimeLimitError = (timeLimits: Option[]) => {
    let hasError = false;
    if (timeLimits.every((choice) => choice.isSelected === false)) {
      hasError = true;
      dispatch({
        type: "SET_TIME_LIMIT_ERROR",
        payload: "At least one time limit must be selected",
      });
    }
    return hasError;
  };

  const checkPointsError = (points: Option[]) => {
    let hasError = false;
    if (points.every((choice) => choice.isSelected === false)) {
      hasError = true;
      dispatch({
        type: "SET_POINTS_ERROR",
        payload: "At least one point value must be selected",
      });
    }
    return hasError;
  };

  const checkAnswerError = (answers: Choice[]) => {
    const correctCount = answers.filter((answer) => answer.isCorrect).length;
    if (correctCount !== 1) {
      dispatch({
        type: "SET_ANSWER_ERROR",
        payload: "Exactly one answer must be correct",
      });
      return true;
    }
    return false;
  };

  const checkErrors = ({
    title,
    choices,
    timeLimits,
    points,
    answers,
  }: CheckErrorsProps) => {
    let hasError = false;
    hasError = checkTitleError(title) || hasError;
    hasError = checkChoicesError(choices) || hasError;
    hasError = checkTimeLimitError(timeLimits) || hasError;
    hasError = checkPointsError(points) || hasError;
    hasError = checkAnswerError(answers) || hasError;
    return hasError;
  };

  return {
    errorState: state,
    resetErrors,
    checkTitleError,
    checkChoicesError,
    checkChoiceError,
    checkTimeLimitError,
    checkPointsError,
    checkAnswerError,
    checkErrors,
  };
};

export default useError;

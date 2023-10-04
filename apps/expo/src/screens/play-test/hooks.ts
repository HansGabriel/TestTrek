const TIMES_UP_MESSAGE = "Times up!" as const;
export const DEFAULT_ERROR_MESSAGE = "Incorrect answer!" as const;
const INCORRECT_MESSAGES = [
  "Oops!",
  "Not quite!",
  "Try again!",
  "That's not it!",
  "Wrong answer!",
  "Incorrect!",
  "Not the right answer!",
  "Incorrect answer!",
  "Incorrect, try another!",
  DEFAULT_ERROR_MESSAGE,
] as const;

export type ErrorMessage =
  | (typeof INCORRECT_MESSAGES)[number]
  | typeof TIMES_UP_MESSAGE;

type Props = "times-up" | "incorrect";

export const getErrorMessage = (type: Props) => {
  let errorMessage: ErrorMessage = "Incorrect answer!";

  if (type === "times-up") {
    errorMessage = TIMES_UP_MESSAGE;
  } else {
    const randomIndex = Math.floor(Math.random() * INCORRECT_MESSAGES.length);
    const randomMessage = INCORRECT_MESSAGES[randomIndex];

    if (randomMessage !== undefined) {
      errorMessage = randomMessage;
    } else {
      errorMessage = DEFAULT_ERROR_MESSAGE;
    }
  }

  return errorMessage;
};

import { View, Text, TouchableOpacity, TextInput } from "react-native";
import CheckboxIcon from "../../icons/CheckboxIcon";
import CloseSquareIcon from "../../icons/CloseSquareIcon";
import { RouterOutputs } from "../../utils/trpc";
import { AppButton } from "../../components/buttons/AppButton";

import type { ChoiceStyle } from "../create-question/types";
import type { ChoiceStatus } from "./index";
import CheckIcon from "../../icons/CheckIcon";

export const choiceStyles: ChoiceStyle[] = [
  {
    styles: "border-blue-700 bg-blue-500",
  },
  {
    styles: "border-rose-500 bg-rose-600",
  },
  {
    styles: "border-orange-500 bg-amber-500",
  },
  {
    styles: "border-emerald-600 bg-emerald-500",
  },
];

export type Question = NonNullable<
  RouterOutputs["play"]["getTest"]
>["test"]["questions"][number];

export const getSelectedChoices = (question: Question) => {
  if (!question) {
    return [];
  }
  if (question.type === "multiple_choice" || question.type === "multi_select") {
    return question.choices.map((choice, idx) => ({
      id: idx,
      text: choice.text ?? "",
      isCorrect: choice.isCorrect,
      styles: choiceStyles[idx]?.styles ?? "",
      isSelected: false,
    }));
  }
  if (question.type === "true_or_false") {
    return question.choices.map((choice, idx) => ({
      id: idx,
      text: choice.text ?? "",
      isCorrect: choice.isCorrect,
      styles: choiceStyles[idx]?.styles ?? "",
      isSelected: false,
    }));
  }
  return Array.from({ length: 2 }, (_, idx) => ({
    id: idx,
    text: undefined,
    isCorrect: false,
    styles: choiceStyles[idx]?.styles ?? "",
    isSelected: false,
  }));
};

export type ModifiedChoices = ReturnType<typeof getSelectedChoices>;
export type ModifiedChoice = ModifiedChoices[number];

export const TrueOrFalseCard = ({
  choice,
  isDone,
  handlePressChoice,
}: {
  choice: ModifiedChoice | undefined;
  isDone: boolean;
  handlePressChoice: (choiceId: number) => () => void;
}) => {
  if (!choice) {
    return <></>;
  }

  const getTextSize = (text: string) => {
    if (text.length <= 10) {
      return "text-base";
    } else if (text.length <= 18) {
      return "text-sm";
    } else {
      return "text-xs";
    }
  };

  const doneStyle = choice.isCorrect
    ? "border-emerald-600 bg-emerald-500"
    : "border-rose-500 bg-rose-600";

  const choiceColors = choice.text === "True" ? "bg-blue-500" : "bg-rose-600";

  return (
    <TouchableOpacity
      key={choice.id}
      disabled={isDone}
      className={`h-full w-full flex-1 items-center self-center rounded-2xl ${
        isDone ? doneStyle : choiceColors
      } p-5`}
      onPress={handlePressChoice(choice.id)}
    >
      {isDone ? (
        <View className="absolute right-2 top-2 h-5 w-5">
          {choice.isCorrect ? <CheckboxIcon /> : <CloseSquareIcon />}
        </View>
      ) : null}
      <View className="h-full w-full items-center justify-center">
        <Text
          className={`self-center text-center ${getTextSize(
            choice.text || "",
          )} font-bold text-white`}
        >
          {choice.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const IdentificationCard = ({
  answer,
  choices,
  isDone,
  setAnswer,
  handleSubmit,
}: {
  answer: string;
  choices: ModifiedChoice[] | undefined;
  isDone: boolean;
  handleSubmit: (answer: string) => void;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const onPress = () => {
    handleSubmit(answer);
  };

  return (
    <>
      <Text className="font-nunito-extrabold mt-5 text-center text-sm leading-[38.40px] text-neutral-800">
        Type your answer in the box below
      </Text>
      <TextInput
        multiline={false}
        maxLength={65}
        className="mx-5 mb-8 h-[15%] flex-col items-center justify-center rounded-2xl bg-emerald-500 p-2 text-center text-lg font-bold leading-[28.80px] text-white"
        selectionColor="white"
        value={answer}
        onChangeText={setAnswer}
        placeholder="Tap to write an answer"
        placeholderTextColor="#FFFFFF"
        editable={!isDone}
      />

      {isDone && (
        <>
          <Text className="font-nunito-extrabold text-center text-2xl leading-[38.40px] text-neutral-800">
            Correct Answer:
          </Text>
          <View className="mt-2 flex flex-row flex-wrap items-center justify-center gap-x-2 gap-y-2">
            {choices
              ?.filter((choice) => choice.isCorrect)
              .map((choice) => (
                <View
                  key={choice.id}
                  className={`inline-flex w-[85%] flex-col items-center justify-center rounded-2xl ${choice.styles}`}
                >
                  <Text className="font-nunito-extrabold mx-4 self-stretch text-center text-sm font-bold leading-[28.80px] text-white">
                    {choice.text}
                  </Text>
                </View>
              ))}
          </View>
        </>
      )}

      {!isDone && answer.length > 0 && (
        <AppButton
          onPress={onPress}
          text="Submit"
          classNameValue="mb-16"
          buttonColor="violet-600"
          borderShadowColor="indigo-800"
          borderRadius="full"
          fontStyle="bold"
          textColor="white"
          TOwidth="full"
          Vwidth="full"
          isLoading={false}
        />
      )}
    </>
  );
};

export const MultiSelectCard = ({
  isSelected,
  choice,
  isDone,
  handlePressChoice,
}: {
  isSelected: boolean;
  choice: ModifiedChoice | undefined;
  isDone: boolean;
  handlePressChoice: (choiceId: number) => () => void;
}) => {
  if (!choice) {
    return <></>;
  }

  const getTextSize = (text: string) => {
    if (text.length <= 10) {
      return "text-base";
    } else if (text.length <= 18) {
      return "text-sm";
    } else {
      return "text-xs";
    }
  };

  const doneStyle =
    choice.isCorrect === true && isSelected === true
      ? "border-emerald-600 bg-emerald-500"
      : !choice.isCorrect && isSelected === false
      ? "border-gray-500 bg-gray-500"
      : "border-rose-500 bg-rose-600";

  return (
    <TouchableOpacity
      key={choice.id}
      disabled={isDone}
      className={`flex w-[85vw] flex-col flex-wrap items-center justify-evenly self-center rounded-2xl ${
        isDone ? doneStyle : choice.styles
      } p-5`}
      onPress={handlePressChoice(choice.id)}
    >
      {isDone ? (
        <View className="absolute right-4 top-[22px] h-5 w-5">
          {choice.isCorrect ? <CheckboxIcon /> : <CloseSquareIcon />}
        </View>
      ) : null}
      {!isDone ? (
        <View className="absolute right-4 top-[19px] h-5 w-5">
          {isSelected ? <CheckIcon /> : ""}
        </View>
      ) : null}
      <View className="w-full items-center justify-center">
        <Text
          className={`w-[83%] self-center text-center ${getTextSize(
            choice.text || "",
          )} font-bold text-white`}
        >
          {choice.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const MultiSelectCards = ({
  choices,
  isDone,
  choiceStatus,
  setChoiceStatus,
  handleMultiSelectSubmit,
}: {
  choices: ModifiedChoices;
  isDone: boolean;
  choiceStatus: ChoiceStatus;
  setChoiceStatus: React.Dispatch<React.SetStateAction<ChoiceStatus>>;
  handleMultiSelectSubmit: () => void;
}) => {
  const handlePressChoice = (choiceId: number) => () => {
    setChoiceStatus((prev) => {
      const newChoiceStatus = [...prev] as ChoiceStatus;
      newChoiceStatus[choiceId] = !newChoiceStatus[choiceId];
      return newChoiceStatus;
    });
  };

  return (
    <View className="mt-5 flex w-full flex-col items-center space-y-2 self-center">
      <Text className="font-nunito-extrabold mt-5 text-center text-sm leading-[38.40px] text-neutral-800">
        Select all correct answers
      </Text>
      <View>
        <MultiSelectCard
          isSelected={choiceStatus[0]}
          choice={choices[0]}
          isDone={isDone}
          handlePressChoice={handlePressChoice}
        />
      </View>
      <View>
        <MultiSelectCard
          isSelected={choiceStatus[1]}
          choice={choices[1]}
          isDone={isDone}
          handlePressChoice={handlePressChoice}
        />
      </View>
      <View>
        <MultiSelectCard
          isSelected={choiceStatus[2]}
          choice={choices[2]}
          isDone={isDone}
          handlePressChoice={handlePressChoice}
        />
      </View>
      <View>
        <MultiSelectCard
          isSelected={choiceStatus[3]}
          choice={choices[3]}
          isDone={isDone}
          handlePressChoice={handlePressChoice}
        />
      </View>
      {!isDone && (
        <AppButton
          onPress={handleMultiSelectSubmit}
          text="Submit"
          classNameValue="my-10"
          buttonColor="violet-600"
          borderShadowColor="indigo-800"
          borderRadius="full"
          fontStyle="bold"
          textColor="white"
          TOwidth="full"
          Vwidth="full"
          isLoading={false}
        />
      )}
    </View>
  );
};

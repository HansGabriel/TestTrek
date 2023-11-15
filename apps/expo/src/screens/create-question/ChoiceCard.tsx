/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from "react";
import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import CheckboxIcon from "../../icons/CheckboxIcon";
import { isEqual } from "lodash";

import type { FC } from "react";
import type { Choice, Option } from "./types";
import type { PartialQuestion } from "../../stores/useQuestionStore";
import type { ErrorState } from "./hooks";

export type MultipleChoiceCardProps = {
  choice: Choice;
  question: PartialQuestion | undefined;
  setOpenAlert: (val: boolean) => void;
  resetQuestionImage: () => void;
  goBack: () => void;
  isSaved: boolean;
  questionTitle: string;
  timeLimitOptions: Option[];
  pointOptions: Option[];
  setIsSaved: (val: boolean) => void;
  handleOpenModal: (val: number) => any;
  choices: Choice[];
  errorState: ErrorState;
  getSelectedChoices: any;
};

export const MultipleChoiceCard: FC<MultipleChoiceCardProps> = ({
  choice,
  question,
  setOpenAlert,
  resetQuestionImage,
  goBack,
  isSaved,
  questionTitle,
  timeLimitOptions,
  pointOptions,
  setIsSaved,
  handleOpenModal,
  choices,
  errorState,
  getSelectedChoices,
}) => {
  const getTextSize = (text: string) => {
    if (text.length <= 10) {
      return "text-base";
    } else if (text.length <= 18) {
      return "text-sm";
    } else {
      return "text-xs";
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (question?.inEdit) {
        setOpenAlert(true);
      } else {
        resetQuestionImage();
        goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (!isSaved) {
      const isTitleSame = question?.title === questionTitle;
      const isTimeLimitSame =
        question?.time ===
        timeLimitOptions.filter(
          (timeLimitOption) => timeLimitOption.isSelected,
        )[0]?.value;
      const isPointSame =
        question?.points ===
        pointOptions.filter((pointOption) => pointOption.isSelected)[0]?.value;
      const isChoicesSame = isEqual(choices, getSelectedChoices());
      const isTheSameValues =
        isTitleSame && isTimeLimitSame && isPointSame && isChoicesSame;

      setIsSaved(isTheSameValues ? false : true);
    }
  }, [questionTitle, timeLimitOptions, pointOptions, choices]);

  if (!choice) {
    return <></>;
  }

  return (
    <>
      <TouchableOpacity
        key={choice.id}
        className={`flex h-36 w-36 flex-col flex-wrap items-center justify-evenly self-center rounded-2xl ${
          choice.styles
        } ${
          errorState.choicesError[choice.id]?.length !== undefined
            ? "border-2 border-red-500"
            : ""
        } p-5`}
        onPress={handleOpenModal(choice.id)}
      >
        <>
          {choice.isCorrect && (
            <View className="absolute right-2 top-2 h-5 w-5">
              <CheckboxIcon />
            </View>
          )}
          <View className="h-full w-full items-center justify-center">
            <Text
              className={`self-center text-center ${getTextSize(
                choice.text ? choice.text : "Add answer",
              )} font-bold text-white`}
            >
              {choice.text ? choice.text : "Add answer"}
            </Text>
          </View>
        </>
      </TouchableOpacity>
    </>
  );
};

interface TrueOrFalseCardProps extends MultipleChoiceCardProps {
  onPressCard: () => void;
  isSelected: boolean;
}

export const TrueOrFalseCard: FC<TrueOrFalseCardProps> = ({
  choice,
  question,
  setOpenAlert,
  resetQuestionImage,
  goBack,
  isSaved,
  questionTitle,
  timeLimitOptions,
  pointOptions,
  setIsSaved,
  choices,
  errorState,
  getSelectedChoices,
  isSelected,
  onPressCard,
}) => {
  useEffect(() => {
    const backAction = () => {
      if (question?.inEdit) {
        setOpenAlert(true);
      } else {
        resetQuestionImage();
        goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (!isSaved) {
      const isTitleSame = question?.title === questionTitle;
      const isTimeLimitSame =
        question?.time ===
        timeLimitOptions.filter(
          (timeLimitOption) => timeLimitOption.isSelected,
        )[0]?.value;
      const isPointSame =
        question?.points ===
        pointOptions.filter((pointOption) => pointOption.isSelected)[0]?.value;
      const isChoicesSame = isEqual(choices, getSelectedChoices());
      const isTheSameValues =
        isTitleSame && isTimeLimitSame && isPointSame && isChoicesSame;

      setIsSaved(isTheSameValues ? false : true);
    }
  }, [questionTitle, timeLimitOptions, pointOptions, choices]);

  const choiceText = choice?.text;

  if (!choice || !choiceText) {
    return <></>;
  }

  return (
    <TouchableOpacity
      key={choice.id}
      className={`flex h-[220px] w-36 flex-col flex-wrap items-center justify-evenly self-center rounded-2xl ${
        choice.styles
      } ${
        errorState.choicesError[choice.id]?.length !== undefined
          ? "border-2 border-red-500"
          : ""
      } p-5`}
      onPress={onPressCard}
    >
      <>
        {isSelected && (
          <View className="absolute right-2 top-2 h-5 w-5">
            <CheckboxIcon />
          </View>
        )}
        <View className="h-full w-full items-center justify-center">
          <Text className="self-center text-center text-lg font-bold text-white">
            {choice.text}
          </Text>
        </View>
      </>
    </TouchableOpacity>
  );
};

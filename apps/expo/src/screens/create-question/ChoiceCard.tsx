/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from "react";
import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import CheckboxIcon from "../../icons/CheckboxIcon";
import useImageStore from "../../stores/useImageStore";
import { AppButton } from "../../components/buttons/AppButton";
import useQuestionStore from "../../stores/useQuestionStore";
import { choiceStyles } from "./constants";
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
  const questionImage = useImageStore((state) => state.questionImage);

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
      const isImageSame = question?.image === questionImage;
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
        isImageSame &&
        isTitleSame &&
        isTimeLimitSame &&
        isPointSame &&
        isChoicesSame;

      setIsSaved(isTheSameValues ? false : true);
    }
  }, [questionImage, questionTitle, timeLimitOptions, pointOptions, choices]);

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
  const questionImage = useImageStore((state) => state.questionImage);

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
      const isImageSame = question?.image === questionImage;
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
        isImageSame &&
        isTitleSame &&
        isTimeLimitSame &&
        isPointSame &&
        isChoicesSame;

      setIsSaved(isTheSameValues ? false : true);
    }
  }, [questionImage, questionTitle, timeLimitOptions, pointOptions, choices]);

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

interface MultiSelectCardProps extends MultipleChoiceCardProps {
  onPressCard: () => void;
  isSelected: boolean;
}

export const MultiSelectCard: FC<MultiSelectCardProps> = ({
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
  const questionImage = useImageStore((state) => state.questionImage);

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
      const isImageSame = question?.image === questionImage;
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
        isImageSame &&
        isTitleSame &&
        isTimeLimitSame &&
        isPointSame &&
        isChoicesSame;

      setIsSaved(isTheSameValues ? false : true);
    }
  }, [questionImage, questionTitle, timeLimitOptions, pointOptions, choices]);

  if (!choice) {
    return <></>;
  }

  return (
    <>
      <TouchableOpacity
        key={choice.id}
        className={`flex h-16 w-[85vw] flex-col flex-wrap items-center justify-evenly self-center rounded-2xl ${
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
            <View className="absolute right-4 top-[20px] h-5 w-5">
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

interface IdentificationCardProps extends MultipleChoiceCardProps {
  onPressCard: () => void;
  isSelected: boolean;
}

export const IdentificationCard: FC<IdentificationCardProps> = ({
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
  const questionImage = useImageStore((state) => state.questionImage);

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
      const isImageSame = question?.image === questionImage;
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
        isImageSame &&
        isTitleSame &&
        isTimeLimitSame &&
        isPointSame &&
        isChoicesSame;

      setIsSaved(isTheSameValues ? false : true);
    }
  }, [questionImage, questionTitle, timeLimitOptions, pointOptions, choices]);

  if (!choice) {
    return <></>;
  }

  return (
    <>
      <TouchableOpacity
        key={choice.id}
        className={`flex h-16 w-[85vw] flex-col flex-wrap items-center justify-evenly self-center rounded-2xl ${
          choice.styles
        } ${
          errorState.choicesError[choice.id]?.length !== undefined
            ? "border-2 border-red-500"
            : ""
        } p-5`}
        onPress={handleOpenModal(choice.id)}
      >
        <>
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

interface TrueOrFalseCardsProps
  extends Omit<MultipleChoiceCardProps, "choice"> {
  setChoices: React.Dispatch<React.SetStateAction<Choice[]>>;
}

export const TrueOrFalseCards = ({
  choices,
  setChoices,
  ...props
}: TrueOrFalseCardsProps) => {
  const toggleChoiceCorrect = (index: number) => () => {
    setChoices((prev) =>
      prev.map((choice) => {
        if (choice.id === index) {
          return { ...choice, isCorrect: !choice.isCorrect };
        }
        if (choice.isCorrect) {
          return { ...choice, isCorrect: false };
        }
        return choice;
      }),
    );
  };

  const firstChoice = choices[0];
  const secondChoice = choices[1];

  if (!firstChoice || !secondChoice) {
    return <></>;
  }

  return (
    <View className="mt-5 flex flex-row items-center space-x-4 self-center">
      <View>
        <TrueOrFalseCard
          {...props}
          choices={choices}
          choice={firstChoice}
          isSelected={firstChoice.isCorrect}
          onPressCard={toggleChoiceCorrect(0)}
        />
      </View>
      <View>
        <TrueOrFalseCard
          {...props}
          choices={choices}
          choice={secondChoice}
          isSelected={secondChoice.isCorrect}
          onPressCard={toggleChoiceCorrect(1)}
        />
      </View>
    </View>
  );
};

interface MultiSelectCardsProps
  extends Omit<MultipleChoiceCardProps, "choice"> {
  setChoices: React.Dispatch<React.SetStateAction<Choice[]>>;
}

export const MultiSelectCards = ({
  choices,
  setChoices,
  ...props
}: MultiSelectCardsProps) => {
  const toggleChoiceCorrect = (index: number) => () => {
    setChoices((prev) =>
      prev.map((choice) => {
        if (choice.id === index) {
          return { ...choice, isCorrect: !choice.isCorrect };
        }
        if (choice.isCorrect) {
          return { ...choice, isCorrect: false };
        }
        return choice;
      }),
    );
  };

  const firstChoice = choices[0];
  const secondChoice = choices[1];
  const thirdChoice = choices[2];
  const fourthChoice = choices[3];

  if (!firstChoice || !secondChoice || !thirdChoice || !fourthChoice) {
    return <></>;
  }

  return (
    <View className="mt-5 flex w-full flex-col items-center space-y-2 self-center">
      <View>
        <MultiSelectCard
          {...props}
          choices={choices}
          choice={firstChoice}
          isSelected={firstChoice.isCorrect}
          onPressCard={toggleChoiceCorrect(0)}
        />
      </View>
      <View>
        <MultiSelectCard
          {...props}
          choices={choices}
          choice={secondChoice}
          isSelected={secondChoice.isCorrect}
          onPressCard={toggleChoiceCorrect(1)}
        />
      </View>
      <View>
        <MultiSelectCard
          {...props}
          choices={choices}
          choice={thirdChoice}
          isSelected={secondChoice.isCorrect}
          onPressCard={toggleChoiceCorrect(1)}
        />
      </View>
      <View>
        <MultiSelectCard
          {...props}
          choices={choices}
          choice={fourthChoice}
          isSelected={secondChoice.isCorrect}
          onPressCard={toggleChoiceCorrect(1)}
        />
      </View>
    </View>
  );
};

interface IdentificationCardsProps
  extends Omit<MultipleChoiceCardProps, "choice"> {
  setChoices: React.Dispatch<React.SetStateAction<Choice[]>>;
}

export const IdentificationCards = ({
  choices,
  setChoices,
  ...props
}: IdentificationCardsProps) => {
  const addChoiceToQuestion = useQuestionStore(
    (state) => state.addChoiceToQuestion,
  );
  const deleteChoiceFromQuestion = useQuestionStore(
    (state) => state.deleteChoiceFromQuestion,
  );

  const mappedChoices = choices.map((choice, id) => {
    return {
      ...choice,
      id,
      styles: choiceStyles[id]?.styles ?? "",
    };
  });

  const toggleChoiceCorrect = (index: number) => () => {
    setChoices((prev) =>
      prev.map((choice) => {
        if (choice.id === index) {
          return { ...choice, isCorrect: !choice.isCorrect };
        }
        if (choice.isCorrect) {
          return { ...choice, isCorrect: false };
        }
        return choice;
      }),
    );
  };

  const addChoice = () => {
    const partialChoices = choices.map((choice) => ({
      text: choice.text ?? "",
      isCorrect: choice.isCorrect,
    }));

    addChoiceToQuestion(partialChoices);
  };

  const removeChoice = (index: number) => () => {
    deleteChoiceFromQuestion(index);
  };

  return (
    <View className="mt-5 flex w-full flex-col items-center space-y-2 self-center">
      {mappedChoices &&
        mappedChoices.map((choice) => (
          <View className="my-2" key={choice.id}>
            <IdentificationCard
              {...props}
              choices={mappedChoices}
              choice={mappedChoices[choice.id]!}
              isSelected={choice.isCorrect}
              onPressCard={toggleChoiceCorrect(choice.id)}
            />
            <TouchableOpacity onPress={removeChoice(choice.id)}>
              <Text className="ml-auto text-base font-bold leading-[28.80px] text-red-500">
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        ))}

      <View className="w-[50%] self-center">
        <AppButton
          text="Add Choice"
          buttonColor="violet-600"
          borderShadowColor="indigo-800"
          borderRadius="full"
          fontStyle="bold"
          textColor="white"
          TOwidth="full"
          Vwidth="full"
          Vheight="12"
          onPress={addChoice}
          isLoading={false}
        />
      </View>
    </View>
  );
};

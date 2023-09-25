import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { MoreCircleIcon } from "../../icons/question-options";
import CheckboxIcon from "../../icons/CheckboxIcon";
import { trpc } from "../../utils/trpc";
import { AppButton } from "../../components/buttons/AppButton";
import { RouterOutputs } from "../../utils/trpc";
import CountdownTimer, { type CountdownTimerRef } from "./CountdownTimer";
import UpperBar, { type UpperBarRef } from "./UpperBar";
import { match } from "ts-pattern";

import type { FC } from "react";
import type { RootStackScreenProps } from "../../types";
import type { ChoiceStyle } from "../create-question/types";

const choiceStyles: ChoiceStyle[] = [
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

type Question = NonNullable<
  RouterOutputs["play"]["getTest"]
>["test"]["questions"][number];

const getSelectedChoices = (question: Question) => {
  if (!question) {
    return [];
  }
  if (question.type === "multiple_choice") {
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

type ModifiedChoices = ReturnType<typeof getSelectedChoices>;
type ModifiedChoice = ModifiedChoices[number];

export const PlayTestScreen: FC<RootStackScreenProps<"PlayTest">> = ({
  route,
}) => {
  const { testId } = route.params;
  const upperBarRef = useRef<UpperBarRef>(null);
  const countdownTimerRef = useRef<CountdownTimerRef>(null);

  const [modalType, setModalType] = useState<"correct" | "incorrect">(
    "incorrect",
  );
  const [index, setIndex] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);

  const { data: testDetails } = trpc.play.getTest.useQuery({ testId });

  const singleQuestion = testDetails?.test.questions[index];
  const questionChoices = singleQuestion
    ? getSelectedChoices(singleQuestion)
    : [];

  const [choices, setChoices] = useState<ModifiedChoices>(questionChoices);

  useEffect(() => {
    const questions = testDetails?.test.questions;
    const singleQuestion = questions?.[index];
    if (questions && singleQuestion) {
      setChoices(getSelectedChoices(singleQuestion));
    }
  }, [index, testDetails?.test.questions]);

  if (!testDetails) {
    return <></>;
  }

  const { questions } = testDetails.test;

  const question = questions[index];

  const totalQuestions = questions.length;

  const handlePressChoice = (choiceId: number) => () => {
    if (!question) {
      return;
    }

    Alert.alert("Confirm", "Are you sure you want to submit your answer?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          if (question.type === "multiple_choice") {
            const selectedChoice = choices.find(
              (choice) => choice.id === choiceId,
            );
            if (selectedChoice) {
              if (selectedChoice.isCorrect) {
                setModalType("correct");
              } else {
                setModalType("incorrect");
              }
            } else {
              setModalType("incorrect");
            }
          }

          countdownTimerRef.current?.pauseTimer();
          showUpperBar();
          setIsDone(true);
        },
      },
    ]);
  };

  const renderChoice = (choice: ModifiedChoice) => {
    return (
      <TouchableOpacity
        key={choice.id}
        disabled={isDone}
        className={`basis-[48%] flex-col items-center justify-center rounded-2xl border-b-2 ${choice.styles} p-5`}
        onPress={handlePressChoice(choice.id)}
      >
        {choice.isSelected && (
          <View className="absolute right-2 top-2 h-5 w-5">
            <CheckboxIcon />
          </View>
        )}
        <Text className="my-5 self-stretch text-center text-lg font-bold leading-[28.80px] text-white">
          {choice.text}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleGoToNextQuestion = () => {
    if (index + 1 >= totalQuestions) {
      setIndex(0);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }

    const singleQuestion = questions[index + 1];
    if (singleQuestion) {
      setChoices(getSelectedChoices(singleQuestion));
    }

    setIsDone(false);
  };

  const showUpperBar = () => {
    upperBarRef.current?.show();
  };

  const handleTimeUp = () => {
    if (!question) {
      return;
    }

    if (question.type === "multiple_choice") {
      const selectedChoice = choices.find((choice) => choice.isSelected);
      if (selectedChoice) {
        if (selectedChoice.isCorrect) {
          setModalType("correct");
        } else {
          setModalType("incorrect");
        }
      } else {
        setModalType("incorrect");
      }
    }

    showUpperBar();
    setIsDone(true);
  };

  return (
    <>
      <SafeAreaView className="flex-1">
        <View className="mx-6 my-5 flex flex-row items-center justify-between">
          <Text className="font-nunito-bold text-2xl">
            {index + 1}/{totalQuestions}
          </Text>
          <Text className="font-nunito-bold text-2xl">Test</Text>
          <TouchableOpacity>
            <MoreCircleIcon />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mx-6">
            {question ? (
              <CountdownTimer
                index={index}
                timeInSeconds={question.time}
                handleTimeUp={handleTimeUp}
                ref={countdownTimerRef}
              />
            ) : null}
            <View className="mt-8 mb-4 flex flex-col">
              <View className="mx-auto h-56 w-full items-center justify-center rounded-3xl">
                <Image
                  source={{ uri: question?.image ?? "" }}
                  className="h-60 w-full rounded-3xl"
                />
              </View>
            </View>
            <View
              className={`-z-10 mt-5 items-center justify-center rounded-2xl border border-zinc-100 bg-neutral-50 px-5 py-8
         
        `}
            >
              <Text className="self-stretch text-center text-xl font-bold leading-loose text-black">
                {questions[index]?.title}
              </Text>
            </View>

            <View className="mt-5 flex flex-row items-center justify-between">
              {choices[0] ? renderChoice(choices[0]) : <></>}
              {choices[1] ? renderChoice(choices[1]) : <></>}
            </View>

            <View className="mt-5 flex flex-row items-center justify-between">
              {choices[2] ? renderChoice(choices[2]) : <></>}
              {choices[3] ? renderChoice(choices[3]) : <></>}
            </View>

            {isDone && (
              <>
                <AppButton
                  onPress={handleGoToNextQuestion}
                  text="Next"
                  classNameValue="my-10"
                  buttonColor="violet-600"
                  borderShadowColor="indigo-800"
                  borderRadius="full"
                  fontStyle="bold"
                  textColor="white"
                  TOwidth="full"
                  Vwidth="full"
                />
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      {match(modalType)
        .with("correct", () => (
          <UpperBar
            type="correct"
            value={question?.points ?? 0}
            ref={upperBarRef}
          />
        ))

        .with("incorrect", () => (
          <UpperBar type="incorrect" ref={upperBarRef} />
        ))
        .exhaustive()}
      <StatusBar
        barStyle={
          upperBarRef.current?.isVisible ? "light-content" : "dark-content"
        }
      />
    </>
  );
};

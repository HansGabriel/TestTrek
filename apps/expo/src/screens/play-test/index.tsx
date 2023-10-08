import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Alert,
  BackHandler,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import CheckboxIcon from "../../icons/CheckboxIcon";
import CloseSquareIcon from "../../icons/CloseSquareIcon";
import { trpc } from "../../utils/trpc";
import { AppButton } from "../../components/buttons/AppButton";
import { RouterOutputs } from "../../utils/trpc";
import CountdownTimer, { type CountdownTimerRef } from "./CountdownTimer";
import UpperBar, { type UpperBarRef } from "./UpperBar";
import { match } from "ts-pattern";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import PlayDropdown from "./PlayDropdown";
import useGoBack from "../../hooks/useGoBack";
import {
  getErrorMessage,
  DEFAULT_ERROR_MESSAGE,
  type ErrorMessage,
} from "./hooks";

import type { FC } from "react";
import type { RootStackScreenProps } from "../../types";
import type { ChoiceStyle } from "../create-question/types";

import correctSound from "../../sounds/correct.mp3";
import wrongSound from "../../sounds/wrong.mp3";
import gameMusic from "../../sounds/8bitMusic.mp3";
import { Audio } from "expo-av";
import { useMusicStore } from "../../stores/useMusicStore";
import {
  playEffects,
  playSound,
  unloadAudio,
} from "../../services/audioService";

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
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const goBack = useGoBack();
  const { playId, testId } = route.params;
  const upperBarRef = useRef<UpperBarRef>(null);
  const countdownTimerRef = useRef<CountdownTimerRef>(null);
  const isMusicPlaying = useMusicStore((state) => state.isMusicPlaying);
  const isEffectsPlaying = useMusicStore((state) => state.isEffectsPlaying);
  const setIsPlayTestScreen = useMusicStore(
    (state) => state.setIsPlayTestScreen,
  );

  const correctSoundInstance = new Audio.Sound();
  const wrongSoundInstance = new Audio.Sound();
  const gameMusicInstance = new Audio.Sound();

  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    DEFAULT_ERROR_MESSAGE,
  );
  const [modalType, setModalType] = useState<"correct" | "incorrect">(
    "incorrect",
  );
  const [index, setIndex] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isTimerReady, setIsTimerReady] = useState(false);

  const { data: testDetails } = trpc.play.getTest.useQuery({ testId });
  const { mutate: finishTest } = trpc.play.finishTest.useMutation({
    onSuccess: () => {
      navigation.navigate("Scoreboard", {
        testId: testId,
      });
    },
  });

  const singleQuestion = testDetails?.test.questions[index];
  const questionChoices = singleQuestion
    ? getSelectedChoices(singleQuestion)
    : [];

  const [choices, setChoices] = useState<ModifiedChoices>(questionChoices);

  useEffect(() => {
    if (isFocused) {
      setIsPlayTestScreen(true);
      if (isMusicPlaying && testDetails) {
        playSound({ sound: gameMusicInstance, music: gameMusic });
      }
    } else {
      setIsPlayTestScreen(false);
    }

    return () => {
      unloadAudio({ sound: gameMusicInstance });
    };
  }, [isMusicPlaying, testDetails, isFocused]);

  useEffect(() => {
    const questions = testDetails?.test.questions;
    const singleQuestion = questions?.[index];
    if (questions && singleQuestion) {
      setChoices(getSelectedChoices(singleQuestion));
    }
  }, [index, testDetails?.test.questions]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => goBack() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const timerDelay = setTimeout(() => {
      setIsTimerReady(true);
    }, 100); // 100ms delay

    return () => clearTimeout(timerDelay);
  }, []);

  if (!testDetails) {
    return <></>;
  }

  const { questions } = testDetails.test;

  const question = questions[index];
  const totalQuestions = questions.length;
  const isLastQuestion = index + 1 === totalQuestions;

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
                const elapsedTime =
                  countdownTimerRef.current?.elapsedTime ?? question.time;
                setPoints((prevPoints) => prevPoints + question.points);
                setTime((prevTime) => prevTime + elapsedTime);
                setModalType("correct");
                if (isEffectsPlaying) {
                  playEffects({
                    sound: correctSoundInstance,
                    music: correctSound,
                  });
                }
              } else {
                setModalType("incorrect");
                if (isEffectsPlaying) {
                  playEffects({ sound: wrongSoundInstance, music: wrongSound });
                }
                const errorResult = getErrorMessage("incorrect");
                setErrorMessage(errorResult);
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
    const doneStyle = choice.isCorrect
      ? "border-emerald-600 bg-emerald-500"
      : "border-rose-500 bg-rose-600";
    return (
      <TouchableOpacity
        key={choice.id}
        disabled={isDone}
        className={`basis-[48%] flex-col items-center justify-center rounded-2xl border-b-2 ${
          isDone ? doneStyle : choice.styles
        } p-5`}
        onPress={handlePressChoice(choice.id)}
      >
        {isDone ? (
          <View className="absolute right-2 top-2 h-5 w-5">
            {choice.isCorrect ? <CheckboxIcon /> : <CloseSquareIcon />}
          </View>
        ) : null}
        <Text className="my-5 self-stretch text-center text-lg font-bold leading-[28.80px] text-white">
          {choice.text}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleGoToNextQuestion = () => {
    if (index + 1 >= totalQuestions) {
      finishTest({
        playId,
        score: points,
        time,
      });
      return;
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }

    const singleQuestion = questions[index + 1];
    if (singleQuestion) {
      setChoices(getSelectedChoices(singleQuestion));
    }

    upperBarRef.current?.hide();
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
          const elapsedTime =
            countdownTimerRef.current?.elapsedTime ?? question.time;
          setPoints((prevPoints) => prevPoints + question.points);
          setTime((prevTime) => prevTime + elapsedTime);
          setModalType("correct");
          if (isEffectsPlaying) {
            playEffects({ sound: correctSoundInstance, music: correctSound });
          }
        } else {
          setModalType("incorrect");
          if (isEffectsPlaying) {
            playEffects({ sound: wrongSoundInstance, music: wrongSound });
          }
          const errorResult = getErrorMessage("times-up");
          setErrorMessage(errorResult);
        }
      } else {
        setModalType("incorrect");
        if (isEffectsPlaying) {
          playEffects({ sound: wrongSoundInstance, music: wrongSound });
        }
        const errorResult = getErrorMessage("times-up");
        setErrorMessage(errorResult);
      }
    }

    showUpperBar();
    setIsDone(true);
  };

  const handleExit = () => {
    setIsPlayTestScreen(false);
    goBack();
  };

  const handleSave = () => {
    finishTest({
      playId,
      score: points,
      time,
    });
  };

  return (
    <>
      <SafeAreaView className="flex-1">
        <View className="z-10 mx-6 my-5 flex flex-row items-center justify-between">
          <Text className="font-nunito-bold text-2xl">
            {index + 1}/{totalQuestions}
          </Text>
          <Text className="font-nunito-bold text-2xl">Test</Text>
          <PlayDropdown onExit={handleExit} onSave={handleSave} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mx-6">
            {question && isTimerReady ? (
              <CountdownTimer
                index={index}
                timeInSeconds={question.time}
                handleTimeUp={handleTimeUp}
                ref={countdownTimerRef}
              />
            ) : null}
            {question?.image && (
              <View className="mb-4 mt-8 flex flex-col">
                <View className="mx-auto h-56 w-full items-center justify-center rounded-3xl">
                  <Image
                    source={{ uri: question?.image }}
                    className="h-60 w-full rounded-3xl"
                  />
                </View>
              </View>
            )}
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
                  text={isLastQuestion ? "Finish" : "Next Question"}
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
        .with("correct", () => {
          return (
            <UpperBar
              type="correct"
              value={question?.points ?? 0}
              ref={upperBarRef}
            />
          );
        })
        .with("incorrect", () => {
          return (
            <UpperBar
              type="incorrect"
              message={errorMessage}
              ref={upperBarRef}
            />
          );
        })
        .exhaustive()}
      <StatusBar
        barStyle={
          upperBarRef.current?.isVisible ? "light-content" : "dark-content"
        }
      />
    </>
  );
};

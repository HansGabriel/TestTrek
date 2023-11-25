/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  BackHandler,
  Dimensions,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import CheckboxIcon from "../../icons/CheckboxIcon";
import CloseSquareIcon from "../../icons/CloseSquareIcon";
import { trpc } from "../../utils/trpc";
import { AppButton } from "../../components/buttons/AppButton";
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
import {
  MultiSelectCards,
  TrueOrFalseCard,
  IdentificationCard,
  getSelectedChoices,
  choiceStyles,
} from "./TestCard";

import type { FC } from "react";
import type { RootStackScreenProps } from "../../types";
import type { ModifiedChoice, ModifiedChoices } from "./TestCard";

import correctSound from "../../../assets/sounds/correct.mp3";
import wrongSound from "../../../assets/sounds/wrong.mp3";
import gameMusic from "../../../assets/sounds/8bitMusic.mp3";
import { Audio } from "expo-av";
import { useMusicStore } from "../../stores/useMusicStore";
import {
  playEffects,
  playSound,
  unloadAudio,
} from "../../services/audioService";
import { SafeAreaView } from "react-native-safe-area-context";
import { AlertModal } from "../../components/modals/AlertModal";

export type ChoiceStatus = [boolean, boolean, boolean, boolean];

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
  const [openExitAlert, setOpenExitAlert] = useState(false);
  const [choiceStatus, setChoiceStatus] = useState<ChoiceStatus>([
    false,
    false,
    false,
    false,
  ]);

  const { data: testDetails } = trpc.play.getTest.useQuery({ testId });
  const { mutate: finishTest, isLoading: isFinished } =
    trpc.play.finishTest.useMutation({
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
      setOpenExitAlert(true);
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

    if (
      question.type === "multiple_choice" ||
      question.type === "true_or_false"
    ) {
      const selectedChoice = choices.find((choice) => choice.id === choiceId);
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
  };

  const handleMultiSelectSubmit = () => {
    if (!question) {
      return;
    }

    if (question.type === "multi_select") {
      const allCorrect = choices.every(
        (choice) => choiceStatus[choice.id] === choice.isCorrect,
      );
      if (allCorrect) {
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

    countdownTimerRef.current?.pauseTimer();
    showUpperBar();
    setIsDone(true);
  };

  const handleSubmitIdentification = (answer: string) => {
    if (!question) {
      return;
    }

    if (question.type === "identification") {
      const isCorrectAnswer = question.choices.some(
        (choice) => choice.text === answer,
      );
      if (isCorrectAnswer) {
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

    countdownTimerRef.current?.pauseTimer();
    showUpperBar();
    setIsDone(true);
  };

  const renderChoice = (choice: ModifiedChoice) => {
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

    return (
      <TouchableOpacity
        key={choice.id}
        disabled={isDone}
        className={`flex h-36 w-36 flex-col flex-wrap items-center justify-evenly self-center rounded-2xl border-b-2 ${
          isDone ? doneStyle : choice.styles
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

    if (
      question.type === "multiple_choice" ||
      question.type === "true_or_false" ||
      question.type === "identification" ||
      question.type === "multi_select"
    ) {
      if (question.type === "multi_select") {
        const allCorrect = choices.every(
          (choice) => choiceStatus[choice.id] === choice.isCorrect,
        );
        if (allCorrect) {
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
          const errorResult = getErrorMessage("times-up");
          setErrorMessage(errorResult);
        }
        showUpperBar();
        setIsDone(true);
        return;
      }
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

  const { height, width } = Dimensions.get("window");

  return (
    <>
      <SafeAreaView className="flex-1" style={{ height: height, width: width }}>
        <View className="z-10 mx-6 mt-10 flex flex-row items-center justify-between">
          <Text className="font-nunito-bold text-2xl">
            {index + 1}/{totalQuestions}
          </Text>
          <Text className="font-nunito-bold text-2xl">Test</Text>
          <PlayDropdown onExit={handleExit} onSave={handleSave} />
        </View>
        <View className=" mb-5 ml-5 w-[90%] items-center">
          {question && isTimerReady ? (
            <CountdownTimer
              index={index}
              timeInSeconds={question.time}
              handleTimeUp={handleTimeUp}
              ref={countdownTimerRef}
            />
          ) : null}
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mx-6">
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
              className={`-z-10 mt-5 items-center justify-center rounded-2xl border border-zinc-100 bg-neutral-50 px-5 py-8`}
            >
              <Text className="self-stretch text-center text-xl font-bold leading-loose text-black">
                {questions[index]?.title}
              </Text>
            </View>

            {match(question?.type)
              .with("multiple_choice", () => (
                <View className="mt-5 flex w-[100%] flex-row items-center justify-evenly self-center">
                  <View className="space-y-4">
                    <View>{choices[0] ? renderChoice(choices[0]) : <></>}</View>
                    <View>{choices[1] ? renderChoice(choices[1]) : <></>}</View>
                  </View>
                  <View className="space-y-4">
                    <View>{choices[2] ? renderChoice(choices[2]) : <></>}</View>
                    <View>{choices[3] ? renderChoice(choices[3]) : <></>}</View>
                  </View>
                </View>
              ))
              .with("true_or_false", () => (
                <View className="mt-14 flex flex-row items-center space-x-8 self-center">
                  <View>
                    <TrueOrFalseCard
                      choice={choices[0]}
                      isDone={isDone}
                      handlePressChoice={handlePressChoice}
                    />
                  </View>
                  <View>
                    <TrueOrFalseCard
                      choice={choices[1]}
                      isDone={isDone}
                      handlePressChoice={handlePressChoice}
                    />
                  </View>
                </View>
              ))
              .with("multi_select", () => (
                <>
                  <MultiSelectCards
                    choiceStatus={choiceStatus}
                    setChoiceStatus={setChoiceStatus}
                    choices={choices}
                    isDone={isDone}
                    handleMultiSelectSubmit={handleMultiSelectSubmit}
                  />
                </>
              ))
              .with("identification", () => (
                <IdentificationCard
                  choices={question?.choices?.map((choice, id) => {
                    return {
                      id,
                      text: choice.text,
                      isCorrect: choice.isCorrect,
                      styles: choiceStyles[id]?.styles ?? "",
                      isSelected: false,
                    };
                  })}
                  isDone={isDone}
                  handleSubmit={handleSubmitIdentification}
                />
              ))
              .with(undefined, () => <></>)
              .exhaustive()}

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
                  isLoading={isFinished}
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

      <AlertModal
        isVisible={openExitAlert}
        alertTitle={"Hold on!"}
        alertDescription={"Are you sure you want to exit?"}
        confirmButtonText={"Yes"}
        isCancelButtonVisible={true}
        cancelButtonText={"Cancel"}
        onCancel={() => {
          setOpenExitAlert(false);
        }}
        onConfirm={goBack}
      />
    </>
  );
};

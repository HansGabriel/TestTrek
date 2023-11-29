/* eslint-disable @typescript-eslint/no-empty-function */
import {
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { RootStackScreenProps } from "../../types";
import { match } from "ts-pattern";
import { trpc } from "../../utils/trpc";
import CheckboxIcon from "../../icons/CheckboxIcon";
import CloseSquareIcon from "../../icons/CloseSquareIcon";
import { ReusableHeader } from "../../components/headers/ReusableHeader";
import { Feather } from "@expo/vector-icons";
import {
  MultiSelectCards,
  TrueOrFalseCard,
  IdentificationCard,
  getSelectedChoices,
  choiceStyles,
} from "../play-test/TestCard";

import type { FC } from "react";
import type { ModifiedChoice } from "../play-test/TestCard";
import { ChoiceStatus } from "../play-test";

type QuestionHistoryProps = RootStackScreenProps<"QuestionHistory">;

export const QuestionHistoryScreen: FC<QuestionHistoryProps> = ({
  navigation,
  route,
}) => {
  const { height, width } = Dimensions.get("window");
  const { questionId } = route.params;

  const { data: question, isLoading: isFetchingQuestion } =
    trpc.testHistory.getUserQuestionHistoryById.useQuery({
      questionId: questionId,
    });

  if (!question || isFetchingQuestion) {
    return <></>;
  }

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
        disabled={true}
        className={`flex h-36 w-36 flex-col flex-wrap items-center justify-evenly self-center rounded-2xl border-b-2 ${doneStyle} p-5`}
      >
        <View className="absolute right-2 top-2 h-5 w-5">
          {choice.isCorrect ? <CheckboxIcon /> : <CloseSquareIcon />}
        </View>
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

  const choices = getSelectedChoices(question);
  const choiceStatus = question.choices.map(
    (choice) => choice.isCorrect,
  ) as ChoiceStatus;

  return (
    <>
      <SafeAreaView className="flex-1" style={{ height: height, width: width }}>
        <ReusableHeader
          screenName="Test History"
          backIcon={<Feather name="x" size={24} color="black" />}
          handleExit={() => navigation.goBack()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mx-6">
            {question.image && (
              <View className="mb-4 mt-8 flex flex-col">
                <View className="mx-auto h-56 w-full items-center justify-center rounded-3xl">
                  <Image
                    source={{ uri: question.image }}
                    className="h-60 w-full rounded-3xl"
                  />
                </View>
              </View>
            )}
            <View
              className={`-z-10 mt-5 items-center justify-center rounded-2xl border border-zinc-100 bg-neutral-50 px-5 py-8`}
            >
              <Text className="self-stretch text-center text-xl font-bold leading-loose text-black">
                {question.title}
              </Text>
            </View>

            {match(question.type)
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
                      isDone={true}
                      handlePressChoice={() => () => {}}
                    />
                  </View>
                  <View>
                    <TrueOrFalseCard
                      choice={choices[1]}
                      isDone={true}
                      handlePressChoice={() => () => {}}
                    />
                  </View>
                </View>
              ))
              .with("multi_select", () => (
                <>
                  <MultiSelectCards
                    choiceStatus={choiceStatus}
                    setChoiceStatus={() => {}}
                    choices={choices}
                    isDone={true}
                    handleMultiSelectSubmit={() => {}}
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
                  isDone={true}
                  handleSubmit={() => {}}
                />
              ))
              .exhaustive()}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
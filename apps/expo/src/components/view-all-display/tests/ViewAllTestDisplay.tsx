import React, { FC } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from "react-native";
import ViewAllScreenTestCard from "./ViewAllScreenTestCard";
import ViewAllScreenHeader from "../../headers/ViewAllScreenHeader";
import { FlashList } from "@shopify/flash-list";
import { trpc } from "../../../utils/trpc";
import { useNavigation } from "@react-navigation/native";
import { RouterOutputs } from "../../../utils/trpc";
import { match } from "ts-pattern";
import { IMAGE_PLACEHOLDER_LARGE } from "../../../constants";

import type { PartialQuestion } from "../../../stores/useQuestionStore";

type Props =
  | {
      testsFor: "discover" | "trending" | "topPicks";
    }
  | {
      testsFor: "questions";
      type: "testId";
      testId: string;
    }
  | {
      testsFor: "questions";
      type: "questions";
      questions: PartialQuestion[];
    };

type TestsType = RouterOutputs["test"]["getAll"];
type QuestionsType = NonNullable<RouterOutputs["test"]["getById"]>["questions"];

type FetchedData = TestsType | QuestionsType | PartialQuestion[] | undefined;

export const ViewAllTestDisplay: FC<Props> = (props) => {
  let fetchedData: FetchedData = undefined;
  let headerTitle = "";

  const navigation = useNavigation();

  if (props.testsFor == "discover") {
    const { data } = trpc.test.getDiscoverTests.useQuery();
    fetchedData = data;
    headerTitle = "Discover";
  } else if (props.testsFor == "trending") {
    const { data } = trpc.test.getTrendingTests.useQuery();
    fetchedData = data;
    headerTitle = "Trending";
  } else if (props.testsFor == "topPicks") {
    const { data } = trpc.test.getTopPicks.useQuery();
    fetchedData = data;
    headerTitle = "Top Picks";
  } else if (props.testsFor == "questions") {
    const { type } = props;
    headerTitle = "Questions";
    if (type === "testId") {
      const { testId } = props;
      const { data } = trpc.test.getById.useQuery({ testId });
      fetchedData = data?.questions ?? [];
    }
    if (type === "questions") {
      const { questions } = props;
      fetchedData = questions;
    }
  } else {
    const { data } = trpc.test.getAll.useQuery();
    fetchedData = data;
    headerTitle = "";
  }

  const goToTestDetailsScreen = (testId: string) => () => {
    navigation.navigate("TestDetails", {
      testId,
    });
  };

  return (
    <SafeAreaView className="flex-1 flex-col">
      <ViewAllScreenHeader title={headerTitle} />

      {match(props.testsFor)
        .with("questions", () => {
          const testsFor = props.testsFor;

          if (testsFor === "questions" && props.type === "testId") {
            const questionsData = fetchedData as QuestionsType;
            return (
              <>
                <QuestionsList questions={questionsData} />
              </>
            );
          }

          if (testsFor === "questions" && props.type === "questions") {
            const questionsData = fetchedData as PartialQuestion[];
            return (
              <>
                <QuestionsList questions={questionsData} />
              </>
            );
          }
        })
        .otherwise(() => {
          return (
            <>
              <FlashList
                showsVerticalScrollIndicator={false}
                data={fetchedData as TestsType}
                estimatedItemSize={100}
                renderItem={({ item, index }) => {
                  const fullName = `${item.user.firstName} ${item.user.lastName}`;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={goToTestDetailsScreen(item.id)}
                    >
                      <ViewAllScreenTestCard
                        imageSource={{ uri: item.imageUrl }}
                        title={item.title}
                        questions={item.questions.length}
                        date={new Date(item.createdAt)}
                        plays={0}
                        userImageSource={{
                          uri:
                            item.user.imageUrl ??
                            "https://example.com/dummy-image.jpg",
                        }}
                        userName={fullName}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </>
          );
        })}
    </SafeAreaView>
  );
};

type QuestionsListProps = {
  questions: QuestionsType | PartialQuestion[];
};

const QuestionsList: FC<QuestionsListProps> = ({ questions }) => {
  return (
    <>
      <FlashList
        estimatedItemSize={10}
        data={questions as QuestionsType}
        showsVerticalScrollIndicator={true}
        renderItem={({ item: question, index }) => {
          return (
            <TouchableOpacity
              className="my-2 mx-5 flex h-[105px] items-center justify-start"
              key={index}
            >
              <View className="flex shrink grow basis-0 items-center justify-start self-stretch rounded-xl border border-zinc-200 bg-white">
                <View className="relative w-[140px] self-stretch">
                  <ImageBackground
                    source={{
                      uri: question.image ?? IMAGE_PLACEHOLDER_LARGE,
                    }}
                    imageStyle={{
                      borderTopLeftRadius: 12,
                      borderBottomLeftRadius: 12,
                    }}
                    className="absolute left-0 top-0 h-[105px] w-[140px] rounded-l-xl"
                  />
                </View>
                <Text className="w-ful font-nunito-bold absolute left-40 top-2 text-lg leading-[28.80px] text-neutral-800">
                  {index + 1} -{" "}
                  {match(question.type)
                    .with("multiple_choice", () => "Multiple Choice")
                    .with("true_or_false", () => "True or False")
                    .with("multi_select", () => "Multi Select")
                    .with("identification", () => "Identification")
                    .with("enumeration", () => "Enumeration")
                    .exhaustive()}
                </Text>
                <Text className="font-nunito-semibold absolute left-40 top-10 text-base leading-snug tracking-tight text-neutral-700">
                  {question.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

export default ViewAllTestDisplay;

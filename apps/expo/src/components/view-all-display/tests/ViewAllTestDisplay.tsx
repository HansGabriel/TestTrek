import React, { FC } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Dimensions,
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
import { Visibility } from "../../../../../../packages/db";
import { SkeletonLoader } from "../../loaders/SkeletonLoader";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const { height, width } = Dimensions.get("window");
  let fetchedData: FetchedData = undefined;
  let fetchedTestData:
    | {
        questions: { id: string }[];
        user: { firstName: string; imageUrl: string | null; lastName: string };
        title: string;
        id: string;
        description: string;
        visibility: Visibility;
        keywords: { id: string; name: string }[];
        imageUrl: string;
        createdAt: Date;
        updatedAt: Date;
      }[]
    | undefined = undefined;
  let headerTitle = "";

  const navigation = useNavigation();

  if (props.testsFor == "discover") {
    const { data } = trpc.test.getDiscoverTests.useQuery();
    fetchedTestData = data;
    headerTitle = "Discover Tests";
  } else if (props.testsFor == "trending") {
    const { data } = trpc.test.getTrendingTests.useQuery();
    fetchedTestData = data;
    headerTitle = "Trending";
  } else if (props.testsFor == "topPicks") {
    const { data } = trpc.test.getTopPicks.useQuery();
    fetchedTestData = data;
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

  if (!fetchedTestData && !fetchedData) {
    return (
      <>
        <SafeAreaView
          className="flex-1"
          style={{
            height: height,
            width: width,
          }}
        >
          <ViewAllScreenHeader title={headerTitle} />
          <View className="my-5 h-[50%] w-[90%] flex-col justify-between self-center">
            <View className="mt-7">
              <SkeletonLoader isCircular={true} width={"100%"} height={100} />
            </View>
            <View className="mt-7">
              <SkeletonLoader isCircular={true} width={"100%"} height={100} />
            </View>
            <View className="mt-7">
              <SkeletonLoader isCircular={true} width={"100%"} height={100} />
            </View>
            <View className="mt-7">
              <SkeletonLoader isCircular={true} width={"100%"} height={100} />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 flex-col"
      style={{
        height: height,
        width: width,
      }}
    >
      <ViewAllScreenHeader title={headerTitle} viewAllScreenType="test" />

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
            console.log(questionsData);
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
                data={fetchedTestData}
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
              className="mx-5 my-2 flex h-[105px] items-center justify-start"
              key={index}
            >
              <View className="flex w-[100%] shrink grow basis-0 items-center rounded-xl border border-zinc-200 bg-white">
                <View className=" w-[100%]">
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
                <View className=" h-full w-[55%] self-end">
                  <Text
                    className="font-nunito-bold mt-1 w-full text-lg leading-[28.80px] text-neutral-800"
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                  >
                    {index + 1} -{" "}
                    {match(question.type)
                      .with("multiple_choice", () => "Multiple Choice")
                      .with("true_or_false", () => "True or False")
                      .with("multi_select", () => "Multi Select")
                      .with("identification", () => "Identification")
                      .exhaustive()}
                  </Text>
                  <Text
                    className="font-nunito-semibold text-base leading-snug tracking-tight text-neutral-700"
                    numberOfLines={2}
                    ellipsizeMode={"tail"}
                  >
                    {question.title}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

export default ViewAllTestDisplay;

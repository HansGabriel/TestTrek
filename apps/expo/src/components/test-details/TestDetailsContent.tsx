import React from "react";
import {
  View,
  Image,
  SafeAreaView,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import QuestionCard from "../cards/QuestionCard";
import { IMAGE_PLACEHOLDER } from "../../constants";
import { AppButton } from "../buttons/AppButton";
import { trpc } from "../../utils/trpc";
import { useNavigation } from "@react-navigation/native";
import RightArrowIcon from "../../icons/RightArrowIcon";

import type { FC } from "react";
import type { RouterOutputs } from "../../utils/trpc";
import type { QuestionType } from "@prisma/client";
import { ScrollView } from "react-native-gesture-handler";
import { SkeletonLoader } from "../loaders/SkeletonLoader";
import { FlashList } from "@shopify/flash-list";
import { getFullName } from "@acme/utils/src/strings";
import StarIcon from "../../icons/StarIcon";
import { ReusableHeader } from "../headers/ReusableHeader";
import useGoBack from "../../hooks/useGoBack";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

interface Props {
  testDetails: RouterOutputs["test"]["getById"];
}

type Questions =
  | {
      type: QuestionType;
      title: string;
      image: string | null;
      time: number;
      points: number;
      choices: {
        text: string;
        isCorrect: boolean;
        id: string;
      }[];
      id: string;
    }[]
  | undefined;

const TestDetailsContent: FC<Props> = ({ testDetails }) => {
  const navigation = useNavigation();
  const goBack = useGoBack();

  const { data: testStatistics } = trpc.test.getDetails.useQuery({
    testId: testDetails?.id ?? "",
  });

  const { mutate: playTest, isLoading: isLoadingPlayTest } =
    trpc.test.play.useMutation({
      onSuccess: (data) => {
        navigation.navigate("PlayTest", {
          playId: data.id,
          testId: data.testId,
        });
      },
    });

  if (!testDetails || !testStatistics) {
    return (
      <>
        <ReusableHeader
          screenName={""}
          optionIcon={<StarIcon />}
          handleExit={goBack}
        />
        <SafeAreaView className="flex-1">
          <View className="h-[90%] w-[90%] items-center space-y-10 self-center">
            <View className=" h-[50%] w-[100%] items-center justify-center">
              <SkeletonLoader
                isCircular={true}
                width={"100%"}
                height={"100%"}
              />
            </View>
            <View className="h-[25%] w-[100%] items-center justify-evenly">
              <SkeletonLoader isCircular={true} width={"100%"} height={25} />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }

  const { isOwner, totalQuestions, totalPlays, totalFavorites, notOwner } =
    testStatistics;

  const questions = testDetails.questions as unknown as Questions;

  const firstTenQuestions = questions?.slice(0, 10) ?? [];

  const statsData = [
    { number: totalQuestions, label: "Questions" },
    { number: totalPlays, label: "Played" },
    { number: totalFavorites, label: "Favorited" },
  ];

  const { id: testId } = testDetails;

  const goToViewAllQuestions = () => {
    navigation.navigate("ViewAll", {
      fetchedData: "questions",
      type: "testId",
      testId,
    });
  };

  const goToOthersProfileScreen = (userId: string) => () => {
    navigation.navigate("OthersProfile", { userId });
  };

  const goToMyProfileScreen = () => () => {
    navigation.navigate("Profile");
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <ScrollView className={"w-[90%] "} showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: screenHeight / 3,
            width: screenWidth * 0.9,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: 20,
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 20,
              resizeMode: "cover",
            }}
            source={{ uri: testDetails?.imageUrl ?? IMAGE_PLACEHOLDER }}
          />
        </View>

        <Text
          className="font-nunito mt-3 w-[87%] break-words text-2xl font-bold leading-[38.40px] text-[#212121]"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          <Text className="font-nunito-bold w-[382px] text-2xl font-bold leading-[38.40px] text-neutral-800">
            {testDetails.title}
          </Text>
        </Text>

        <AppButton
          onPress={() => {
            playTest({
              testId,
            });
          }}
          text="Play Now"
          classNameValue="mb-5 mt-5"
          buttonColor="violet-600"
          borderShadowColor="indigo-800"
          borderRadius="full"
          fontStyle="bold"
          textColor="white"
          TOwidth="full"
          Vwidth="full"
          disabled={isLoadingPlayTest}
          isLoading={isLoadingPlayTest}
          loadingColor="white"
        />

        <View className="w-[87%] self-center border-b border-[#EEEEEE]"></View>

        {Array.from({ length: 2 }).map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <View className="w-[90%] flex-row items-center justify-between self-center py-1">
              {statsData
                .slice(rowIndex * 3, rowIndex * 3 + 3)
                .map((stat, columnIndex) => (
                  <React.Fragment key={stat.label}>
                    <View className="w-1/3 flex-col items-center justify-center py-2 ">
                      <Text className="font-nunito-bold text-[20px] leading-[32px] text-[#212121]">
                        {stat.number}
                      </Text>
                      <Text className="font-nunito-semibold text-[16px] leading-[22.4px] text-[#424242]">
                        {stat.label}
                      </Text>
                    </View>
                    {columnIndex !== 2 && (
                      <View className="h-4/5 self-center border-l border-[#EEEEEE] "></View>
                    )}
                  </React.Fragment>
                ))}
            </View>
            {rowIndex !== 1 && (
              <View className="mb-3 w-[87%] self-center border-b border-[#EEEEEE]"></View>
            )}
          </React.Fragment>
        ))}

        <View className="w-[90%] flex-row items-center justify-evenly self-center py-3">
          <Image
            className="mr-3 h-[60px] w-[60px] rounded-full"
            source={{ uri: testDetails?.user.imageUrl ?? IMAGE_PLACEHOLDER }}
          />
          <View className="ml-3 w-[70%] flex-grow flex-col items-start justify-center">
            <Text
              className="font-nunito-bold w-[90%] text-lg leading-[32px] text-[#212121]"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {getFullName(
                testDetails.user.firstName,
                testDetails.user.lastName,
              )}
            </Text>
            <Text
              className="font-nunito-semibold w-[90%] text-[14px] leading-[19.6px] text-[#616161]"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              @{testDetails.user.username}
            </Text>
          </View>
          <TouchableOpacity
            onPress={
              isOwner
                ? goToMyProfileScreen()
                : goToOthersProfileScreen(notOwner ?? "")
            }
            className=" mt-5 items-center justify-center self-center rounded-full bg-[#6949FF] px-5 py-1"
          >
            <Text className="font-nunito-semibold text-center text-xs leading-[19.6px] text-white">
              View
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="font-nunito-bold mt-3 break-words text-xl font-bold leading-[32px] text-[#212121]">
          Description
        </Text>
        <Text className="font-nunito text-m mb-6 break-words font-medium leading-[25.20px] tracking-tight text-[#424242]">
          {testDetails?.description ?? "N/A"}
        </Text>

        {isOwner && questions && questions.length > 0 ? (
          <View className="mb-10 h-full flex-1 flex-col">
            <View className="mb-6 flex flex-row items-center justify-between">
              <Text className="text-xl font-bold leading-loose text-neutral-800">
                Question ({questions.length})
              </Text>
              <TouchableOpacity
                className="flex flex-row items-center gap-1"
                onPress={goToViewAllQuestions}
              >
                <Text className="font-nunito-bold w-70 text-right text-lg font-semibold leading-6 text-[#6949FF]">
                  View All
                </Text>
                <RightArrowIcon />
              </TouchableOpacity>
            </View>

            <SafeAreaView className="min-h-full flex-1">
              <FlashList
                estimatedItemSize={10}
                data={firstTenQuestions}
                showsVerticalScrollIndicator={true}
                renderItem={({ item: question, index }) => {
                  return <QuestionCard question={question} index={index} />;
                }}
              />
            </SafeAreaView>
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestDetailsContent;

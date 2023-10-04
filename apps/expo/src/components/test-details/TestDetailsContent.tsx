import React from "react";
import {
  View,
  Image,
  SafeAreaView,
  Dimensions,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IMAGE_PLACEHOLDER } from "../../constants";
import { AppButton } from "../buttons/AppButton";
import { trpc } from "../../utils/trpc";
import { useNavigation } from "@react-navigation/native";
import RightArrowIcon from "../../icons/RightArrowIcon";

import { match } from "ts-pattern";
import { IMAGE_PLACEHOLDER_LARGE } from "../../constants";

import type { FC } from "react";
import type { RouterOutputs } from "../../utils/trpc";
import { ScrollView } from "react-native-gesture-handler";
import { SkeletonLoader } from "../loaders/SkeletonLoader";
import { FlashList } from "@shopify/flash-list";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

interface Props {
  testDetails: RouterOutputs["test"]["getById"];
}

const TestDetailsContent: FC<Props> = ({ testDetails }) => {
  const navigation = useNavigation();

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
      <SafeAreaView className="mt-28 flex-1">
        <View className="h-[90%] w-[90%] items-center space-y-10 self-center">
          <View className=" h-[50%] w-[100%] items-center justify-center">
            <SkeletonLoader isCircular={true} width={"100%"} height={"100%"} />
          </View>
          <View className="h-[25%] w-[100%] items-center justify-evenly">
            <SkeletonLoader isCircular={false} width={"100%"} height={25} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const { isOwner, totalQuestions, totalPlays, totalFavorites, notOwner } =
    testStatistics;

  const { questions } = testDetails;

  const firstTenQuestions = questions.slice(0, 10);

  const statsData = [
    { number: totalQuestions, label: "Questions" },
    { number: totalPlays, label: "Played" },
    { number: totalFavorites, label: "Favorited" },
  ];

  const { id: testId } = testDetails;

  const handlePlayTest = () => {
    Alert.alert(
      "Play Test",
      "Are you sure you want to play this test?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Play",
          onPress: () =>
            playTest({
              testId,
            }),
        },
      ],
      { cancelable: false },
    );
  };

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

        <View className="mt-5 w-[87%] self-center border-b border-[#EEEEEE]"></View>

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

        <View className="w-[100%] flex-row items-center justify-evenly self-center py-3">
          <Image
            className="mr-3 h-[60px] w-[60px] rounded-full"
            source={{ uri: testDetails?.user.imageUrl ?? IMAGE_PLACEHOLDER }}
          />
          <View className="mx-1 flex-grow flex-col items-start justify-center">
            <Text className="font-nunito-bold text-lg leading-[32px] text-[#212121]">
              {testDetails?.user.firstName.length > 10 ||
              testDetails?.user.lastName.length > 10 ? (
                <>
                  {testDetails?.user.firstName.slice(0, 10)}
                  {testDetails?.user.firstName.length > 10 ? "..." : ""}
                  {"\n"}
                  {testDetails?.user.lastName.slice(0, 10)}
                  {testDetails?.user.lastName.length > 10 ? "..." : ""}
                </>
              ) : (
                `${testDetails?.user.firstName} ${testDetails?.user.lastName}`
              )}
            </Text>
            <Text className="font-nunito-semibold text-[14px] leading-[19.6px] text-[#616161]">
              @
              {testDetails?.user.username.length > 20 ? (
                <>
                  {testDetails?.user.username.slice(0, 20)}
                  {testDetails?.user.username.length > 20 ? "..." : ""}
                </>
              ) : (
                `${testDetails?.user.username}`
              )}
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

        {isOwner && questions.length > 0 ? (
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
                  return (
                    <TouchableOpacity
                      className="my-2 flex h-[105px] items-center justify-start"
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
            </SafeAreaView>
          </View>
        ) : (
          <>
            <HiddenQuestionSection />
          </>
        )}

        <AppButton
          onPress={handlePlayTest}
          text="Play Now"
          classNameValue="mb-10"
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
      </ScrollView>
    </SafeAreaView>
  );
};

const HiddenQuestionSection: FC = () => (
  <View className="mb-5 inline-flex h-[88px] w-[382px] flex-col items-center justify-center gap-2 self-center rounded-2xl border border-zinc-100 bg-neutral-50 p-4">
    <View className="inline-flex h-7 w-7 items-center justify-center px-[2.33px] pb-[3.18px] pt-[4.67px]">
      <Ionicons name="ios-eye-off-outline" size={24} color="black" />
    </View>
    <Text className="font-nunito self-stretch text-center text-sm font-semibold leading-tight tracking-tight text-neutral-500">
      Question content is not visible
    </Text>
  </View>
);

export default TestDetailsContent;

import React from "react";
import {
  View,
  Image,
  SafeAreaView,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IMAGE_PLACEHOLDER } from "../../constants";
import { AppButton } from "../buttons/AppButton";
import { trpc } from "../../utils/trpc";
import { useNavigation } from "@react-navigation/native";

import type { FC } from "react";
import type { RouterOutputs } from "../../utils/trpc";
import { ScrollView } from "react-native-gesture-handler";
import { SkeletonLoader } from "../loaders/SkeletonLoader";

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

  const { mutate: playTest } = trpc.test.play.useMutation({
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

  const { isOwner, totalQuestions, totalPlays, totalFavorites } =
    testStatistics;

  const statsData = [
    { number: totalQuestions, label: "Questions" },
    { number: totalPlays, label: "Played" },
    { number: totalFavorites, label: "Favorited" },
  ];

  const { id: testId } = testDetails;

  const handlePlayTest = () => {
    playTest({
      testId,
    });
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
            className="h-[60px] w-[60px] rounded-full"
            source={{ uri: testDetails?.user.imageUrl ?? IMAGE_PLACEHOLDER }}
          />
          <View className="mx-1 flex-grow flex-col items-start justify-center">
            <Text className="font-nunito-bold text-lg leading-[32px] text-[#212121]">
              {testDetails?.user.firstName} {testDetails?.user.lastName}
            </Text>
            <Text className="font-nunito-semibold text-[14px] leading-[19.6px] text-[#616161]">
              @{testDetails?.user.username}
            </Text>
          </View>
          <TouchableOpacity className=" mt-5 items-center justify-center rounded-full bg-[#6949FF] px-5 py-1">
            <Text className="font-nunito-semibold text-center text-xs leading-[19.6px] text-white">
              {isOwner ? "You" : "View"}
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="font-nunito mt-3 w-[87%] break-words text-xl font-bold leading-[32px] text-[#212121]">
          Description
        </Text>
        <Text className="font-nunito text-m mb-6 w-[87%] break-words font-medium leading-[25.20px] tracking-tight text-[#424242]">
          {testDetails?.description ?? "N/A"}
        </Text>

        <HiddenQuestionSection />

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
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const HiddenQuestionSection: FC = () => (
  <View className="mb-5 inline-flex h-[88px] w-[382px] flex-col items-center justify-center gap-2 self-center rounded-2xl border border-zinc-100 bg-neutral-50 p-4">
    <View className="inline-flex h-7 w-7 items-center justify-center px-[2.33px] pt-[4.67px] pb-[3.18px]">
      <Ionicons name="ios-eye-off-outline" size={24} color="black" />
    </View>
    <Text className="font-nunito self-stretch text-center text-sm font-semibold leading-tight tracking-tight text-neutral-500">
      Question content is not visible
    </Text>
  </View>
);

export default TestDetailsContent;

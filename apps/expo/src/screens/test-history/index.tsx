import React from "react";
import { View, Dimensions, Image, Text, ScrollView } from "react-native";
import { RootStackScreenProps } from "../../types";
import { FlashList } from "@shopify/flash-list";
import QuestionCard from "../../components/cards/QuestionCard";
import { ReusableHeader } from "../../components/headers/ReusableHeader";
import { Feather } from "@expo/vector-icons";
import { trpc } from "../../utils/trpc";
import { AppButton } from "../../components/buttons/AppButton";
import useGoBack from "../../hooks/useGoBack";

import { FC, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsHeader from "../../components/headers/SettingsHeader";
import { SkeletonLoader } from "../../components/loaders/SkeletonLoader";
import { AlertModal } from "../../components/modals/AlertModal";
import BadgeOverlay from "../../components/AcquiredBadgeOverlay";
import { IMAGE_PLACEHOLDER } from "../../constants";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

type TestHistoryProps = RootStackScreenProps<"TestHistory">;

export const TestHistoryScreen: FC<TestHistoryProps> = ({
  navigation,
  route,
}) => {
  const { height, width } = Dimensions.get("window");
  const { historyId, testId } = route.params;
  const { data: testHistory, isLoading: isFetchingUser } =
    trpc.testHistory.getUserHistoryById.useQuery({
      historyId,
    });

  const { data: newBadge } = trpc.user.getNewBadges.useQuery();

  const [openHomeAlert, setOpenHomeAlert] = useState(false);
  const [showBadgeOverlay, setShowBadgeOverlay] = useState(false);

  const goBack = useGoBack();

  useEffect(() => {
    if (newBadge) {
      if (newBadge?.hasNewBadge === true) {
        setShowBadgeOverlay(true);
      } else {
        setShowBadgeOverlay(false);
      }
    } else {
      setShowBadgeOverlay(false);
    }
  }, [newBadge]);

  const statsData = [
    { number: testHistory?.score ?? 0, label: "Points Earned" },
    { number: `${testHistory?.time ?? 0} seconds`, label: "Time Taken" },
  ];

  if (!testHistory || isFetchingUser) {
    return (
      <SafeAreaView className="flex-1" style={{ height: height, width: width }}>
        <SettingsHeader screenName={"Test History"} />

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
    );
  }

  const goToScoreBoard = () => {
    if (!testId) return;
    navigation.navigate("Scoreboard", {
      testId,
    });
  };

  const goToHome = () => {
    setOpenHomeAlert(true);
  };

  const goToQuestionHistory =
    (questionId: string, questionIndex: number) => () => {
      navigation.navigate("QuestionHistory", {
        questionId: questionId,
        questionIndex: questionIndex,
      });
    };

  return (
    <SafeAreaView
      style={{
        height: height,
        width: width,
      }}
    >
      <ReusableHeader
        screenName={testHistory?.title}
        backIcon={<Feather name="x" size={24} color="black" />}
        handleExit={testId ? goToHome : goBack}
      />

      <ScrollView
        className="mx-5 h-full w-[90%]"
        showsVerticalScrollIndicator={false}
      >
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
            source={{ uri: testHistory?.imageUrl ?? IMAGE_PLACEHOLDER }}
          />
        </View>

        <Text
          className="font-nunito my-3 w-[87%] break-words text-2xl font-bold leading-[38.40px] text-[#212121]"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          <Text className="font-nunito-bold w-[382px] text-2xl font-bold leading-[38.40px] text-neutral-800">
            {testHistory.title}
          </Text>
        </Text>

        <View className="w-[87%] self-center border-b border-[#EEEEEE]"></View>

        {Array.from({ length: 2 }).map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <View className="w-[90%] flex-row items-center justify-between self-center py-1">
              {statsData
                .slice(rowIndex * 3, rowIndex * 3 + 3)
                .map((stat, columnIndex) => (
                  <React.Fragment key={stat.label}>
                    <View className="w-1/2 flex-col items-center justify-center py-2 ">
                      <Text className="font-nunito-bold text-[20px] leading-[32px] text-[#212121]">
                        {stat.number}
                      </Text>
                      <Text className="font-nunito-semibold text-[16px] leading-[22.4px] text-[#424242]">
                        {stat.label}
                      </Text>
                    </View>
                    {columnIndex !== 1 && (
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

        <View className="flex-row items-center justify-evenly self-center py-3">
          <Image
            className="mr-3 h-[60px] w-[60px] rounded-full"
            source={{ uri: testHistory.creatorImage ?? IMAGE_PLACEHOLDER }}
          />
          <View className="ml-3 w-[70%] flex-grow flex-col items-start justify-center">
            <Text
              className="font-nunito-bold w-[90%] text-lg leading-[32px] text-[#212121]"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {testHistory.creatorName}
            </Text>
            <Text
              className="font-nunito-semibold w-[90%] text-[14px] leading-[19.6px] text-[#616161]"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              @{testHistory.creatorUsername}
            </Text>
          </View>
        </View>
        <Text className="font-nunito-bold mt-3 break-words text-xl font-bold leading-[32px] text-[#212121]">
          Description
        </Text>
        <Text className="font-nunito text-m mb-6 break-words font-medium leading-[25.20px] tracking-tight text-[#424242]">
          {testHistory?.description ?? "N/A"}
        </Text>
        <View className="mt-6 flex flex-row items-center justify-between">
          <Text className="text-xl font-bold leading-loose text-neutral-800">
            Question ({testHistory.questions.length})
          </Text>
        </View>
        <SafeAreaView className="min-h-full flex-1">
          <FlashList
            estimatedItemSize={10}
            data={testHistory?.questions ?? []}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: question, index }) => {
              const gotIncorrectAnswer = question.pointsEarned === 0;
              return (
                <QuestionCard
                  question={question}
                  index={index}
                  type="history"
                  goToQuestionHistory={goToQuestionHistory}
                  borderType={gotIncorrectAnswer ? "error" : "success"}
                />
              );
            }}
          />
        </SafeAreaView>
      </ScrollView>
      {testId && (
        <View className="mt-2 w-[90%] flex-row items-center justify-evenly self-center">
          <AppButton
            text="Go to Scoreboard"
            buttonColor="violet-600"
            borderShadowColor="indigo-800"
            borderRadius="full"
            fontStyle="bold"
            textColor="white"
            TOwidth="full"
            Vwidth="full"
            Vheight="12"
            onPress={goToScoreBoard}
            isLoading={isFetchingUser}
          />
        </View>
      )}
      <AlertModal
        isVisible={openHomeAlert}
        alertTitle={"Skip Scoreboard"}
        alertDescription={"Are you sure you want to skip the scoreboard?"}
        confirmButtonText={"Yes"}
        isCancelButtonVisible={true}
        cancelButtonText={"No"}
        onCancel={() => {
          setOpenHomeAlert(false);
        }}
        onConfirm={() => {
          navigation.navigate("Home");
        }}
      />

      <BadgeOverlay
        isVisible={showBadgeOverlay}
        badgeName={newBadge?.acquiredBadge || ""}
        onClose={() => setShowBadgeOverlay(false)}
      />
    </SafeAreaView>
  );
};

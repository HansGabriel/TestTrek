import { View, Dimensions } from "react-native";
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
import { getPointsBadge } from "../../functions/pointsBadgeHandlers";
import BadgeOverlay from "../../components/AcquiredBadgeOverlay";

type TestHistoryProps = RootStackScreenProps<"TestHistory">;

export const TestHistoryScreen: FC<TestHistoryProps> = ({
  navigation,
  route,
}) => {
  const { height, width } = Dimensions.get("window");
  const { historyId, testId } = route.params;
  const goBack = useGoBack();
  const [openHomeAlert, setOpenHomeAlert] = useState(false);
  const { data: testHistory, isLoading: isFetchingUser } =
    trpc.testHistory.getUserHistoryById.useQuery({
      historyId,
    });
  const { data: userPoints, isLoading: isLoadingPoints } =
    trpc.user.getTotalPoints.useQuery();
  const totalPoints = userPoints?.totalPoints;

  const { data: currentUserBadges, isLoading: isLoadingBadges } =
    trpc.user.getBadges.useQuery();

  const verifyAcquiredPointsBadge = (badgeName: string) => {
    const currentBadges = currentUserBadges?.badges;

    return currentBadges?.includes(badgeName);
  };

  const acquiredPointsBadge = totalPoints
    ? getPointsBadge(totalPoints)
    : getPointsBadge(0);

  const hasNewBadge =
    acquiredPointsBadge !== "none" &&
    !verifyAcquiredPointsBadge(acquiredPointsBadge);

  const [dataLoaded, setDataLoaded] = useState(false);
  const [showBadgeOverlay, setShowBadgeOverlay] = useState(hasNewBadge);

  const { mutate: updateBadges } = trpc.user.updateBadges.useMutation();

  useEffect(() => {
    if (!isLoadingPoints && !isLoadingBadges) {
      setDataLoaded(true);
    }
  }, [isLoadingPoints, isLoadingBadges]);

  useEffect(() => {
    if (dataLoaded) {
      const badge = getPointsBadge(userPoints?.totalPoints || 0);
      const hasNewBadge = badge !== "none" && !verifyAcquiredPointsBadge(badge);

      if (hasNewBadge) {
        setShowBadgeOverlay(true);
        updateBadges([badge]);
      }
    }
  }, [dataLoaded, userPoints?.totalPoints, currentUserBadges?.badges]);

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
      <View className="mx-5 h-full flex-1">
        <FlashList
          estimatedItemSize={10}
          data={testHistory?.questions ?? []}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: question, index }) => {
            return (
              <QuestionCard
                question={question}
                index={index}
                type="history"
                goToQuestionHistory={goToQuestionHistory}
              />
            );
          }}
        />
      </View>
      {testId && (
        <View className="mb-4 mt-10 w-[90%] flex-row items-center justify-evenly self-center">
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
        badgeName={acquiredPointsBadge}
        onClose={() => setShowBadgeOverlay(false)}
      />
    </SafeAreaView>
  );
};

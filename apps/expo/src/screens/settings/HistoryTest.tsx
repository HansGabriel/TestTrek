import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, View, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import SettingsHeader from "../../components/headers/SettingsHeader";
import { SkeletonLoader } from "../../components/loaders/SkeletonLoader";
import { trpc } from "../../utils/trpc";
import ViewAllScreenTestCard from "../../components/view-all-display/tests/ViewAllScreenTestCard";
import { IMAGE_PLACEHOLDER } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";

export const HistoryTestScreen = () => {
  const { height, width } = Dimensions.get("window");
  const navigation = useNavigation();

  const { data: testHistories, isLoading: isFetchingTestHistories } =
    trpc.testHistory.getUserTestHistories.useQuery();

  if (!testHistories || isFetchingTestHistories) {
    return (
      <SafeAreaView className="flex-1" style={{ height: height, width: width }}>
        <SettingsHeader screenName={"Test Histories"} />

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

  const goToTestHistoryDetailsScreen = (testHistoryId: string) => () => {
    navigation.navigate("TestHistory", {
      historyId: testHistoryId,
    });
  };

  return (
    <SafeAreaView className="flex-1" style={{ height: height, width: width }}>
      <SettingsHeader screenName={"Test Histories"} />
      <FlashList
        showsVerticalScrollIndicator={false}
        data={testHistories}
        estimatedItemSize={100}
        renderItem={({ item: testHistory, index }) => {
          const fullName = testHistory.creatorName;
          return (
            <TouchableOpacity
              key={index}
              onPress={goToTestHistoryDetailsScreen(testHistory.id)}
            >
              <ViewAllScreenTestCard
                imageSource={{ uri: testHistory.imageUrl }}
                title={testHistory.title}
                questions={testHistory.questions.length}
                date={new Date(testHistory.createdAt)}
                userImageSource={{
                  uri: testHistory.creatorImage ?? IMAGE_PLACEHOLDER,
                }}
                userName={fullName}
                plays={0}
                displayPlays={false}
              />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

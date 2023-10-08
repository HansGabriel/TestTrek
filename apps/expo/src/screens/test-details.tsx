import React from "react";
import { SafeAreaView, View } from "react-native";
import TestDetailsHeader from "../components/headers/TestDetailsHeader";
import TestDetailsContent from "../components/test-details/TestDetailsContent";
import { RootStackScreenProps } from "../types";
import { trpc } from "../utils/trpc";
import { useNavigation } from "@react-navigation/native";
import { SkeletonLoader } from "../components/loaders/SkeletonLoader";
import { ReusableHeader } from "../components/headers/ReusableHeader";
import StarIcon from "../icons/StarIcon";

export const TestDetailsScreen = ({
  route,
}: RootStackScreenProps<"TestDetails">) => {
  const navigation = useNavigation();
  const { testId } = route.params;

  const { data: testDetails } = trpc.test.getById.useQuery({ testId });
  const { data: testStatistics } = trpc.test.getDetails.useQuery({
    testId: testDetails?.id ?? "",
  });

  const goToEditTest = () => {
    navigation.navigate("EditTest", { testId });
  };

  if (!testDetails || !testStatistics) {
    return (
      <>
        <ReusableHeader screenName={""} optionIcon={<StarIcon />} />
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

  const { isOwner } = testStatistics;

  return (
    <SafeAreaView className="flex-1 flex-col">
      <TestDetailsHeader
        showEditIcon={isOwner}
        testId={testId}
        goToEditTest={goToEditTest}
      />
      <TestDetailsContent testDetails={testDetails} />
    </SafeAreaView>
  );
};

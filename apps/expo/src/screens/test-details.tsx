import React from "react";
import { SafeAreaView } from "react-native";
import TestDetailsHeader from "../components/headers/TestDetailsHeader";
import TestDetailsContent from "../components/test-details/TestDetailsContent";
import { RootStackScreenProps } from "../types";
import { trpc } from "../utils/trpc";
import { useNavigation } from "@react-navigation/native";
import ViewAllScreenHeader from "../components/headers/ViewAllScreenHeader";
import LoadingHeader from "../components/headers/LoadingHeader";

export const TestDetailsScreen = ({
  route,
}: RootStackScreenProps<"TestDetails">) => {
  const navigation = useNavigation();
  const { testId } = route.params;

  const { data: testDetails } = trpc.test.getById.useQuery({ testId });

  const goToEditTest = () => {
    navigation.navigate("EditTest", { testId });
  };

  if (!testDetails) {
    return (
      <>
        <SafeAreaView>
          <LoadingHeader title="Loding..." />
        </SafeAreaView>
      </>
    );
  }

  return (
    <SafeAreaView className="flex-1 flex-col">
      <TestDetailsHeader goToEditTest={goToEditTest} />
      <TestDetailsContent testDetails={testDetails} />
    </SafeAreaView>
  );
};

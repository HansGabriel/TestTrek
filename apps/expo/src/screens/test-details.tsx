import React from "react";
import { SafeAreaView } from "react-native";
import TestDetailsHeader from "../components/headers/TestDetailsHeader";
import TestDetailsImage from "../components/test-details/TestDetailsContent";

export const TestDetailsScreen = () => {
  return (
    <SafeAreaView className="flex-1 flex-col">
      <TestDetailsHeader />
      <TestDetailsImage />
    </SafeAreaView>
  );
};

import React from "react";
import { SafeAreaView } from "react-native";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ViewAllTestDisplay from "../components/view-all-display/tests/ViewAllTestDisplay";

type ViewAllScreenProps = NativeStackScreenProps<RootStackParamList, "ViewAll">;

export const ViewAllScreen = ({ route }: ViewAllScreenProps) => {
  const { fetchedData } = route.params;

  switch (fetchedData) {
    case "discoverTests": {
      return (
        <>
          <ViewAllTestDisplay testsFor="discover" />
        </>
      );
    }
    case "trendingTests": {
      return (
        <>
          <ViewAllTestDisplay testsFor="trending" />
        </>
      );
    }
    case "topPicksTest": {
      return (
        <>
          <ViewAllTestDisplay testsFor="topPicks" />
        </>
      );
    }
  }

  return <SafeAreaView className="flex-1 flex-col"></SafeAreaView>;
};

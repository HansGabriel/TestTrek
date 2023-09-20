import React from "react";
import { SafeAreaView } from "react-native";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ViewAllTestDisplay from "../components/view-all-display/tests/ViewAllTestDisplay";
import ViewAllUserDisplay from "../components/view-all-display/users/ViewAllUserDisplay";
import ViewAllCollectionsDisplay from "../components/view-all-display/collections/ViewAllCollectionsDisplay";

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
    case "topTrekers": {
      return (
        <>
          <ViewAllUserDisplay usersFor="topUsers" />
        </>
      );
    }
    case "topCollections": {
      return (
        <>
          <ViewAllCollectionsDisplay collectionsFor="topCollections" />
        </>
      );
    }
  }

  return <SafeAreaView className="flex-1 flex-col"></SafeAreaView>;
};

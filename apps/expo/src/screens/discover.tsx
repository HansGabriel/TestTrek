import React from "react";
import { SafeAreaView } from "react-native";
import DiscoverScreenHeader from "../components/headers/DiscoverScreenHeader";

export const DiscoverScreen = () => {
  return (
    <SafeAreaView className="flex-1 flex-col">
      <DiscoverScreenHeader />
    </SafeAreaView>
  );
};

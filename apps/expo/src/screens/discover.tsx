import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DiscoverScreenHeader from "../components/headers/DiscoverScreenHeader";

export const DiscoverScreen = () => {
  return (
    <SafeAreaView className="flex-1 flex-col">
      <DiscoverScreenHeader />
    </SafeAreaView>
  );
};

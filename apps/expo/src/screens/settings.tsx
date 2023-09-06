import React from "react";
import { SafeAreaView } from "react-native";
import SettingsHeader from "../components/headers/SettingsHeader";
import PremiumBanner from "../components/settings/PremiumBanner";
import SettingsButtons from "../components/settings/SettingsButtons";

export const SettingsScreen = () => {
  return (
    <SafeAreaView className="flex-1 flex-col">
      <SettingsHeader />
      <PremiumBanner />
      <SettingsButtons />
    </SafeAreaView>
  );
};

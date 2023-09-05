import React from "react";
import { SafeAreaView } from "react-native";
import ProfileHeader from "../components/headers/ProfileHeader";

export const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 flex-col">
      <ProfileHeader />
    </SafeAreaView>
  );
};

import React from "react";
import { SafeAreaView } from "react-native";
import ProfileHeader from "../components/headers/ProfileHeader";
import ProfileDetailsSection from "../components/profile-details/details-section/ProfileDetailsSection";

export const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 flex-col">
      <ProfileHeader />
      <ProfileDetailsSection />
    </SafeAreaView>
  );
};

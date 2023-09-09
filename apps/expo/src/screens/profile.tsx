import React, { useState } from "react";
import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";
import ProfileHeader from "../components/headers/ProfileHeader";
import ProfileDetailsSection from "../components/profile-details/details-section/ProfileDetailsSection";
import RectangleProfileIcon from "../icons/RectangleProfileIcon";
import { CollectionsTab } from "../components/Collections";
import { TabContent } from "./my-library";
import { AboutUser } from "../components/AboutUser";

enum Tabs {
  TESTS,
  COLLECTIONS,
  ABOUT,
}

export const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState(Tabs.TESTS);

  const changeButtonColor = (tab: Tabs) => {
    return activeTab === tab ? "bg-violet-600" : "bg-white";
  };

  const changeTextColor = (tab: Tabs) => {
    return activeTab === tab ? "text-white" : "text-violet-600";
  };

  return (
    <SafeAreaView className="flex-1 flex-col">
      <ProfileHeader />
      <RectangleProfileIcon />
      <ProfileDetailsSection />
      <View className="w-full flex-row items-center justify-start gap-4 pt-14 pl-2">
        <TouchableOpacity
          onPress={() => setActiveTab(Tabs.TESTS)}
          className={`h-9 w-28 items-center justify-center  rounded-[100px] border-2 border-violet-600 ${changeButtonColor(
            Tabs.TESTS,
          )}`}
        >
          <Text
            className={`${changeTextColor(
              Tabs.TESTS,
            )} font-nunito-semibold text-xs`}
          >
            Tests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(Tabs.COLLECTIONS)}
          className={`h-9 w-28 items-center justify-center  rounded-[100px] border-2 border-violet-600 ${changeButtonColor(
            Tabs.COLLECTIONS,
          )}`}
        >
          <Text
            className={`${changeTextColor(
              Tabs.COLLECTIONS,
            )} font-nunito-semibold text-xs`}
          >
            Collections
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(Tabs.ABOUT)}
          className={`h-9 w-28 items-center justify-center  rounded-[100px] border-2 border-violet-600 ${changeButtonColor(
            Tabs.ABOUT,
          )}`}
        >
          <Text
            className={`${changeTextColor(
              Tabs.ABOUT,
            )} font-nunito-semibold text-xs`}
          >
            About
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === Tabs.TESTS && (
        <View className="flex-1 px-4">
          <TabContent type="user" sort="newest" tabName={"Tests"} />
        </View>
      )}
      {activeTab === Tabs.COLLECTIONS && (
        <View className="flex-1 px-4">
          <CollectionsTab />
        </View>
      )}
      {activeTab === Tabs.ABOUT && (
        <View className="flex-1 px-4">
          <AboutUser />
        </View>
      )}
    </SafeAreaView>
  );
};

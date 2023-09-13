import React, { useState } from "react";
import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";
import ProfileHeader from "../components/headers/ProfileHeader";
import ProfileDetailsSection from "../components/profile-details/details-section/ProfileDetailsSection";
import RectangleProfileIcon from "../icons/RectangleProfileIcon";
import { CollectionsTab } from "../components/Collections";
import { TabContent } from "../components/TabContent";
import { AboutUser } from "../components/AboutUser";
import Footer from "../components/Footer";
import { trpc } from "../utils/trpc";

enum Tabs {
  TESTS,
  COLLECTIONS,
  ABOUT,
}

export const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState(Tabs.TESTS);
  const { data: testData } = trpc.testFilter.getAll.useQuery({
    testType: "user",
    sortBy: "newest",
  });

  const { data: collectionData } =
    trpc.collection.getByUserId.useQuery("newest");

  const changeButtonColor = (tab: Tabs) => {
    return activeTab === tab ? "bg-violet-600" : "bg-white";
  };

  const changeTextColor = (tab: Tabs) => {
    return activeTab === tab ? "text-white" : "text-violet-600";
  };

  return (
    <SafeAreaView className="flex-1 grid-rows-2">
      <ProfileHeader />
      <View className="items-center">
        <RectangleProfileIcon width={"90%"} />
        <ProfileDetailsSection />
      </View>

      <View className="flex-1 ">
        <View className="mt-40 h-10 w-full  flex-row justify-around self-center">
          <TouchableOpacity
            onPress={() => setActiveTab(Tabs.TESTS)}
            className={`w-[30%] items-center justify-center  rounded-[100px] border-2 border-violet-600 ${changeButtonColor(
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
            className={`w-[30%] items-center justify-center  rounded-[100px] border-2 border-violet-600 ${changeButtonColor(
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
            className={`w-[30%] items-center justify-center  rounded-[100px] border-2 border-violet-600 ${changeButtonColor(
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

        <View className="w-[90%] flex-1 self-center">
          {activeTab === Tabs.TESTS && <TabContent tabData={testData} />}
          {activeTab === Tabs.COLLECTIONS && (
            <CollectionsTab tabData={collectionData} />
          )}
          {activeTab === Tabs.ABOUT && <AboutUser />}
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

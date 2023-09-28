import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import ProfileHeader from "../components/headers/ProfileHeader";
import ProfileDetailsSection from "../components/profile-details/details-section/ProfileDetailsSection";
import RectangleProfileIcon from "../icons/RectangleProfileIcon";
import { CollectionsTab } from "../components/my-collections/Collections";
import { TabContent } from "../components/my-library/TabContent";
import { AboutUser } from "../components/AboutUser";
import Footer from "../components/Footer";
import { trpc } from "../utils/trpc";
import { SkeletonLoader } from "../components/loaders/SkeletonLoader";

enum Tabs {
  TESTS,
  COLLECTIONS,
  ABOUT,
}

export const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState(Tabs.TESTS);
  const { data: userData } = trpc.user.getUserDetails.useQuery();
  const { data: testData } = trpc.testFilter.getAll.useQuery({
    testType: "user",
    sortBy: "newest",
  });

  const { data: collectionData } = trpc.collection.getByUserId.useQuery({
    sortBy: "newest",
  });

  const { data: totalUserPlays } = trpc.user.getUserPlays.useQuery();

  const changeButtonColor = (tab: Tabs) => {
    return activeTab === tab ? "bg-violet-600" : "bg-white";
  };

  const changeTextColor = (tab: Tabs) => {
    return activeTab === tab ? "text-white" : "text-violet-600";
  };

  return (
    <SafeAreaView className="flex-1">
      {userData ? (
        <View className="flex-1">
          <ProfileHeader />
          <ScrollView
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[1]}
            style={{ flex: 1 }}
          >
            <View className="flex-1 items-center">
              <RectangleProfileIcon width={"90%"} />
              <ProfileDetailsSection
                userDetails={userData}
                testDetails={testData}
                collectionDetails={collectionData}
                totalPlays={totalUserPlays}
              />
            </View>

            <View className=" h-20 w-[90%] flex-row justify-around self-center bg-white py-5">
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

            <View className="min-h-screen w-[90%] flex-1 self-center">
              {activeTab === Tabs.TESTS && <TabContent tabData={testData} />}
              {activeTab === Tabs.COLLECTIONS && (
                <CollectionsTab tabData={collectionData} />
              )}
              {activeTab === Tabs.ABOUT && <AboutUser />}
            </View>
          </ScrollView>
          <Footer />
        </View>
      ) : (
        <View className="mt-20 h-[90%] w-[90%] items-center space-y-10 self-center">
          <View className=" h-[25%] w-[100%] items-center justify-center">
            <SkeletonLoader isCircular={true} width={"100%"} height={"75%"} />
          </View>
          <View className="h-[50%] w-[100%] items-center justify-evenly">
            <SkeletonLoader isCircular={false} width={"100%"} height={20} />
            <SkeletonLoader isCircular={false} width={"100%"} height={20} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

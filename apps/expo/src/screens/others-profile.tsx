import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import OthersProfileHeader from "../components/headers/OthersProfileHeader";
import RectangleProfileIcon from "../icons/RectangleProfileIcon";
import { CollectionsTab } from "../components/my-collections/Collections";
import { TabContent } from "../components/my-library/TabContent";
import { AboutUser } from "../components/AboutUser";
import { trpc } from "../utils/trpc";
import { SkeletonLoader } from "../components/loaders/SkeletonLoader";
import { RootStackScreenProps } from "../types";
import OthersProfileDetailsSection from "../components/profile-details/details-section/OthersProfileDetailsSection";

enum Tabs {
  TESTS,
  COLLECTIONS,
  ABOUT,
}

export const OthersProfileScreen = ({
  route,
}: RootStackScreenProps<"OthersProfile">) => {
  const [activeTab, setActiveTab] = useState(Tabs.TESTS);
  const { userId } = route.params;
  const { data: userData } = trpc.user.getUserById.useQuery({ userId: userId });
  const { data: testData } = trpc.testFilter.getByUserId.useQuery({
    userId: userId,
    testType: "user",
    sortBy: "newest",
  });

  const { data: collectionData } =
    trpc.collection.getCollectionsByUserId.useQuery({
      userId: userId,
      sortBy: "newest",
    });

  const { data: totalUserPlays } = trpc.user.getPlaysByUserId.useQuery({
    userId: userId,
  });

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
          <OthersProfileHeader />
          <ScrollView
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[1]}
            style={{ flex: 1 }}
          >
            <View className="flex-1 items-center">
              <RectangleProfileIcon width={"90%"} />
              <OthersProfileDetailsSection
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
        </View>
      ) : (
        <View className="mt-20 h-[90%] w-[90%] items-center space-y-10 self-center">
          <View className=" h-[25%] w-[100%] items-center justify-center">
            <SkeletonLoader isCircular={true} width={"100%"} height={"75%"} />
          </View>
          <View className="h-[50.7%] w-[100%] items-center justify-evenly">
            <SkeletonLoader isCircular={false} width={"100%"} height={20} />
            <SkeletonLoader isCircular={false} width={"100%"} height={20} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

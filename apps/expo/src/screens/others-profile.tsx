import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import OthersProfileHeader from "../components/headers/OthersProfileHeader";
import RectangleProfileIcon from "../icons/RectangleProfileIcon";
import { CollectionsTab } from "../components/my-collections/Collections";
import { AboutUser } from "../components/AboutUser";
import { trpc } from "../utils/trpc";
import { SkeletonLoader } from "../components/loaders/SkeletonLoader";
import { RootStackScreenProps } from "../types";
import Footer from "../components/Footer";
import OthersProfileDetailsSection from "../components/profile-details/details-section/OthersProfileDetailsSection";
import { LibraryTabs } from "../components/my-library/LibraryTabs";
import { SafeAreaView } from "react-native-safe-area-context";

enum Tabs {
  TESTS,
  COLLECTIONS,
  ABOUT,
}

export const OthersProfileScreen = ({
  route,
}: RootStackScreenProps<"OthersProfile">) => {
  const { height, width } = Dimensions.get("window");
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

  if (!userData || !testData || !collectionData || !totalUserPlays) {
    return (
      <>
        <SafeAreaView
          className="flex-1"
          style={{
            height: height,
            width: width,
          }}
        >
          <OthersProfileHeader />
          <View className="h-[80%] w-[90%] items-center space-y-10 self-center">
            <View className=" h-[25%] w-[100%] items-center justify-center">
              <SkeletonLoader isCircular={true} width={"100%"} height={"75%"} />
            </View>
            <View className="h-[54%] w-[100%] items-center justify-evenly">
              <SkeletonLoader isCircular={true} width={"100%"} height={20} />
              <SkeletonLoader isCircular={true} width={"100%"} height={20} />
            </View>
            <View>
              <Footer />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        height: height,
        width: width,
      }}
    >
      <OthersProfileHeader />
      <View className="flex-1">
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

          <View
            className="w-[90%] flex-1 self-center"
            style={{
              minHeight: 100,
            }}
          >
            {activeTab === Tabs.TESTS && <LibraryTabs tabData={testData} />}
            {activeTab === Tabs.COLLECTIONS && (
              <CollectionsTab tabData={collectionData} tabType="view" />
            )}
            {activeTab === Tabs.ABOUT && (
              <AboutUser aboutUser={userData.about} />
            )}
          </View>
        </ScrollView>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

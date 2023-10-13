import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import TinyTestTrekIcon from "../icons/logos/TinyTestTrekIcon";
import { useEffect, useState } from "react";
import { HeaderAndContent } from "../components/my-library/HeaderAndContent";
import Footer from "../components/Footer";
import SearchIcon from "../icons/SearchIcon";
import { SearchField } from "../components/search/SearchField";
import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import { trpc } from "../utils/trpc";
import { useNavigation } from "@react-navigation/native";
import { ReviewerHeaderAndContent } from "../components/my-reviewer/ReviewerHeaderAndContent";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

export const MyLibraryScreen = () => {
  const { refetch: refetchUserTests } = trpc.testFilter.getAll.useQuery({
    testType: "user",
    sortBy: "newest",
  });

  const { refetch: refetchFavoriteTests } = trpc.testFilter.getAll.useQuery({
    testType: "favorite",
    sortBy: "newest",
  });

  const { refetch: refetchOtherTests } = trpc.testFilter.getAll.useQuery({
    testType: "other",
    sortBy: "newest",
  });

  const { refetch: refetchCollections } = trpc.collection.getByUserId.useQuery({
    sortBy: "newest",
  });

  const { refetch: refetchReviewers } = trpc.reviewer.getAllReviewers.useQuery({
    reviewerType: "user",
    sortBy: "newest",
  });

  const { refetch: refetchOtherReviewers } =
    trpc.reviewer.getAllReviewers.useQuery({
      reviewerType: "other",
      sortBy: "newest",
    });

  const [testButtonPressed, setTestButtonPressed] = useState(true);
  const [favoriteButtonPressed, setFavoriteButtonPressed] = useState(false);
  const [otherButtonPressed, setOtherButtonPressed] = useState(false);
  const [reviewerButtonPressed, setReviewerButtonPressed] = useState(true);
  const [otherReviewerButtonPressed, setOtherReviewerButtonPressed] =
    useState(false);
  const navigation = useNavigation();

  const onTestButtonPressed = () => {
    setTestButtonPressed(true);
    setFavoriteButtonPressed(false);
    setOtherButtonPressed(false);
  };
  const onFavoriteButtonPressed = () => {
    setFavoriteButtonPressed(true);
    setTestButtonPressed(false);
    setOtherButtonPressed(false);
  };
  const onOtherButtonPressed = () => {
    setOtherButtonPressed(true);
    setFavoriteButtonPressed(false);
    setTestButtonPressed(false);
  };

  const onReviewerButtonPressed = () => {
    setReviewerButtonPressed(true);
    setOtherReviewerButtonPressed(false);
  };

  const onOtherReviewerButtonPressed = () => {
    setReviewerButtonPressed(false);
    setOtherReviewerButtonPressed(true);
  };

  const changeTestButtonColor = (pressed: boolean) => {
    return pressed ? "bg-violet-600" : "bg-white";
  };

  const changeTestTextColor = (pressed: boolean) => {
    return pressed ? "text-white" : "text-violet-600";
  };

  const changeReviewerButtonColor = (pressed: boolean) => {
    return pressed ? "bg-violet-600" : "bg-white";
  };

  const changeReviewerTextColor = (pressed: boolean) => {
    return pressed ? "text-white" : "text-violet-600";
  };

  const [query, setQuery] = useState("");
  const [isSearchPressed, setIsSearchPressed] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const updateQuery = (input: string) => {
    setQuery(input);
  };

  const handlePressed = () => {
    setIsSearchPressed(!isSearchPressed);
    setIsClicked(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetchCollections();
      refetchUserTests();
      refetchFavoriteTests();
      refetchOtherTests();
      refetchReviewers();
      refetchOtherReviewers();
    });

    return unsubscribe;
  }, [navigation]);

  const { height, width } = Dimensions.get("window");

  return (
    <SafeAreaView style={{ flex: 1, height: height, width: width }}>
      <SafeAreaView className="mx-6 flex-row items-center justify-between space-x-4">
        {isSearchPressed ? (
          <View className="sticky z-50 flex-row justify-between self-center bg-white">
            <SearchField
              searchString={query}
              onChange={updateQuery}
              onClose={() => setIsSearchPressed(false)}
              clicked={isClicked}
              setClicked={() => setIsClicked(!isClicked)}
            />
          </View>
        ) : (
          <Animated.View
            className="sticky top-0 z-50 h-full w-full flex-row justify-between bg-white pb-3"
            entering={SlideInLeft}
            exiting={SlideOutLeft}
          >
            <View className="flex-row gap-4">
              <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
                className="self-center"
              >
                <LeftArrowIcon />
              </TouchableOpacity>
              <TinyTestTrekIcon />
              <Text className=" font-nunito-bold text-2xl">Library</Text>
            </View>
            <TouchableOpacity onPress={handlePressed}>
              <SearchIcon />
            </TouchableOpacity>
          </Animated.View>
        )}
      </SafeAreaView>

      <Tab.Navigator
        className="mx-4"
        sceneContainerStyle={{
          backgroundColor: "white",
        }}
        screenOptions={{
          tabBarInactiveTintColor: "rgba(158, 158, 158, 1)",
          tabBarActiveTintColor: "rgba(105, 73, 255, 1)",
          tabBarLabelStyle: {
            fontFamily: "Nunito-Bold",
            fontSize: 14,
            textTransform: "none",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "rgba(105, 73, 255, 1)",
          },
        }}
      >
        <Tab.Screen name="Tests" options={{ title: "Tests" }}>
          {() => (
            <SafeAreaView className=" flex-1">
              <View className="w-full flex-row items-center justify-evenly gap-1 ">
                <TouchableOpacity
                  onPress={onTestButtonPressed}
                  className={`h-10 w-24 items-center justify-center  rounded-[100px] border-2 border-violet-600 ${changeTestButtonColor(
                    testButtonPressed,
                  )}`}
                >
                  <Text
                    className={`${changeTestTextColor(
                      testButtonPressed,
                    )} font-nunito-semibold`}
                  >
                    My Tests
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onFavoriteButtonPressed}
                  className={`h-10 w-24 items-center justify-center  rounded-[100px] border-2 border-violet-600 ${changeTestButtonColor(
                    favoriteButtonPressed,
                  )}`}
                >
                  <Text
                    className={`${changeTestTextColor(
                      favoriteButtonPressed,
                    )} font-nunito-semibold`}
                  >
                    Favorites
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onOtherButtonPressed}
                  className={`h-10 w-24 items-center justify-center  rounded-[100px] border-2 border-violet-600 ${changeTestButtonColor(
                    otherButtonPressed,
                  )}`}
                >
                  <Text
                    className={`${changeTestTextColor(
                      otherButtonPressed,
                    )} font-nunito-semibold`}
                  >
                    Other Tests
                  </Text>
                </TouchableOpacity>
              </View>

              {testButtonPressed ? (
                <View className="flex-1">
                  <HeaderAndContent tab={"user"} tabType={"Test"} />
                </View>
              ) : (
                ""
              )}

              {favoriteButtonPressed ? (
                <View className="flex-1">
                  <HeaderAndContent tab={"favorite"} tabType={"Test"} />
                </View>
              ) : (
                ""
              )}

              {otherButtonPressed ? (
                <View className="flex-1">
                  <HeaderAndContent tab={"other"} tabType={"Test"} />
                </View>
              ) : (
                ""
              )}
            </SafeAreaView>
          )}
        </Tab.Screen>
        <Tab.Screen name="Collections" options={{ title: "Collections" }}>
          {() => (
            <View className="flex-1">
              <HeaderAndContent tab={"user"} tabType={"Collection"} />
            </View>
          )}
        </Tab.Screen>
        <Tab.Screen name="Reviewers" options={{ title: "Reviewers" }}>
          {() => (
            <SafeAreaView className="flex-1">
              <View className="w-full flex-row items-center justify-evenly gap-1 ">
                <TouchableOpacity
                  onPress={onReviewerButtonPressed}
                  className={`h-10 w-32 items-center justify-center  rounded-[100px] border-2 border-violet-600 ${changeReviewerButtonColor(
                    reviewerButtonPressed,
                  )}`}
                >
                  <Text
                    className={`${changeReviewerTextColor(
                      reviewerButtonPressed,
                    )} font-nunito-semibold`}
                  >
                    My Reviewers
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onOtherReviewerButtonPressed}
                  className={`h-10 w-32 items-center justify-center  rounded-[100px] border-2 border-violet-600 ${changeReviewerButtonColor(
                    otherReviewerButtonPressed,
                  )}`}
                >
                  <Text
                    className={`${changeReviewerTextColor(
                      otherReviewerButtonPressed,
                    )} font-nunito-semibold`}
                  >
                    Other Reviewers
                  </Text>
                </TouchableOpacity>
              </View>

              {reviewerButtonPressed ? (
                <View className="flex-1">
                  <ReviewerHeaderAndContent tab="user" />
                </View>
              ) : (
                ""
              )}

              {otherReviewerButtonPressed ? (
                <View className="flex-1">
                  <ReviewerHeaderAndContent tab="other" />
                </View>
              ) : (
                ""
              )}
            </SafeAreaView>
          )}
        </Tab.Screen>
      </Tab.Navigator>
      <Footer />
    </SafeAreaView>
  );
};

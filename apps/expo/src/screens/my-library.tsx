import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
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

  const [pressed, setPressed] = useState(false);
  const navigation = useNavigation();

  const onPressed = () => {
    setPressed(!pressed);
  };

  const changeButtonColor = (pressed: boolean) => {
    return pressed ? "bg-violet-600" : "bg-white";
  };

  const changeTextColor = (pressed: boolean) => {
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
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaView className="mx-6 mt-10 flex-row items-center justify-between space-x-4">
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
            className="sticky top-0 z-50 h-full w-full flex-row justify-between bg-white pt-2 pb-3"
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
        <Tab.Screen name="MyTests" options={{ title: "My Tests" }}>
          {() => (
            <SafeAreaView className="my-5 flex-1">
              <View className="w-full flex-row items-center justify-evenly gap-1 ">
                <TouchableOpacity
                  onPress={onPressed}
                  className={`h-10 w-32 items-center justify-center  rounded-[100px] border-2 border-violet-600 ${changeButtonColor(
                    !pressed,
                  )}`}
                >
                  <Text
                    className={`${changeTextColor(
                      !pressed,
                    )} font-nunito-semibold`}
                  >
                    Tests
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onPressed}
                  className={`h-10 w-32 items-center justify-center  rounded-[100px] border-2 border-violet-600 ${changeButtonColor(
                    pressed,
                  )}`}
                >
                  <Text
                    className={`${changeTextColor(
                      pressed,
                    )} font-nunito-semibold`}
                  >
                    Collections
                  </Text>
                </TouchableOpacity>
              </View>

              {!pressed ? (
                <View className="flex-1">
                  <HeaderAndContent tab={"user"} tabType={"Test"} />
                </View>
              ) : (
                <View className="flex-1">
                  <HeaderAndContent tab={"user"} tabType={"Collection"} />
                </View>
              )}
            </SafeAreaView>
          )}
        </Tab.Screen>
        <Tab.Screen name="Favorites" options={{ title: "Favorites" }}>
          {() => (
            <View className="flex-1">
              <HeaderAndContent tab={"favorite"} tabType={"Test"} />
            </View>
          )}
        </Tab.Screen>
        <Tab.Screen name="OtherTests" options={{ title: "Other Tests" }}>
          {() => (
            <View className="flex-1">
              <HeaderAndContent tab={"other"} tabType={"Test"} />
            </View>
          )}
        </Tab.Screen>
      </Tab.Navigator>
      <Footer />
    </SafeAreaView>
  );
};

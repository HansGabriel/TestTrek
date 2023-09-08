import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import TinyTestTrekIcon from "../icons/logos/TinyTestTrekIcon";
import { AntDesign } from "@expo/vector-icons";
import { LibraryTabs } from "../components/LibraryTabs";
import { trpc } from "../utils/trpc";
import { Feather } from "@expo/vector-icons";
import useGoBack from "../hooks/useGoBack";
import { useState } from "react";
import { CollectionsTab } from "../components/Collections";
import { TotalAndSortHeader } from "../components/TotalAndSortHeader";

interface Props {
  type: "user" | "favorite" | "other";
  sort: "newest" | "oldest" | "alphabetical";
  tabName: "Tests" | "Favorites" | "Other Tests";
}

const Tab = createMaterialTopTabNavigator();

export const TabContent = ({ type, sort, tabName }: Props) => {
  const { data } = trpc.testFilter.getAll.useQuery({
    testType: type,
    sortBy: sort,
  });

  return data?.length !== 0 ? (
    <View className="flex-1">
      <TotalAndSortHeader total={data?.length} tab={tabName} filter={sort} />
      <LibraryTabs tabData={data} />
    </View>
  ) : (
    <View className="flex-1 items-center justify-center">
      <Text>Empty Section</Text>
    </View>
  );
};

export const MyLibraryScreen = () => {
  const [pressed, setPressed] = useState(false);

  const onPressed = () => {
    setPressed(!pressed);
  };

  const changeButtonColor = (pressed: boolean) => {
    return pressed ? "bg-violet-600" : "bg-white";
  };

  const changeTextColor = (pressed: boolean) => {
    return pressed ? "text-white" : "text-violet-600";
  };

  const goBack = useGoBack();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaView className="my-10 mx-6 flex-row items-center justify-between space-x-4">
        <View className="flex-row gap-4">
          <TouchableOpacity onPress={goBack}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
          <TinyTestTrekIcon />
          <Text className=" font-nunito-bold text-2xl">Library</Text>
        </View>
        <AntDesign name="search1" size={24} color="black" />
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
            <SafeAreaView className="my-6 flex-1">
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
                  <TabContent type="user" sort="newest" tabName={"Tests"} />
                </View>
              ) : (
                <View className="flex-1">
                  <CollectionsTab />
                </View>
              )}
            </SafeAreaView>
          )}
        </Tab.Screen>
        <Tab.Screen name="Favorites" options={{ title: "Favorites" }}>
          {() => (
            <View className="flex-1">
              <TabContent type="favorite" sort="newest" tabName={"Favorites"} />
            </View>
          )}
        </Tab.Screen>
        <Tab.Screen name="OtherTests" options={{ title: "Other Tests" }}>
          {() => (
            <View className="flex-1">
              <TabContent type="other" sort="newest" tabName={"Other Tests"} />
            </View>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

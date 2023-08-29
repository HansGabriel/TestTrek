import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, SafeAreaView, Text } from "react-native";
import TinyTestTrekIcon from "../icons/logos/TinyTestTrekIcon";
import { AntDesign } from "@expo/vector-icons";
import { LibraryTabs } from "../components/LibraryTabs";

const Tab = createMaterialTopTabNavigator();

const MyTests = () => {
  return <LibraryTabs tabName="My Tests" />;
};

const Favorites = () => {
  return <LibraryTabs tabName="Favorites" />;
};

const OtherTests = () => {
  return <LibraryTabs tabName="Other Tests" />;
};

export const MyLibrary = () => {
  return (
    <>
      <SafeAreaView className="my-10 mx-6 flex-row items-center justify-between space-x-4">
        <View className="flex-row gap-4">
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
          tabBarIndicatorStyle: { backgroundColor: "rgba(105, 73, 255, 1)" },
        }}
      >
        <Tab.Screen
          name="MyTests"
          component={MyTests}
          options={{ title: "My Tests" }}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{ title: "Favorites" }}
        />
        <Tab.Screen
          name="Other Tests"
          component={OtherTests}
          options={{ title: "Other Tests" }}
        />
      </Tab.Navigator>
    </>
  );
};

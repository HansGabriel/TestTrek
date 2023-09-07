import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, SafeAreaView, Text } from "react-native";
import TinyTestTrekIcon from "../icons/logos/TinyTestTrekIcon";
import { AntDesign } from "@expo/vector-icons";
import { LibraryTabs } from "../components/LibraryTabs";
import useGoBack from "../hooks/useGoBack";
import { trpc } from "../utils/trpc";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  type: "user" | "favorite" | "other";
  sort: "newest" | "oldest" | "alphabetical";
}

const Tab = createMaterialTopTabNavigator();

const TabContent = ({ type, sort }: Props) => {
  const { data } = trpc.testFilter.getAll.useQuery({
    testType: type,
    sortBy: sort,
  });

  return data?.length !== 0 ? (
    <LibraryTabs tabData={data} />
  ) : (
    <View className="flex-1 items-center justify-center">
      <Text>Empty Section</Text>
    </View>
  );
};

export const MyLibraryScreen = () => {
  const goBack = useGoBack();
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView className="my-10 mx-6 flex-row items-center justify-between space-x-4">
        <TouchableOpacity className="flex-row gap-4" onPress={goBack}>
          <TinyTestTrekIcon />
          <Text className=" font-nunito-bold text-2xl">Library</Text>
        </TouchableOpacity>
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
        <Tab.Screen name="MyTests" options={{ title: "My Tests" }}>
          {() => <TabContent type="user" sort="newest" />}
        </Tab.Screen>
        <Tab.Screen name="Favorites" options={{ title: "Favorites" }}>
          {() => <TabContent type="favorite" sort="newest" />}
        </Tab.Screen>
        <Tab.Screen name="OtherTests" options={{ title: "Other Tests" }}>
          {() => <TabContent type="other" sort="newest" />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

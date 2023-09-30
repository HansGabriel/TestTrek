import { View, Text, TouchableOpacity } from "react-native";
import { HomeLightIcon, HomeBoldIcon } from "../icons/footer/HomeIcons";
import {
  CategoryBoldIcon,
  CategoryLightIcon,
} from "../icons/footer/CategoryIcons";
import CreateNewIcon from "../icons/footer/CreateNewIcon";
import {
  ProfileBoldIcon,
  ProfileLightIcon,
} from "../icons/footer/ProfileIcons";
import { useNavigation, useRoute } from "@react-navigation/native";

import type { FC } from "react";

const Footer: FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const goToHomeScreen = () => {
    navigation.navigate("Home");
  };

  const goToCreateTestScreen = () => {
    navigation.navigate("CreateTest");
  };

  const goToMyLibraryScreen = () => {
    navigation.navigate("MyLibrary");
  };

  const goToProfileScreen = () => {
    navigation.navigate("Profile");
  };

  return (
    <View className="items-center justify-center rounded-t-3xl border-r-[1px] border-l-[1px] border-t-[1px] border-gray-200">
      <View className="flex-row items-center space-x-5 px-8 pt-5 pb-8">
        <TouchableOpacity
          onPress={goToHomeScreen}
          style={{ marginHorizontal: 25 }}
        >
          <View className="flex-col items-center space-y-1">
            {route.name === "Home" ? <HomeBoldIcon /> : <HomeLightIcon />}
            <Text className="text-center text-xs font-bold tracking-wider text-gray-500">
              Home
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToMyLibraryScreen}
          style={{ marginHorizontal: 25 }}
        >
          <View className="flex-col items-center space-y-1">
            {route.name === "MyLibrary" ? (
              <CategoryBoldIcon />
            ) : (
              <CategoryLightIcon />
            )}
            <Text className=" text-center text-xs font-medium tracking-wider text-gray-500">
              Library
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goToCreateTestScreen}
          style={{ marginHorizontal: 25 }}
        >
          <View className="flex-col items-center space-y-1">
            <CreateNewIcon />
            <Text className=" text-center text-xs font-medium tracking-wider text-gray-500">
              Create
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginHorizontal: 25 }}
          onPress={goToProfileScreen}
        >
          <View className="flex-col items-center space-y-1">
            {route.name === "Profile" ? (
              <ProfileBoldIcon />
            ) : (
              <ProfileLightIcon />
            )}
            <Text className=" text-center text-xs font-medium tracking-wider text-gray-500">
              Profile
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;

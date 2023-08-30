import { View, Text, TouchableOpacity } from "react-native";
import HomeBoldIcon from "../icons/footer/HomeBoldIcon";
import CategoryIcon from "../icons/footer/CategoryIcon";
import LogoIcon from "../icons/footer/LogoIcon";
import CreateNewIcon from "../icons/footer/CreateNewIcon";
import ProfileIcon from "../icons/footer/ProfileIcon";
import { useNavigation } from "@react-navigation/native";

import type { FC } from "react";

const Footer: FC = () => {
  const navigation = useNavigation();

  const goToHomeScreen = () => {
    navigation.navigate("Home");
  };

  const goToCreateTestScreen = () => {
    navigation.navigate("CreateTest");
  };

  return (
    <View className="items-center rounded-t-3xl border-r-[1px] border-l-[1px] border-t-[1px] border-gray-200">
      <View className="flex-row items-center justify-center space-x-5 px-8 pb-8 pt-5">
        <TouchableOpacity
          onPress={goToHomeScreen}
          style={{ marginHorizontal: 15 }}
        >
          <View className="flex-col items-center space-y-1">
            <HomeBoldIcon />
            <Text className="w-full text-center text-xs font-bold tracking-wider text-gray-500">
              Home
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 15 }}>
          <View className="flex-col items-center space-y-1">
            <CategoryIcon />
            <Text className="w-full text-center text-xs font-medium tracking-wider text-gray-500">
              Library
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 15 }}>
          <View className="flex-col items-center space-y-1">
            <View className="items-center justify-center space-x-1 rounded-full p-1">
              <LogoIcon />
            </View>
            <Text className="w-full text-center text-xs font-medium tracking-wider text-gray-500">
              Join
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToCreateTestScreen}
          style={{ marginHorizontal: 15 }}
        >
          <View className="flex-col items-center space-y-1">
            <CreateNewIcon />
            <Text className="w-full text-center text-xs font-medium tracking-wider text-gray-500">
              Create
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 15 }}>
          <View className="flex-col items-center space-y-1">
            <ProfileIcon />
            <Text className="w-full text-center text-xs font-medium tracking-wider text-gray-500">
              Profile
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;

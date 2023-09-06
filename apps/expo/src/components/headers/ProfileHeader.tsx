import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import SettingsIcon from "../../icons/SettingsIcon";

import type { FC } from "react";

const ProfileHeader: FC = ({}) => {
  const navigation = useNavigation();
  return (
    <>
      <View className="sticky top-9 z-50 mx-6 mb-10 flex flex-row justify-between bg-white py-5">
        <TouchableOpacity
          className="flex flex-row items-center gap-4"
          onPress={() => navigation.navigate("Home")}
        >
          <LeftArrowIcon />
          <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
            Profile
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row items-center gap-4">
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <SettingsIcon />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ProfileHeader;

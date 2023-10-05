import React from "react";
import { TouchableOpacity, Text } from "react-native";
import type { FC } from "react";
import { useNavigation } from "@react-navigation/native";

const EditProfileButton: FC = () => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate('MyStatistics')} className="items-center justify-center rounded-full bg-[#6949FF] px-3 py-1">
      <Text className="font-nunito-semibold text-center text-[12px] leading-[19.6px] text-white">
        View Stats
      </Text>
    </TouchableOpacity>
  );
};

export default EditProfileButton;

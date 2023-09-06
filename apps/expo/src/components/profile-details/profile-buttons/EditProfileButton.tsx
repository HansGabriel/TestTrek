import React from "react";
import { TouchableOpacity, Text } from "react-native";
import type { FC } from "react";

const EditProfileButton: FC = () => {
  return (
    <TouchableOpacity className="mr-3 mt-5 items-center justify-center rounded-full bg-[#6949FF] px-5 py-1">
      <Text className="font-nunito-semibold text-center text-[12px] leading-[19.6px] text-white">
        Edit Profile
      </Text>
    </TouchableOpacity>
  );
};

export default EditProfileButton;

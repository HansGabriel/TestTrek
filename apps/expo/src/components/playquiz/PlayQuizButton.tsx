import React from "react";
import { TouchableOpacity, Text } from "react-native";
import type { FC } from "react";

const PlayQuizButton: FC = () => {
  return (
    <TouchableOpacity className="h-[32px] w-[113px] items-center justify-center rounded-full bg-white">
      <Text className="text-black">Find Friends</Text>
    </TouchableOpacity>
  );
};

export default PlayQuizButton;

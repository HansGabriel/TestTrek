import React from "react";
import { TouchableOpacity, Text } from "react-native";
import type { FC } from "react";

const PlayQuizButton: FC = () => {
  return (
    <TouchableOpacity className="h-[24px] w-[100px] items-center justify-center rounded-full bg-white">
      <Text
        style={{ fontSize: 13, color: "#6949FF" }}
        className="text-5xs text-black"
      >
        Find Friends
      </Text>
    </TouchableOpacity>
  );
};

export default PlayQuizButton;

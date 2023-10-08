import React from "react";
import { View, Text } from "react-native";

import type { FC } from "react";
import { ReusablePlaceholder } from "../placeholders/ReusablePlaceholder";
import { FontAwesome } from "@expo/vector-icons";

interface AboutUserProps {
  aboutUser: string | null;
}

export const AboutUser: FC<AboutUserProps> = ({ aboutUser }) => {
  if (!aboutUser) {
    return (
      <View>
        <ReusablePlaceholder
          icon={<FontAwesome name="info-circle" size={40} color="#7c3aed" />}
          text={`Tell us about yourself`}
          marginY={5}
        />
      </View>
    );
  }

  return (
    <>
      <View className="mx-3 mb-2">
        <Text className=" font-nunito-bold text-lg">About Me</Text>
      </View>
      <View className=" mb-5 h-full w-full flex-1 self-center rounded-xl border border-zinc-100">
        <View className="mx-2 my-2">
          <Text className=" font-nunito-semibold">{aboutUser}</Text>
        </View>
      </View>
    </>
  );
};

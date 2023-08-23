import React from "react";

import { View, TouchableOpacity, Text } from "react-native";

import WalktrhoughIcon1 from "../icons/WalkthroughIcon1";
import WalktrhoughIcon2 from "../icons/WalktrhoughIcon2";
import WalktrhoughIcon3 from "../icons/WalkthroughIcon3";

import Swiper from "react-native-swiper";

import type { RootStackScreenProps } from "../types";
import type { FC } from "react";

type Props = RootStackScreenProps<"Walkthrough">;

export const WaltkthroughScreen: FC<Props> = ({ navigation }) => {
  return (
    <View className="flex-1 items-center">
      <Swiper index={1} loop={true}>
        <View className="mb-8 flex-1 items-center justify-center">
          <WalktrhoughIcon1 />
          <Text className="font-nunito-bold mt-10 w-[382px] text-center text-[32px] leading-[51.20px] text-neutral-800">
            Create, share and play quizzes whenever and wherever you want
          </Text>
        </View>
        <View className="mb-8 flex-1 items-center justify-center">
          <WalktrhoughIcon2 />
          <Text className="font-nunito-bold mt-10 w-[382px] text-center text-[32px] leading-[51.20px] text-neutral-800">
            Find fun and interesting quizzes to boost up your knowledge
          </Text>
        </View>
        <View className="mb-8 flex-1 items-center justify-center">
          <WalktrhoughIcon3 />
          <Text className="font-nunito-bold mt-10 w-[382px] text-center text-[32px] leading-[51.20px] text-neutral-800">
            Play and take quiz challenges together with your friends.
          </Text>
        </View>
      </Swiper>
      <TouchableOpacity className="mb-5 h-[58px] w-11/12 items-center justify-center gap-1 rounded-[100px] border-b-2 border-indigo-700 bg-violet-600 px-4">
        <Text className="font-nunito-bold text-white">GET STARTED</Text>
      </TouchableOpacity>
      <TouchableOpacity className="mb-10 h-[58px] w-11/12 items-center justify-center gap-1 rounded-[100px] border-b-2 border-violet-300 bg-violet-100 px-4">
        <Text className="font-nunito-bold text-violet-600">
          I ALREADY HAVE AN ACCOUNT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

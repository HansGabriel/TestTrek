import * as React from "react";
import { Image, Text, View } from "react-native";
import DiscoverHomeCardType from "../types/discoverHomeCard";
import type { FC } from "react";

const DiscoverHomeCard: FC<DiscoverHomeCardType> = (props) => {
  return (
    <View className="ml-3 h-72 w-56  items-center bg-white p-3">
      <View
        style={{ borderRadius: 20 }}
        className="flex-2 overflow-hidden border-b-2 border-gray-300 bg-white"
      >
        <View className="relative h-36">
          <View className="absolute inset-0 bg-gray-400" />
          <Image
            className="absolute inset-0 h-36 w-full object-cover"
            source={props.imageSource}
          />
          <View className="absolute bottom-2 right-4 h-6 w-12 items-center justify-center rounded-md bg-purple-700">
            <Text className="text-xs font-semibold text-white">16 Qs</Text>
          </View>
        </View>
        <View className=" p-4">
          <Text className="mb-4 truncate text-lg font-bold leading-6 text-black">
            Get Smarter with Productivity Quizz...
          </Text>
          <View className="flex-row items-center">
            <Image
              className="h-4 w-4 rounded-full"
              source={props.userImageSource}
            />
            <Text className="ml-2 text-xs font-medium text-gray-600">
              Titus Kitamura
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DiscoverHomeCard;

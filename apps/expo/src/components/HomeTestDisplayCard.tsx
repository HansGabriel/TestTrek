import * as React from "react";
import { Image, Text, View, ImageSourcePropType } from "react-native";

import type { FC } from "react";

interface Props {
  imageSource: ImageSourcePropType;
  title: string;
  questions: number;
  date: Date;
  plays: number;
  userImageSource: ImageSourcePropType;
  userName: string;
}

const HomeTestDisplayCard: FC<Props> = (props) => {
  return (
    <View className="h-59 mx-1 w-48 flex-shrink-0 items-center bg-white p-2">
      <View className="flex-1 flex-shrink-0 overflow-hidden rounded-2xl border-b border-gray-300 bg-white">
        <View className="relative h-28">
          <View className="absolute inset-0 bg-gray-400" />
          <Image
            className="absolute inset-0 h-28 w-full object-cover"
            source={props.imageSource}
            testID="main-image"
          />
          <View className="absolute bottom-3 right-3 h-5 w-10 items-center justify-center rounded-md bg-purple-700">
            <Text className="text-xs font-semibold text-white">
              {props.questions} Qs
            </Text>
          </View>
        </View>
        <View className="flex-shrink-0 overflow-hidden p-3">
          <Text
            className="text-md mb-3 h-5 overflow-hidden truncate font-bold leading-5 text-black"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {props.title}
          </Text>
          <View className="mt-1 flex-row items-center">
            <Image
              className="h-4 w-4 flex-shrink-0 rounded-full"
              source={props.userImageSource}
              testID="user-image"
            />
            <Text
              className="ml-1.5 w-32 flex-shrink-0 truncate text-xs font-medium text-gray-600"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.userName}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeTestDisplayCard;

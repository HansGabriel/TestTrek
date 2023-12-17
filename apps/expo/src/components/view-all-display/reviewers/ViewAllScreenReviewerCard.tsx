import React from "react";
import { Image, Text, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { FC } from "react";
import dayjs from "dayjs";

interface Props {
  imageSource: ImageSourcePropType;
  title: string;
  date: Date;
  userImageSource: ImageSourcePropType;
  userName: string;
}

const ViewAllScreenReviewerCard: FC<Props> = (props) => {
  return (
    <View className="w-90 mx-3 h-28 flex-row items-center">
      <View className="h-28 flex-1 flex-row items-center overflow-hidden rounded-lg bg-white">
        <View className="relative h-28 w-36">
          <View className="absolute inset-0 bg-gray-400" />
          <Image
            className="absolute inset-0 h-28 w-36"
            source={props.imageSource}
            testID="mainImage"
          />
        </View>
        <View className="flex-1 flex-col justify-center overflow-hidden border-b border-r border-t border-gray-200 px-4 py-3">
          <Text
            className="flex-1 overflow-hidden truncate text-lg font-bold leading-7 text-black"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {props.title}
          </Text>
          <View className="flex-row items-center overflow-hidden">
            <Text
              className="overflow-hidden truncate text-xs font-medium text-gray-400"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {((fromNow) =>
                fromNow.charAt(0).toUpperCase() + fromNow.slice(1))(
                dayjs(props.date).fromNow(),
              )}
            </Text>
          </View>
          <View className="mt-3 flex-row items-center">
            <Image
              className="h-5 w-5 rounded-full"
              source={props.userImageSource}
              testID="userimage"
            />
            <Text
              className="ml-1.5 overflow-hidden truncate text-xs font-semibold text-gray-600"
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

export default ViewAllScreenReviewerCard;

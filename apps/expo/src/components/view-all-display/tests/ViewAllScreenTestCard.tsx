import React from "react";
import { Image, Text, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { getTimeAgo } from "../../../functions/timeAgo";
import { FC } from "react";

interface Props {
  imageSource: ImageSourcePropType;
  title: string;
  questions: number;
  date: Date;
  plays: number;
  userImageSource: ImageSourcePropType;
  userName: string;
}

const ViewAllScreenTestCard: FC<Props> = (props) => {
  const timeAgo = getTimeAgo(new Date(props.date), new Date());

  return (
    <View className="w-90 mx-3 my-3 h-28 flex-row items-center">
      <View className="h-28 flex-1 flex-row items-center overflow-hidden rounded-lg bg-white">
        <View className="relative h-28 w-36">
          <View className="absolute inset-0 bg-gray-400" />
          <Image
            className="absolute inset-0 h-28 w-36"
            source={props.imageSource}
          />
          <View className="absolute bottom-3.5 right-3 h-5 w-10 items-center justify-center  rounded-md bg-purple-700">
            <Text
              style={{ fontSize: 10 }}
              className=" overflow-hidden truncate font-semibold text-white"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.questions} Qs
            </Text>
          </View>
        </View>
        <View className="flex-1 flex-col justify-center overflow-hidden border-t border-r border-b border-gray-200 px-4 py-3">
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
              {timeAgo}
            </Text>
            <Text className="mx-1 text-xs font-medium text-gray-400">•</Text>
            <Text
              className="overflow-hidden truncate text-xs font-medium text-gray-400"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.plays} plays
            </Text>
          </View>
          <View className="mt-3 flex-row items-center">
            <Image
              className="h-5 w-5 rounded-full"
              source={props.userImageSource}
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

export default ViewAllScreenTestCard;

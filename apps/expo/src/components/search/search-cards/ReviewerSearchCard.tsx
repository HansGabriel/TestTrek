import React, { FC } from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import { ReturnedAlgoliaReviewers } from "../../../types/algoliaTypes";

const ReviewerSearchCard: FC<ReturnedAlgoliaReviewers> = (props) => {
  return (
    <SafeAreaView>
      <View className="w-[90%] flex-row items-center justify-between gap-4 px-3 py-3">
        <Image
          className="h-[77.5%] w-[17.5%] rounded-lg"
          source={{ uri: props.imageUrl || "" }}
        />
        <View className="w-[65%] flex-grow flex-row items-center">
          <View className="flex-grow flex-col items-start justify-center gap-0.5">
            <Text
              className="font-nunito-bold text-m leading-[32px] text-[#212121]"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.title}
            </Text>
            <Text
              className="ml-1.5 overflow-hidden truncate text-xs font-semibold text-gray-600"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {`Author: ${props.user.firstName} ${
                props.user.lastName ? props.user.lastName : ""
              }`}
            </Text>
          </View>
        </View>
        <View className="h-[29%] w-[20%] items-center justify-center rounded-lg border-2 border-gray-400 bg-gray-400">
          <Text className="font-nunito-semibold text-xs text-white">
            Reviewer
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReviewerSearchCard;

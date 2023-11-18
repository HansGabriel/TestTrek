import React, { FC } from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import { ReturnedAlgoliaUsers } from "../../../types/algoliaTypes";

const UserSearchCard: FC<ReturnedAlgoliaUsers> = (props) => {
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
              {`${props.firstName} ${props.lastName ? props.lastName : ""}`}
            </Text>
            <Text
              className="font-nunito-semibold text-[14px] leading-[19.6px] text-[#616161]"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {`@${props.firstName.toLowerCase()}${
                props.lastName ? "_" + props.lastName.toLowerCase() : ""
              }`}
            </Text>
          </View>
        </View>
        <View className="h-[28%] w-[17%] items-center justify-center rounded-lg border-2 border-gray-400 bg-gray-400">
          <Text className="font-nunito-semibold text-xs text-white">
            Trekker
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserSearchCard;

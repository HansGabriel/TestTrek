import * as React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";

import type { FC } from "react";

interface Props {
  userImage: ImageSourcePropType;
  name: string;
  userName: string;
}

const ViewAllUserCard: FC<Props> = (props) => {
  return (
    <SafeAreaView>
      <View className="w-[90%] flex-row items-center justify-between gap-4 py-3 px-3">
        <Image
          className="h-[77.5%] w-[17.5%] rounded-full"
          source={props.userImage}
        />
        <View className="w-[65%] flex-grow flex-row items-center">
          <View className="flex-grow flex-col items-start justify-center gap-0.5">
            <Text
              className="font-nunito-bold text-m leading-[32px] text-[#212121]"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.name}
            </Text>
            <Text
              className="font-nunito-semibold text-[14px] leading-[19.6px] text-[#616161]"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.userName}
            </Text>
          </View>
        </View>

        <TouchableOpacity className="h-[40%] w-[20%] items-center justify-center rounded-[100px] border-2 border-violet-600 bg-violet-600">
          <Text className="font-nunito-semibold text-xs text-white">View</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUserCard;

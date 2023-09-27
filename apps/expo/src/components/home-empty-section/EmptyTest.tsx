import React, { FC } from "react";
import { Text, View } from "react-native";
import TinyTestTrekIcon from "../../icons/logos/TinyTestTrekIcon";

const EmptyTest: FC = () => {
  return (
    <View className="w-92 relative h-32">
      <View className="bg-purple-10 absolute inset-0 rounded-lg" />
      <View className="absolute top-10 right-10 h-12 w-14">
        <TinyTestTrekIcon />
      </View>
      <Text className="font-nunito absolute left-4 top-8 h-4 w-60 break-words text-lg font-bold text-gray-900">
        No tests shown. Create your own!
      </Text>
      <View className=" relative left-4 bottom-8 h-8 w-28">
        <View className="absolute inset-0 rounded-lg bg-purple-600" />
        <Text className="font-nunito absolute left-5 top-2 h-4 w-20 break-words text-center text-xs font-bold text-white">
          Create Test
        </Text>
      </View>
    </View>
  );
};

export default EmptyTest;

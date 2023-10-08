import React, { FC } from "react";
import { Text } from "react-native";
import { View } from "react-native";

interface PlaceholderProps {
  icon: React.ReactNode;
  text: string;
  marginY?: number;
}

export const ReusablePlaceholder: FC<PlaceholderProps> = ({
  icon,
  text,
  marginY = 10,
}) => {
  return (
    <View
      className={`my-${marginY} h-[60%] w-[90%] items-center justify-center self-center rounded-2xl `}
    >
      <View className="my-5 ">{icon}</View>
      <View>
        <Text className="font-nunito-bold text-lg">{text}</Text>
      </View>
    </View>
  );
};

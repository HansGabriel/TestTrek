import React, { ReactNode } from "react";
import { TouchableOpacity, Text, View } from "react-native";

interface ButtonProps {
  text: string;
  buttonColor: string;
  borderRadius?: string;
  borderShadowColor?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const borderRadiusSize = (size: string | undefined) => {
  let transform;
  switch (size) {
    case "medium":
      transform = "10px";
      break;
    case "large":
      transform = "20px";
      break;
    case "full":
      transform = "100px";
      break;

    default:
      transform = "0px";
      break;
  }

  return transform;
};

export const AppButton = ({
  text,
  buttonColor,
  borderRadius,
  iconLeft,
  iconRight,
  borderShadowColor,
}: ButtonProps) => {
  return (
    <TouchableOpacity className="w-80 justify-end">
      <View
        className={` h-[30%] w-full flex-row items-center justify-center rounded-[${borderRadiusSize(
          borderRadius,
        )}] border-b-4 border-${borderShadowColor} bg-${buttonColor}`}
      >
        {iconLeft}
        <Text className=" font-nunito-bold text-base text-white">{text}</Text>
        {iconRight}
      </View>
    </TouchableOpacity>
  );
};

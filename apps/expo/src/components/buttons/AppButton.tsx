import React, { ReactNode } from "react";
import { TouchableOpacity, Text, View } from "react-native";

interface ButtonProps {
  text: string;
  classNameValue?: string;
  buttonColor: string;
  borderRadius?: string;
  borderShadowColor?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onPress?: () => void;
  marginX?: number;
  marginY?: number;
  textColor?: string;
  fontStyle?: string;
  TOwidth?: string;
  Vwidth?: string;
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
  classNameValue,
  buttonColor,
  borderRadius,
  iconLeft,
  iconRight,
  borderShadowColor,
  onPress,
  marginX,
  marginY,
  textColor,
  fontStyle,
  TOwidth,
  Vwidth,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={`my-${marginY} mx-${marginX} w-${TOwidth} $ self-cente justify-center`}
      onPress={onPress}
    >
      <View
        className={` h-14 w-${Vwidth} flex-row items-center justify-center self-center rounded-[${borderRadiusSize(
          borderRadius,
        )}] border-b-4 border-${borderShadowColor} bg-${buttonColor} ${classNameValue}`}
      >
        {iconLeft}
        <Text
          className={` font-nunito-${fontStyle} text-base text-${textColor}`}
        >
          {text}
        </Text>
        {iconRight}
      </View>
    </TouchableOpacity>
  );
};

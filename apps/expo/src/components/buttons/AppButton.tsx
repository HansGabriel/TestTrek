import React, { ReactNode } from "react";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";

import type { TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
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
  isLoading?: boolean;
  loadingColor?: string;
  borderTop?: string;
  borderLeft?: string;
  borderRight?: string;
  borderBottom?: string;
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
  isLoading = false,
  loadingColor = "black",
  borderTop = "t-0",
  borderLeft = "l-0",
  borderRight = "r-0",
  borderBottom = "b-4",

  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={`my-${marginY} mx-${marginX} w-${TOwidth} justify-center self-center`}
      onPress={onPress}
      {...props}
    >
      <View
        className={` h-14 w-${Vwidth} flex-row items-center justify-center self-center rounded-[${borderRadiusSize(
          borderRadius,
        )}] border-${borderBottom} border-${borderTop} border-${borderLeft} border-${borderRight} border-${borderShadowColor} bg-${buttonColor} ${classNameValue} `}
      >
        {iconLeft}
        <Text
          className={` font-nunito-${fontStyle} text-base text-${textColor}`}
        >
          {isLoading ? <ActivityIndicator color={loadingColor} /> : text}
        </Text>
        {iconRight}
      </View>
    </TouchableOpacity>
  );
};

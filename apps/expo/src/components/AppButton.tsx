import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
  text: string;
  buttonColor: string;
  borderRadius?: string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

const borderRadiusSize = (size: string | undefined) => {
  let transform;
  switch (size) {
    case "medium":
      transform = 15;
      break;
    case "large":
      transform = 25;
      break;
    case "full":
      transform = 50;
      break;

    default:
      transform = 0;
      break;
  }

  return transform;
};

export const AppButton = ({
  text,
  buttonColor,
  borderRadius,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
}: ButtonProps) => {
  const buttonStyles = StyleSheet.create({
    buttonContainer: {
      backgroundColor: buttonColor,
      width: "100%",
      height: "20%",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: borderRadiusSize(borderRadius),
      elevation: 2,
      marginTop: marginTop,
      marginBottom: marginBottom,
      marginLeft: marginLeft,
      marginRight: marginRight,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      fontFamily: "Nunito-Regular",
    },
  });
  return (
    <TouchableOpacity style={buttonStyles.buttonContainer}>
      <Text style={buttonStyles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

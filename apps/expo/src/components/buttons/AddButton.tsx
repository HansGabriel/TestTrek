import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  screen?: any;
}

export const AddButton: FC<ButtonProps> = ({ screen }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screen)}
      className="h-12 w-12 items-center justify-center rounded-[100px] border-b border-l border-r border-t border-indigo-800 bg-violet-600"
    >
      <Text className=" text-2xl text-white">+</Text>
    </TouchableOpacity>
  );
};

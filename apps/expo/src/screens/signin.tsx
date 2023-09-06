import { View, TouchableOpacity, Text } from "react-native";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import SigninForm from "../forms/SigninForm";
import useGoBack from "../hooks/useGoBack";

import type { FC } from "react";

export const SigninScreen: FC = () => {
  const goBack = useGoBack();

  const handleSubmit = () => {
    console.log("Signin");
  };

  return (
    <View className="flex-1 flex-col justify-between px-6">
      <View>
        <View className="my-11 flex flex-row">
          <TouchableOpacity onPress={goBack}>
            <LeftArrowIcon />
          </TouchableOpacity>
        </View>
        <View className="flex flex-col items-start justify-start">
          <Text className="font-nunito-bold self-stretch text-start text-[32px] font-bold leading-[51.20px] text-neutral-800">
            Hello there 👋
          </Text>
        </View>
        <SigninForm onSubmit={handleSubmit} />
      </View>
    </View>
  );
};

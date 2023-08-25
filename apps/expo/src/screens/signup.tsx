import { View, TouchableOpacity, Text } from "react-native";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import SignupForm from "../forms/SignupForm";
import useGoBack from "../hooks/useGoBack";

import type { FC } from "react";
import type { RootStackScreenProps } from "../types";
import type { UserSignup, FullUser } from "@acme/schema/src/types";

type Props = RootStackScreenProps<"Signup">;

export const SignupScreen: FC<Props> = ({ route }) => {
  const { userInfo } = route.params;
  const goBack = useGoBack();

  const handleSubmit = (userSignup: UserSignup) => {
    const fullUserInfo: FullUser = {
      ...userInfo,
      ...userSignup,
    };

    console.log(fullUserInfo);
  };

  return (
    <View className="flex-1 flex-col justify-between px-6">
      <View>
        <View className="my-11 flex flex-row">
          <TouchableOpacity onPress={goBack}>
            <LeftArrowIcon />
          </TouchableOpacity>
          <View className="mx-auto h-3 w-[200px]">
            <View className="bg-primary-1 absolute left-0 top-0 h-3 w-full rounded-[100px]"></View>
          </View>
        </View>
        <View className="flex flex-col items-start justify-start">
          <Text className="font-nunito-bold self-stretch text-center text-[32px] font-bold leading-[51.20px] text-neutral-800">
            Create an account ✏️
          </Text>
          <Text className="font-nunito self-stretch text-center text-lg font-normal leading-[25.20px] tracking-tight text-neutral-800">
            Please enter your username, email address and password. If you
            forget it, then you have to do forgot password.
          </Text>
        </View>
        <SignupForm onSubmit={handleSubmit} />
      </View>
    </View>
  );
};

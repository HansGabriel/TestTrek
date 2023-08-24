import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import UserInfoForm from "../forms/UserInfoForm";
import useGoBack from "../hooks/useGoBack";

import type { FC } from "react";

export const CreateAccountScreen: FC = ({}) => {
  const goBack = useGoBack();

  return (
    <View>
      <View className="px-6">
        <View className="my-11 flex flex-row">
          <TouchableOpacity onPress={goBack}>
            <LeftArrowIcon />
          </TouchableOpacity>
          <View className="mx-auto h-3 w-[200px]">
            <View className="absolute left-0 top-0 h-3 w-[200px] rounded-[100px] bg-gray-200"></View>
            <View className="bg-primary-1 absolute left-0 top-0 h-3 w-[144.44px] rounded-[100px]"></View>
          </View>
        </View>
        <View className="flex flex-col items-start justify-start">
          <Text className="font-nunito-bold self-stretch text-center text-[32px] font-bold leading-[51.20px] text-neutral-800">
            Create an account ✏️
          </Text>
          <Text className="font-nunito self-stretch text-center text-lg font-normal leading-[25.20px] tracking-tight text-neutral-800">
            Please complete your profile. Don't worry, your data will remain
            private and only you can see it.
          </Text>
        </View>
        <UserInfoForm
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      </View>
    </View>
  );
};

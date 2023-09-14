import {
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import UserInfoForm from "../forms/UserInfoForm";
import useGoBack from "../hooks/useGoBack";
import { useNavigation } from "@react-navigation/native";

import type { FC } from "react";
import type { UserInfo } from "@acme/schema/src/types";

export const CreateAccountScreen: FC = ({}) => {
  const navigation = useNavigation();
  const goBack = useGoBack();
  const goToSignup = (userInfo: UserInfo) => {
    navigation.navigate("Signup", {
      userInfo,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="mx-6 flex flex-col content-end justify-between"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-col justify-between">
          <View>
            <View className="my-11 flex flex-row">
              <TouchableOpacity onPress={goBack}>
                <LeftArrowIcon />
              </TouchableOpacity>
              <View className="mx-auto h-3 w-[200px]">
                <View className="absolute left-0 top-0 h-3 w-[200px] rounded-[100px] bg-gray-200"></View>
                <View className="bg-primary-1 absolute left-0 top-0 h-3 w-1/2 rounded-[100px]"></View>
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
            <UserInfoForm onSubmit={goToSignup} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

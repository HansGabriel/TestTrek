import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import LeftArrowIcon from "../icons/LeftArrowIcon";
import { MoreCircleIcon } from "../icons/question-options";
import { Avatar } from "@rneui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { userStoredSchema } from "@acme/schema/src/user";
import { UserStored } from "@acme/schema/src/types";
import AppTextInput from "../components/inputs/AppTextInput";
import { ScrollView } from "react-native-gesture-handler";

export const EditPersonalInfoScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserStored>({
    resolver: zodResolver(userStoredSchema),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <View className="mx-5 mt-7 flex  flex-row justify-between bg-white py-5">
        <View className="flex-row gap-4 self-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
            className="flex flex-row items-center self-center"
          >
            <LeftArrowIcon />
          </TouchableOpacity>
          <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
            Personal Info
          </Text>
        </View>
        <View className="self-center">
          <TouchableOpacity>
            <MoreCircleIcon />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className=" h-36 w-[90%] items-center justify-center self-center">
          <Avatar
            rounded
            size={120}
            source={{
              uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
            }}
          >
            <Avatar.Accessory size={30} />
          </Avatar>
        </View>

        <View className=" my-5 h-96 w-[85%] self-center">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                label="Username"
                textInputProps={{
                  onBlur,
                  placeholder: "Enter Username",
                  onChangeText: onChange,
                  value,
                }}
              />
            )}
            name="userName"
          />
          {errors.userName && (
            <Text className="text-red-500">{errors.userName.message}</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                label="First Name"
                textInputProps={{
                  onBlur,
                  placeholder: "Enter First Name",
                  onChangeText: onChange,
                  value,
                }}
              />
            )}
            name="first_name"
          />
          {errors.first_name && (
            <Text className="text-red-500">{errors.first_name.message}</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                label="Last Name"
                textInputProps={{
                  onBlur,
                  placeholder: "Enter Last Name",
                  onChangeText: onChange,
                  value,
                }}
              />
            )}
            name="last_name"
          />
          {errors.last_name && (
            <Text className="text-red-500">{errors.last_name.message}</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                label="Email Address"
                textInputProps={{
                  onBlur,
                  placeholder: "Enter Email Address",
                  onChangeText: onChange,
                  value,
                }}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text className="text-red-500">{errors.email.message}</Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

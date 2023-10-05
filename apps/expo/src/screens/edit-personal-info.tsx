import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import LeftArrowIcon from "../icons/LeftArrowIcon";
import { Avatar } from "@rneui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { userStoredSchema } from "@acme/schema/src/user";
import { UserStored } from "@acme/schema/src/types";
import AppTextInput from "../components/inputs/AppTextInput";
import { ScrollView } from "react-native-gesture-handler";
import { trpc } from "../utils/trpc";
import { AppButton } from "../components/buttons/AppButton";
import { SkeletonLoader } from "../components/loaders/SkeletonLoader";
import EditIcon from "../icons/EditIcon";
import useToast from "../hooks/useToast";
import XIcon from "../icons/XIcon";
import useGoBack from "../hooks/useGoBack";

export const EditPersonalInfoScreen = () => {
  const { data: userDetails, refetch: refetchData } =
    trpc.user.getUserDetails.useQuery();

  const [edit, setEdit] = useState(false);
  const goBack = useGoBack();
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserStored>({
    resolver: zodResolver(userStoredSchema),
  });
  const { mutate: editUser } = trpc.user.editUserDetails.useMutation();
  const submitEditedData = async (updatedData: UserStored) => {
    editUser(
      {
        ...updatedData,
      },
      {
        onSuccess: () => {
          refetchData();
          showToast("Details updated successfully");
        },
        onError: () => {
          showToast(`An error occurred`);
        },
      },
    );

    setEdit(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <View className="mx-5 mt-7 flex  flex-row justify-between bg-white py-5">
        <View className="flex-row gap-4 self-center">
          <TouchableOpacity
            onPress={goBack}
            className="flex flex-row items-center self-center"
          >
            <LeftArrowIcon />
          </TouchableOpacity>
          <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
            Personal Info
          </Text>
        </View>
        <View className="self-center">
          <TouchableOpacity onPress={() => setEdit(!edit)}>
            {edit ? <XIcon /> : <EditIcon />}
          </TouchableOpacity>
        </View>
      </View>
      {userDetails ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className=" h-30 w-[90%] items-center justify-center self-center">
            <Controller
              name="imageUrl"
              control={control}
              defaultValue={`${userDetails?.imageUrl}`}
              render={({ field: { value } }) => (
                <Avatar
                  rounded
                  size={120}
                  source={{
                    uri: value,
                  }}
                />
              )}
            />
          </View>

          <View className=" mt-5 h-[60%] w-[85%] self-center">
            <Controller
              name="userName"
              control={control}
              defaultValue={`${userDetails?.username}`}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppTextInput
                  label="Username"
                  textInputProps={{
                    onBlur,
                    placeholder: "Enter Username",
                    onChangeText: onChange,
                    value,
                    editable: edit,
                    style: { color: "#6b7280" },
                  }}
                />
              )}
            />
            {errors.userName && (
              <Text className="text-red-500">{errors.userName.message}</Text>
            )}
            <Controller
              name="firstName"
              control={control}
              defaultValue={`${userDetails?.firstName}`}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppTextInput
                  label="First Name"
                  textInputProps={{
                    onBlur,
                    placeholder: "Enter First Name",
                    onChangeText: onChange,
                    value,
                    editable: edit,
                    style: { color: "#6b7280" },
                  }}
                />
              )}
            />
            {errors.firstName && (
              <Text className="text-red-500">{errors.firstName.message}</Text>
            )}
            <Controller
              name="lastName"
              control={control}
              defaultValue={`${userDetails?.lastName}`}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppTextInput
                  label="Last Name"
                  textInputProps={{
                    onBlur,
                    placeholder: "Enter Last Name",
                    onChangeText: onChange,
                    value,
                    editable: edit,
                    style: { color: "#6b7280" },
                  }}
                />
              )}
            />
            {errors.lastName && (
              <Text className="text-red-500">{errors.lastName.message}</Text>
            )}
            <Controller
              name="email"
              control={control}
              defaultValue={`${userDetails?.email}`}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppTextInput
                  label="Email Address"
                  textInputProps={{
                    onBlur,
                    placeholder: "Enter Email Address",
                    onChangeText: onChange,
                    value,
                    editable: edit,
                    style: { color: "#6b7280" },
                  }}
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500">{errors.email.message}</Text>
            )}
          </View>
          <View className="my-8">
            {edit ? (
              <AppButton
                text="Save"
                buttonColor="violet-600"
                borderShadowColor="indigo-800"
                borderRadius="full"
                fontStyle="bold"
                textColor="white"
                TOwidth="full"
                Vwidth="80"
                onPress={handleSubmit(submitEditedData)}
              />
            ) : (
              ""
            )}
          </View>
        </ScrollView>
      ) : (
        <SafeAreaView className="flex-1">
          <View className="h-[90%] w-[90%] items-center space-y-10 self-center">
            <View className=" h-[25%] w-[100%] items-center justify-center">
              <SkeletonLoader isCircular={true} width={100} height={100} />
            </View>
            <View className="h-[50%] w-[100%] items-center justify-evenly">
              <SkeletonLoader isCircular={false} width={"100%"} height={20} />
              <SkeletonLoader isCircular={false} width={"100%"} height={20} />
              <SkeletonLoader isCircular={false} width={"100%"} height={20} />
              <SkeletonLoader isCircular={false} width={"100%"} height={20} />
            </View>
          </View>
        </SafeAreaView>
      )}
    </KeyboardAvoidingView>
  );
};

import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  View,
} from "react-native";

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
import { ReusableHeader } from "../components/headers/ReusableHeader";

export const EditPersonalInfoScreen = () => {
  const { data: userDetails, refetch: refetchData } =
    trpc.user.getUserDetails.useQuery();

  const [edit, setEdit] = useState(false);
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

  if (!userDetails) {
    return (
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
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ReusableHeader
        screenName="Personal Info"
        optionIcon={edit ? <XIcon /> : <EditIcon />}
        onIconPress={() => setEdit(!edit)}
      />
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
                  style: { color: !edit ? "#6b7280" : "black" },
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
                  style: { color: !edit ? "#6b7280" : "black" },
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
                  style: { color: !edit ? "#6b7280" : "black" },
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
                  style: { color: !edit ? "#6b7280" : "black" },
                }}
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500">{errors.email.message}</Text>
          )}

          <Controller
            name="about"
            control={control}
            defaultValue={`${userDetails?.about}`}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                label="About Me"
                type="textarea"
                textInputProps={{
                  onBlur,
                  onChangeText: onChange,
                  value,
                  editable: edit,
                  style: {
                    color: !edit ? "#6b7280" : "black",
                    textAlignVertical: "top",
                  },
                }}
              />
            )}
          />
          {errors.about && (
            <Text className="text-red-500">{errors.about.message}</Text>
          )}
        </View>

        {edit ? (
          <View className="my-20">
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
          </View>
        ) : (
          ""
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

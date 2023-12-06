import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  Dimensions,
  BackHandler,
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
import XIcon from "../icons/XIcon";
import { ReusableHeader } from "../components/headers/ReusableHeader";
import useGoBack from "../hooks/useGoBack";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  errorToast,
  successToast,
} from "../components/notifications/ToastNotifications";

import { AlertModal } from "../components/modals/AlertModal";

export const EditPersonalInfoScreen = () => {
  const { height, width } = Dimensions.get("window");

  const { data: userDetails, refetch: refetchData } =
    trpc.user.getUserDetails.useQuery();

  const [openAlert, setOpenAlert] = useState(false);
  const [edit, setEdit] = useState(false);

  const goBack = useGoBack();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UserStored>({
    resolver: zodResolver(userStoredSchema),
  });
  const { mutate: editUser, isLoading: isEditingUser } =
    trpc.user.editUserDetails.useMutation();
  const submitEditedData = async (updatedData: UserStored) => {
    editUser(
      {
        ...updatedData,
      },
      {
        onSuccess: () => {
          refetchData();
          successToast({
            title: "Success",
            message: "Personal info updated successfully",
          });
          setEdit(false);
        },
        onError: () => {
          errorToast({
            title: "Error",
            message: "An error occurred",
          });
          setEdit(false);
        },
      },
    );
  };

  useEffect(() => {
    if (errors) {
      if (errors.userName && errors.userName.message) {
        errorToast({
          title: "Missing field",
          message: errors.userName.message,
        });
      } else if (errors.firstName && errors.firstName.message) {
        errorToast({
          title: "Missing field",
          message: errors.firstName.message,
        });
      } else if (errors.lastName && errors.lastName.message) {
        errorToast({
          title: "Missing field",
          message: errors.lastName.message,
        });
      } else if (errors.email && errors.email.message) {
        errorToast({
          title: "Missing field",
          message: errors.email.message,
        });
      } else if (errors.about && errors.about.message) {
        errorToast({
          title: "Missing field",
          message: errors.about.message,
        });
      }
    }
  }, [errors]);

  const handleExitScreen = () => {
    if (isDirty) {
      setOpenAlert(true);
    } else {
      goBack();
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (isDirty) {
        setOpenAlert(true);
      } else {
        goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, [isDirty]);

  if (!userDetails) {
    return (
      <SafeAreaView
        className="flex-1"
        style={{
          height: height,
          width: width,
        }}
      >
        <ReusableHeader screenName="Personal Info" handleExit={goBack} />
        <View className="h-[90%] w-[90%] items-center space-y-10 self-center">
          <View className=" h-[25%] w-[100%] items-center justify-center">
            <SkeletonLoader isCircular={true} width={100} height={100} />
          </View>
          <View className="h-[50%] w-[100%] items-center justify-evenly">
            <SkeletonLoader isCircular={true} width={"100%"} height={20} />
            <SkeletonLoader isCircular={true} width={"100%"} height={20} />
            <SkeletonLoader isCircular={true} width={"100%"} height={20} />
            <SkeletonLoader isCircular={true} width={"100%"} height={20} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      className="flex-1"
      style={{
        height: height,
        width: width,
      }}
    >
      <SafeAreaView className="flex-1">
        <ReusableHeader
          screenName="Personal Info"
          optionIcon={edit ? <XIcon /> : <EditIcon />}
          onIconPress={() => setEdit(!edit)}
          handleExit={handleExitScreen}
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
            <View className="mb-5">
              <Controller
                name="about"
                control={control}
                defaultValue={`${
                  userDetails?.about === null ? "" : userDetails?.about
                }`}
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
          </View>

          {edit ? (
            <View className="mt-auto w-[50%] self-center">
              <AppButton
                text="Save"
                buttonColor="violet-600"
                borderShadowColor="indigo-800"
                borderRadius="full"
                fontStyle="bold"
                textColor="white"
                TOwidth="full"
                Vwidth="full"
                Vheight="12"
                onPress={handleSubmit(submitEditedData)}
                isLoading={isEditingUser}
              />
            </View>
          ) : (
            ""
          )}
        </ScrollView>
        <AlertModal
          isVisible={openAlert}
          alertTitle={"Are you sure?"}
          alertDescription={
            "You will lose all unsaved changes if you exit this screen"
          }
          confirmButtonText={"Yes"}
          isCancelButtonVisible={true}
          cancelButtonText={"Cancel"}
          onCancel={() => {
            setOpenAlert(false);
          }}
          onConfirm={goBack}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

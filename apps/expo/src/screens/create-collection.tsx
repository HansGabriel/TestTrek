import { collectionsSchema } from "@acme/schema/src/collection";
import { Collections } from "@acme/schema/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  BackHandler,
} from "react-native";
import TestImagePicker from "../components/ImagePicker";
import AppPicker, { type LabelOption } from "../components/pickers/AppPicker";
import AppTextInput from "../components/inputs/AppTextInput";
import useGoBack from "../hooks/useGoBack";
import { AppButton } from "../components/buttons/AppButton";
import useImageStore from "../stores/useImageStore";
import { useNavigation } from "@react-navigation/native";
import { trpc } from "../utils/trpc";
import { Feather } from "@expo/vector-icons";
import { errorToast, successToast } from "../components/notifications/ToastNotifications";

export const CreateCollection = () => {
  const goBack = useGoBack();
  const image = useImageStore((state) => state.collectionImage);
  const resetCollectionImage = useImageStore(
    (state) => state.resetCollectionImage,
  );
  const navigation = useNavigation();
  const {
    mutate: createCollection,
    isLoading: IsCreatingCollection,
    reset,
  } = trpc.collection.create.useMutation();

  const getDisplayImage = () => {
    if (image) {
      return image;
    }
    return undefined;
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Collections>({
    resolver: zodResolver(collectionsSchema),
    defaultValues: {
      title: "",
      visibility: undefined,
      image: getDisplayImage(),
    },
  });

  const submitCollectionData = (createdData: Collections) => {
    createCollection(
      {
        ...createdData,
      },
      {
        onSuccess: () => {
          successToast({
            title: "Success",
            message: "Collection created successfully",
          });
          resetCollectionImage();
          reset();
          navigation.navigate("MyLibrary");
        },
        onError: () => {
          errorToast({
            title: "Error",
            message: "An error occurred",
          });
          resetCollectionImage();
        },
      },
    );
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      if (image) {
        setValue("image", image);
      }
    });
  }, [image]);

  const handleExitScreen = () => {
    Alert.alert(
      "Are you sure?",
      "You will lose all unsaved progress if you exit this screen",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            goBack();
          },
        },
      ],
    );
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Are you sure?",
        "You will lose all unsaved progress if you exit this screen",
        [
          {
            text: "CANCEL",
            onPress: () => null,
            style: "cancel",
          },
          { text: "OK", onPress: () => goBack() },
        ],
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <View className="mx-5 mt-7 flex  flex-row justify-between bg-white py-5">
        <View className="flex-row gap-4 self-center">
          <TouchableOpacity
            onPress={handleExitScreen}
            className="flex flex-row items-center self-center"
          >
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
          <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
            Create New Collection
          </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className={"w-[90%] self-center"}
      >
        <View className="mb-2 mt-8 flex flex-col">
          <View className="mb-6">
            <Controller
              control={control}
              render={({ field: { value } }) => (
                <TestImagePicker image={value} type="collection" />
              )}
              name="image"
            />
            {errors.image && (
              <Text className="mt-2 text-red-500">{errors.image.message}</Text>
            )}
          </View>

          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                label="Title"
                textInputProps={{
                  onBlur,
                  placeholder: "Enter Title",
                  onChangeText: onChange,
                  value,
                }}
              />
            )}
          />
          {errors.title && (
            <Text className="text-red-500">{errors.title.message}</Text>
          )}

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              const onTextChange = (option: LabelOption) => {
                onChange(option.value);
              };
              return (
                <AppPicker
                  label="Visible to"
                  placeholder="Select visibility"
                  options={[
                    { label: "public", value: "public" },
                    { label: "private", value: "private" },
                  ]}
                  selectedValue={value}
                  setSelectedValue={onTextChange}
                />
              );
            }}
            name="visibility"
          />
          {errors.visibility && (
            <Text className="text-red-500">{errors.visibility.message}</Text>
          )}
          <View className="my-10">
            <AppButton
              text="Create"
              buttonColor="violet-600"
              borderShadowColor="indigo-800"
              borderRadius="full"
              fontStyle="bold"
              textColor="white"
              TOwidth="full"
              Vwidth="80"
              onPress={handleSubmit(submitCollectionData)}
              isLoading={IsCreatingCollection}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

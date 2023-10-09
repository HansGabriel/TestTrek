import { collectionsSchema } from "@acme/schema/src/collection";
import { Collections } from "@acme/schema/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  BackHandler,
  Alert,
} from "react-native";
import TestImagePicker from "../components/ImagePicker";
import AppPicker, { type LabelOption } from "../components/pickers/AppPicker";
import AppTextInput from "../components/inputs/AppTextInput";
import useGoBack from "../hooks/useGoBack";
import { AppButton } from "../components/buttons/AppButton";
import useImageStore from "../stores/useImageStore";
import { useNavigation } from "@react-navigation/native";
import { trpc } from "../utils/trpc";
import useToast from "../hooks/useToast";
import { RootStackScreenProps } from "../types";
import { SkeletonLoader } from "../components/loaders/SkeletonLoader";
import { Feather } from "@expo/vector-icons";

export const EditCollection: FC<RootStackScreenProps<"EditCollection">> = ({
  route,
}) => {
  const { collectionId } = route.params;
  const { data: collectionData, refetch: refetchCurrentCollection } =
    trpc.collection.getByCollectionId.useQuery({
      collectionId,
    });

  const goBack = useGoBack();
  const editImage = useImageStore((state) => state.editCollectionImage);
  const resetEditCollectionImage = useImageStore(
    (state) => state.resetEditCollectionImage,
  );
  const navigation = useNavigation();
  const { mutate: editCollection, isLoading: IsEditingCollection } =
    trpc.collection.editCollection.useMutation();

  const { showToast } = useToast();

  const getDisplayImage = () => {
    if (collectionData?.imageUrl && !editImage) {
      return collectionData?.imageUrl;
    }

    if (editImage && !collectionData?.imageUrl) {
      return editImage;
    }

    if (editImage && collectionData?.imageUrl) {
      return editImage;
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
      title: collectionData?.title,
      visibility: collectionData?.visibility,
      image: getDisplayImage(),
    },
  });

  const submitCollectionData = (updatedData: Collections) => {
    editCollection(
      {
        ...updatedData,
        collectionId,
      },
      {
        onSuccess: () => {
          refetchCurrentCollection();
          showToast("Details updated successfully");
          navigation.navigate("MyLibrary");
        },
        onError: () => {
          showToast(`An error occurred`);
        },
      },
    );
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      if (editImage && !collectionData?.imageUrl) {
        setValue("image", editImage);
      }
      if (collectionData?.imageUrl && !editImage) {
        setValue("image", collectionData?.imageUrl);
      }
      if (editImage && collectionData?.imageUrl) {
        setValue("image", editImage);
      }
    });
  }, [editImage, collectionData?.imageUrl]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      resetEditCollectionImage();
    });
    return unsubscribe;
  }, [navigation]);

  const handleExitScreen = () => {
    Alert.alert(
      "Are you sure?",
      "You will lose all your progress if you exit this screen",
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
        "You will lose all your progress if you exit this screen",
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
            Edit Collection
          </Text>
        </View>
      </View>

      {collectionData ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className={"w-[90%] self-center"}
        >
          <View className="mt-8 mb-2 flex flex-col">
            <View className="mb-6">
              <Controller
                control={control}
                defaultValue={collectionData?.imageUrl}
                render={({ field: { value } }) => (
                  <TestImagePicker image={value} type="editCollection" />
                )}
                name="image"
              />
              {errors.image && (
                <Text className="mt-2 text-red-500">
                  {errors.image.message}
                </Text>
              )}
            </View>

            <Controller
              name="title"
              control={control}
              defaultValue={collectionData?.title}
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
              defaultValue={collectionData?.visibility}
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
                text="Save"
                buttonColor="violet-600"
                borderShadowColor="indigo-800"
                borderRadius="full"
                fontStyle="bold"
                textColor="white"
                TOwidth="full"
                Vwidth="80"
                onPress={handleSubmit(submitCollectionData)}
                isLoading={IsEditingCollection}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <SafeAreaView className="flex-1">
          <View className="h-[90%] w-[90%] items-center space-y-10 self-center">
            <View className=" h-[50%] w-[100%] items-center justify-center">
              <SkeletonLoader
                isCircular={true}
                width={"100%"}
                height={"100%"}
              />
            </View>
            <View className="h-[25%] w-[100%] items-center justify-evenly">
              <SkeletonLoader isCircular={true} width={"100%"} height={25} />
              <SkeletonLoader isCircular={true} width={"100%"} height={25} />
            </View>
          </View>
        </SafeAreaView>
      )}
    </KeyboardAvoidingView>
  );
};

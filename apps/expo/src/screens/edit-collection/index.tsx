import { collectionsSchema } from "@acme/schema/src/collection";
import { Collections } from "@acme/schema/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Octicons } from "@expo/vector-icons";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  BackHandler,
  Alert,
  Dimensions,
} from "react-native";
import TestImagePicker from "../../components/ImagePicker";
import AppPicker, {
  type LabelOption,
} from "../../components/pickers/AppPicker";
import AppTextInput from "../../components/inputs/AppTextInput";
import useGoBack from "../../hooks/useGoBack";
import { AppButton } from "../../components/buttons/AppButton";
import useImageStore from "../../stores/useImageStore";
import { useNavigation } from "@react-navigation/native";
import { trpc } from "../../utils/trpc";
import { RootStackScreenProps } from "../../types";
import { SkeletonLoader } from "../../components/loaders/SkeletonLoader";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import RightSidebar from "./RightSidebar";
import {
  errorToast,
  successToast,
} from "../../components/notifications/ToastNotifications";
import { ReusableHeader } from "../../components/headers/ReusableHeader";

export const EditCollection: FC<RootStackScreenProps<"EditCollection">> = ({
  route,
}) => {
  const { height, width } = Dimensions.get("window");
  const { collectionId } = route.params;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          successToast({
            title: "Success",
            message: "Collection updated successfully",
          });
          navigation.navigate("MyLibrary");
        },
        onError: () => {
          errorToast({
            title: "Error",
            message: "An error occurred",
          });
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

  useEffect(() => {
    if (errors) {
      if (errors.image && errors.image.message) {
        errorToast({
          title: "Missing field",
          message: errors.image.message,
        });
      } else if (errors.title && errors.title.message) {
        errorToast({
          title: "Missing field",
          message: errors.title.message,
        });
      } else if (errors.visibility && errors.visibility.message) {
        errorToast({
          title: "Missing field",
          message: errors.visibility.message,
        });
      }
    }
  }, [errors]);

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
          {
            text: "OK",
            onPress: () => {
              goBack();
            },
          },
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

  if (!collectionData) {
    return (
      <SafeAreaView className="flex-1" style={{ height: height, width: width }}>
        <ReusableHeader
          screenName="Edit Collection"
          optionIcon={<Octicons name="three-bars" size={24} color="black" />}
          onIconPress={() => setIsSidebarOpen(true)}
          backIcon={<Feather name="x" size={24} color="black" />}
          handleExit={handleExitScreen}
        />
        <View>
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
        </View>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      style={{ height: height, width: width }}
    >
      <ReusableHeader
        screenName="Edit Collection"
        optionIcon={<Octicons name="three-bars" size={24} color="black" />}
        onIconPress={() => setIsSidebarOpen(true)}
        backIcon={<Feather name="x" size={24} color="black" />}
        handleExit={handleExitScreen}
        className="mt-7"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className={"w-[90%] self-center"}
      >
        <View className="mb-2 mt-8 flex flex-col">
          <View className="mb-6">
            <Controller
              control={control}
              defaultValue={collectionData?.imageUrl}
              render={({ field: { value } }) => {
                return (
                  <>
                    <TestImagePicker image={value} type="editCollection" />
                    {errors.image && !value && (
                      <Text className="mt-2 text-red-500">
                        {errors.image.message}
                      </Text>
                    )}
                  </>
                );
              }}
              name="image"
            />
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
      <RightSidebar
        collectionId={collectionId}
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
        }}
        handleConfirmPress={() => {
          setIsSidebarOpen(false);
        }}
      />
    </KeyboardAvoidingView>
  );
};

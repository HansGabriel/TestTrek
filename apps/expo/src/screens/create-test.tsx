/* eslint-disable @typescript-eslint/no-unused-vars */
import { Feather } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import useGoBack from "../hooks/useGoBack";
import CreateTestForm from "../forms/CreateTestForm";
import { trpc } from "../utils/trpc";
import { uploadImageAsync } from "../services/upload";
import { ImageDetails } from "@acme/schema/src/types";

import type { FC } from "react";
import type { TestDetails } from "@acme/schema/src/types";
import useToast from "../hooks/useToast";

export const CreateTestScreen: FC = ({}) => {
  const goBack = useGoBack();
  const { showToast } = useToast();

  const { mutate: createTest, isLoading: isCreatingQuiz } =
    trpc.test.create.useMutation();

  const submitTestDetails = async (data: TestDetails) => {
    const path = "http://192.168.254.102:3000/api/upload";
    const fieldName = "testImage";
    const imageDetails: ImageDetails[] = await uploadImageAsync({
      path,
      fieldName,
      imageUri: data.image,
    });
    const firstImage = imageDetails[0];

    if (!firstImage) {
      return;
    }

    const { image: _, ...rest } = data;

    createTest(
      {
        ...rest,
        keywords: ["math"],
        image: firstImage.secureUrl,
      },
      {
        onSuccess: () => {
          showToast("Test created successfully");
        },
        onError: () => {
          showToast("An error occurred");
        },
      },
    );
  };

  return (
    <View className="mt-12 flex-1">
      <View className="mx-6  flex flex-row items-center justify-between pb-5">
        <View className="flex flex-row items-center gap-2">
          <TouchableOpacity onPress={goBack}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
          <Text className="font-nunito-bold text-2xl">Create Test</Text>
        </View>
      </View>
      <CreateTestForm
        onSubmit={submitTestDetails}
        isCreatingQuiz={isCreatingQuiz}
      />
    </View>
  );
};

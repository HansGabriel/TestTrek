/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import useGoBack from "../hooks/useGoBack";
import CreateTestForm from "../forms/CreateTestForm";
import { trpc } from "../utils/trpc";
import { uploadImageAsync } from "../services/upload";
import { ImageDetails } from "@acme/schema/src/types";
import useQuestionStore from "../stores/useQuestionStore";

import type { FC } from "react";
import type { TestDetails } from "@acme/schema/src/types";
import useToast from "../hooks/useToast";

export const CreateTestScreen: FC = () => {
  const goBack = useGoBack();

  const { showToast } = useToast();

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { mutate: createTest, isLoading: isCreatingQuiz } =
    trpc.test.create.useMutation();

  const submitTestDetails = async (data: TestDetails) => {
    setIsUploading(true);
    const path = "http://192.168.254.101:3000/api/upload";
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
        image: firstImage.secureUrl,
      },
      {
        onSuccess: () => {
          setIsUploading(false);
          showToast("Test created successfully");
        },
        onError: () => {
          setIsUploading(false);
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
        isUploading={isUploading}
      />
    </View>
  );
};

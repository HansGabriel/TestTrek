/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import useGoBack from "../hooks/useGoBack";
import CreateTestForm from "../forms/CreateTestForm";
import { trpc } from "../utils/trpc";
import { uploadImageAsync } from "../services/upload";
import { ImageDetails } from "@acme/schema/src/types";
import { FlashList } from "@shopify/flash-list";
import useQuestionStore from "../stores/useQuestionStore";
import { IMAGE_PLACEHOLDER_LARGE } from "../constants";
import { useNavigation } from "@react-navigation/native";

import type { FC } from "react";
import type { TestInput } from "@acme/schema/src/types";
import useToast from "../hooks/useToast";

type FormProps = Omit<TestInput, "questions">;

export const CreateTestScreen: FC = () => {
  const goBack = useGoBack();
  const navigation = useNavigation();
  const questions = useQuestionStore((state) => state.questions);
  const resetQuestions = useQuestionStore((state) => state.resetQuestions);

  const { showToast } = useToast();

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { mutate: createTest, isLoading: isCreatingQuiz } =
    trpc.test.create.useMutation();

  const submitTestDetails = async (data: FormProps) => {
    setIsUploading(true);

    const imageUrl = IMAGE_PLACEHOLDER_LARGE;

    const { image: _, ...rest } = data;

    createTest(
      {
        ...rest,
        image: imageUrl,
        questions: questions
          .filter((question) => !question.inEdit)
          .map((question) => ({
            ...question,
            time: question.time ?? 60,
            points: question.points ?? 50,
          })),
      },
      {
        onSuccess: () => {
          setIsUploading(false);
          showToast("Test created successfully");
          resetQuestions();
        },
        onError: () => {
          setIsUploading(false);
          showToast("An error occurred");
          resetQuestions();
        },
      },
    );
  };

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
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      resetQuestions();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1">
      <View className="mt-12">
        <View className="mx-6  flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2">
            <TouchableOpacity onPress={handleExitScreen}>
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
    </SafeAreaView>
  );
};

// const path = "http://192.168.254.101:3000/api/upload";
// const fieldName = "testImage";
// const imageDetails: ImageDetails[] = await uploadImageAsync({
//   path,
//   fieldName,
//   imageUri: data.image,
// });
// const firstImage = imageDetails[0];

// if (!firstImage) {
//   return;
// }

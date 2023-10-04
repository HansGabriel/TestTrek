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
import { ImageDetails } from "@acme/schema/src/types";
import { FlashList } from "@shopify/flash-list";
import useQuestionStore from "../stores/useQuestionStore";
import useImageStore from "../stores/useImageStore";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import type { FC } from "react";
import type { TestInput } from "@acme/schema/src/types";
import useToast from "../hooks/useToast";

type FormProps = Omit<TestInput, "questions">;

export const CreateTestScreen: FC = () => {
  const goBack = useGoBack();
  const navigation = useNavigation();
  const questions = useQuestionStore((state) => state.questions);
  const resetImage = useImageStore((state) => state.resetImage);
  const resetQuestions = useQuestionStore((state) => state.resetQuestions);

  const { showToast } = useToast();

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { mutate: createTest, isLoading: isCreatingQuiz } =
    trpc.test.create.useMutation();

  const submitTestDetails = async (data: FormProps) => {
    setIsUploading(true);

    createTest(
      {
        ...data,
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
          navigation.navigate("Home");
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
      resetImage();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1">
      <View className="mt-12">
        <View className="top-2 mx-5 flex flex-row justify-between">
          <View className="flex-row gap-4 self-center">
            <TouchableOpacity
              onPress={handleExitScreen}
              className="flex flex-row items-center self-center"
            >
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
            <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
              Create Test
            </Text>
          </View>
          <TouchableOpacity
            className="self-center"
            onPress={() => {
              navigation.navigate("CreateReviewer");
            }}
          >
            <Ionicons
              name="ios-document-text"
              size={28}
              color="rgb(79 70 229)"
            />
          </TouchableOpacity>
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

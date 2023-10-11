/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { View, SafeAreaView, Alert } from "react-native";
import useGoBack from "../hooks/useGoBack";
import CreateTestForm from "../forms/CreateTestForm";
import { trpc } from "../utils/trpc";
import useQuestionStore from "../stores/useQuestionStore";
import useImageStore from "../stores/useImageStore";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import type { FC } from "react";
import type { TestInput } from "@acme/schema/src/types";
import useToast from "../hooks/useToast";
import { mapZodError } from "../utils/helpers/zod";

type FormProps = Omit<TestInput, "questions">;

export const CreateTestScreen: FC = () => {
  const goBack = useGoBack();
  const trpcUtils = trpc.useContext();
  const navigation = useNavigation();
  const questions = useQuestionStore((state) => state.questions);
  const resetImage = useImageStore((state) => state.resetImage);
  const resetQuestions = useQuestionStore((state) => state.resetQuestions);

  const { showToast } = useToast();

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { mutate: createTest, isLoading: isCreatingQuiz } =
    trpc.test.create.useMutation({
      onSuccess: () => {
        trpcUtils.test.invalidate();
        trpcUtils.user.getTop.invalidate();
        trpcUtils.collection.getTopCollections.invalidate();
      },
    });

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
          navigation.navigate("MyLibrary");
        },
        onError: (error) => {
          setIsUploading(false);
          const errorMessage = mapZodError(error);
          showToast(errorMessage);
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
      <View className="mb-20">
        <CreateTestForm
          testTitle="Create Test"
          onSubmit={submitTestDetails}
          isCreatingQuiz={isCreatingQuiz}
          isUploading={isUploading}
          handleExitScreen={handleExitScreen}
        />
      </View>
    </SafeAreaView>
  );
};

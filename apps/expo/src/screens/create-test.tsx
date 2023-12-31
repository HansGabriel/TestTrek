import { useState, useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import CreateTestForm from "../forms/CreateTestForm";
import { trpc } from "../utils/trpc";
import useQuestionStore from "../stores/useQuestionStore";
import useImageStore from "../stores/useImageStore";
import { useNavigation } from "@react-navigation/native";
import type { FC } from "react";
import type { TestInput } from "@acme/schema/src/types";
import {
  errorToast,
  successToast,
} from "../components/notifications/ToastNotifications";
import useGoBack from "../hooks/useGoBack";

type FormProps = Omit<TestInput, "questions">;

export const CreateTestScreen: FC = () => {
  const trpcUtils = trpc.useContext();
  const navigation = useNavigation();
  const questions = useQuestionStore((state) => state.questions);
  const resetImage = useImageStore((state) => state.resetImage);
  const resetQuestions = useQuestionStore((state) => state.resetQuestions);
  const goBack = useGoBack();

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { mutate: createTest, isLoading: isCreatingQuiz } =
    trpc.test.create.useMutation({
      onSuccess: () => {
        trpcUtils.test.invalidate();
        trpcUtils.user.getTop.invalidate();
      },
      onError: (error) => {
        errorToast({ title: "Error", message: error.message });
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
          successToast({
            title: "Success",
            message: "Test created successfully",
          });
          resetQuestions();
          goBack();
        },
        onError: (error) => {
          setIsUploading(false);
          errorToast({ title: "Error", message: error.message });
        },
      },
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
        />
      </View>
    </SafeAreaView>
  );
};

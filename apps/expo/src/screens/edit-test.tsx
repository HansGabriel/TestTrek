/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { View, Alert, Dimensions } from "react-native";
import useGoBack from "../hooks/useGoBack";
import CreateTestForm from "../forms/CreateTestForm";
import { trpc } from "../utils/trpc";
import useQuestionStore from "../stores/useQuestionStore";
import useImageStore from "../stores/useImageStore";
import OptionsDropdown from "./create-question/options-dropdown";
import { match } from "ts-pattern";
import { mapZodError } from "../utils/helpers/zod";

import type { FC } from "react";
import type { TestInput } from "@acme/schema/src/types";
import type { PartialQuestion, QuestionType } from "../stores/useQuestionStore";
import { RootStackScreenProps } from "../types";

import useToast from "../hooks/useToast";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  errorToast,
  successToast,
} from "../components/notifications/ToastNotifications";

type FormProps = Omit<TestInput, "questions">;

export const EditTestScreen: FC<RootStackScreenProps<"EditTest">> = ({
  navigation,
  route,
}) => {
  const { height, width } = Dimensions.get("window");
  const { testId } = route.params;
  const trpcUtils = trpc.useContext();
  const goBack = useGoBack();
  const questions = useQuestionStore((state) => state.questions);
  const setQuestions = useQuestionStore((state) => state.setQuestions);
  const resetQuestions = useQuestionStore((state) => state.resetQuestions);
  const resetImage = useImageStore((state) => state.resetImage);

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { data: testDetails } = trpc.test.getById.useQuery(
    { testId },
    {
      onSuccess: (data) => {
        if (data) {
          setQuestions(
            data.questions.map((question) =>
              match<QuestionType, PartialQuestion>(question.type)
                .with("multiple_choice", (questionType) => ({
                  type: questionType,
                  choices: question.choices,
                  points: question.points,
                  time: question.time,
                  title: question.title,
                  image: question.image,
                  inEdit: false,
                }))
                .run(),
            ),
          );
        }
      },
    },
  );

  const { mutate: deleteTest, isLoading: isDeletingTest } =
    trpc.test.delete.useMutation({
      onSuccess: () => {
        successToast({
          title: "Deleted",
          message: "Test deleted successfully",
        });
        trpcUtils.test.invalidate();
        navigation.navigate("MyLibrary");
      },
      onError: () => {
        errorToast({
          title: "Deleted",
          message: "An error occurred",
        });
      },
    });

  const { mutate: editTest, isLoading: isEditingTest } =
    trpc.test.edit.useMutation({
      onSuccess: () => {
        trpcUtils.test.invalidate();
        trpcUtils.user.getTop.invalidate();
        trpcUtils.collection.getTopCollections.invalidate();
      },
    });

  const submitTestDetails = async (data: FormProps) => {
    setIsUploading(true);

    editTest(
      {
        ...data,
        testId,
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
            message: "Test updated successfully",
          });
          resetQuestions();
          navigation.navigate("MyLibrary");
        },
        onError: (error) => {
          setIsUploading(false);
          const errorMessage = mapZodError(error);
          errorToast({
            title: "Error",
            message: errorMessage,
          });
        },
      },
    );
  };

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

  const handleDeleteTest = () => {
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
            deleteTest({ testId });
          },
        },
      ],
    );
  };

  const handleOnSave = () => {
    console.log("save");
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      resetQuestions();
      resetImage();
    });
    return unsubscribe;
  }, [navigation]);

  if (!testDetails) {
    return <></>;
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="-mt-5 mb-20">
        <CreateTestForm
          testTitle="Edit Test"
          testDetails={{
            description: testDetails.description,
            title: testDetails.title,
            image: testDetails.imageUrl,
            keywords: testDetails.keywords.map((keyword) => keyword.name),
            visibility: testDetails.visibility,
          }}
          onSubmit={submitTestDetails}
          isCreatingQuiz={isEditingTest}
          isUploading={isUploading}
          handleExitScreen={handleExitScreen}
          deleteTest={handleDeleteTest}
          isDeletingTest={isDeletingTest}
        />
      </View>
    </SafeAreaView>
  );
};

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
import useQuestionStore from "../stores/useQuestionStore";
import useImageStore from "../stores/useImageStore";
import { match } from "ts-pattern";

import type { FC } from "react";
import type { TestInput } from "@acme/schema/src/types";
import type { PartialQuestion, QuestionType } from "../stores/useQuestionStore";
import { RootStackScreenProps } from "../types";

import useToast from "../hooks/useToast";

type FormProps = Omit<TestInput, "questions">;

export const EditTestScreen: FC<RootStackScreenProps<"EditTest">> = ({
  navigation,
  route,
}) => {
  const { testId } = route.params;
  const goBack = useGoBack();

  const { showToast } = useToast();
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

  const { mutate: createTest, isLoading: isCreatingQuiz } =
    trpc.test.create.useMutation();

  const submitTestDetails = async (data: FormProps) => {
    setIsUploading(true);
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

  if (!testDetails) {
    return <></>;
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="mt-12">
        <View className="mx-6  flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2">
            <TouchableOpacity onPress={handleExitScreen}>
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
            <Text className="font-nunito-bold text-2xl">Edit Test</Text>
          </View>
        </View>
        <CreateTestForm
          testDetails={{
            description: testDetails.description,
            title: testDetails.title,
            image: testDetails.imageUrl,
            keywords: testDetails.keywords.map((keyword) => keyword.name),
            visibility: testDetails.visibility,
          }}
          onSubmit={submitTestDetails}
          isCreatingQuiz={isCreatingQuiz}
          isUploading={isUploading}
        />
      </View>
    </SafeAreaView>
  );
};

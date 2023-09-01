import { Feather } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import useGoBack from "../hooks/useGoBack";
import CreateTestForm from "../forms/CreateTestForm";
import { trpc } from "../utils/trpc";

import type { FC } from "react";

export const CreateTestScreen: FC = ({}) => {
  const goBack = useGoBack();

  const { mutate: createTest, isLoading: isCreatingQuiz } =
    trpc.test.create.useMutation();

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
        onSubmit={(data) => {
          createTest({
            ...data,
            keywords: ["math"],
            image:
              "https://i0.wp.com/calmatters.org/wp-content/uploads/2021/08/math-curriculum.jpg?fit=2000%2C1500&ssl=1",
          });
        }}
        isCreatingQuiz={isCreatingQuiz}
      />
    </View>
  );
};

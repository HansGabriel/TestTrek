import { Feather } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import useGoBack from "../hooks/useGoBack";
import CreateTestForm from "../forms/CreateTestForm";

import type { FC } from "react";

export const CreateTestScreen: FC = ({}) => {
  const goBack = useGoBack();

  return (
    <View className="my-12 mx-6 flex-1">
      <View className="flex flex-row items-center justify-between pb-5">
        <View className="flex flex-row items-center gap-2">
          <TouchableOpacity onPress={goBack}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
          <Text className="font-nunito-bold text-2xl">Create Test</Text>
        </View>
      </View>
      <CreateTestForm
        onSubmit={(data) => {
          console.log(data);
        }}
      />
    </View>
  );
};

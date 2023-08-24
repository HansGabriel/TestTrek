import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import AppTextInput from "../components/TextInput";

export const MaterialInput = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="bg-blue-500 p-4">
        <Text className="text-lg text-white">Text Input</Text>
      </View>
      <AppTextInput />
    </SafeAreaView>
  );
};

export default MaterialInput;

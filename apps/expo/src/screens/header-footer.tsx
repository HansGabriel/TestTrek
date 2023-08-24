import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Footer } from "../components/Footer";

export const HeaderFooter = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="bg-blue-500 p-4">
        <Text className="text-lg text-white">Header-Footer</Text>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

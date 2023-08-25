import React from "react";
import { View, SafeAreaView } from "react-native";
import Footer from "../components/Footer";

export const HeaderFooter = () => {
  return (
    <SafeAreaView style={{ flex: 1, marginBottom: -30 }}>
      <View className="w-full flex-1 items-center justify-end bg-purple-400 p-4">
        <Footer />
      </View>
    </SafeAreaView>
  );
};

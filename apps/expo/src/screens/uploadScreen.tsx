import React from "react";

import { View, SafeAreaView } from "react-native";
import UploadFile from "../components/UploadFile";
import UploadImage from "../components/UploadImage";

export const UploadScreen = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full bg-purple-400 p-4">
        <UploadFile />
        <UploadImage />
      </View>
    </SafeAreaView>
  );
};

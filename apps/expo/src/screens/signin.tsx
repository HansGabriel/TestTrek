import React from "react";

import { View, SafeAreaView, Button } from "react-native";

import SignInWithOAuth from "../components/SignInWithOAuth";
import { RootStackScreenProps } from "../types";

export const SignInSignUpScreen = ({
  navigation,
}: RootStackScreenProps<"SignInSignUp">) => {
  return (
    <SafeAreaView className="bg-[#2e026d] bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <View className="h-full w-full justify-around p-4">
        <SignInWithOAuth />
        <Button
          title="Proceed to upload screen"
          onPress={() => navigation.navigate("UploadScreen")}
        />
      </View>
    </SafeAreaView>
  );
};

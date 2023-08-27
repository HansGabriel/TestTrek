import React from "react";

import { Button, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import MainHeader from "../components/headers/MainHeader";

const SignOut = () => {
  const { signOut } = useAuth();
  return (
    <View className="rounded-lg border-2 border-gray-500 p-4">
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export const HomeScreen = () => {
  return (
    <SafeAreaView className="">
      <MainHeader />

      <SignOut />
    </SafeAreaView>
  );
};

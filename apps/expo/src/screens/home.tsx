import React from "react";

import { Button, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import DiscoverHomeSection from "../components/discover/DiscoverHomeSection";
import MainHeader from "../components/headers/MainHeader";
import PlayQuiz from "../components/playquiz/PlayQuiz";
import Footer from "../components/Footer";
import { trpc } from "../utils/trpc";

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
  const { data: tests } = trpc.test.getAll.useQuery();

  return (
    <SafeAreaView className="flex-1 flex-col">
      <MainHeader />
      <PlayQuiz />
      {tests ? <DiscoverHomeSection tests={tests} /> : null}
      <SignOut />
      <Footer />
    </SafeAreaView>
  );
};

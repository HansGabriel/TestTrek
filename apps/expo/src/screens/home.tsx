import React from "react";
import { Button, View, ScrollView } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import DiscoverHomeSection from "../components/Discover/DiscoverHomeSection";
import MainHeader from "../components/headers/MainHeader";
import PlayQuiz from "../components/playquiz/PlayQuiz";
import Footer from "../components/Footer";

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
    <SafeAreaView style={{ flex: 1 }}>
      <MainHeader />
      <ScrollView>
        <PlayQuiz />
        <DiscoverHomeSection />
      </ScrollView>
      <SignOut />
      <Footer />
    </SafeAreaView>
  );
};

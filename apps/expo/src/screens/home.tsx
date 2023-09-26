import React, { useEffect, useState } from "react";
import { Alert, Button, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DiscoverHomeSection from "../components/discover/DiscoverHomeSection";
import TopTrekersHomeSection from "../components/top-trekers/TopTrekersHomeSection";
import MainHeader from "../components/headers/MainHeader";
import PlayTest from "../components/playtest/PlayTest";
import Footer from "../components/Footer";
import TopCollectionsHomeSection from "../components/top-collections/TopCollectionsHomeSection";
import TrendingTestsHomeSection from "../components/trending-tests/TrendingTestsHomeSection";
import TopPicksHomeSection from "../components/top-picks-tests/TopPicksHomeSection";
import { trpc } from "../utils/trpc";

export const HomeScreen = () => {
  const [mutationResult, setMutationResult] = useState(null);
  const testGenerate = trpc.gptApi.generateQuestion.useMutation();

  const handleGenerateQuestion = async () => {
    try {
      const data = await testGenerate.mutateAsync({
        message: "What is the biggest organ in the human body",
        questionType: "multiselect",
      });

      setMutationResult(data); // Store the mutation result in local state
    } catch (error) {
      console.error("Full error object:", error);
    }
  };

  // Display the result in an alert when mutationResult changes
  useEffect(() => {
    if (mutationResult) {
      Alert.alert("Generated Question", JSON.stringify(mutationResult));
    }
  }, [mutationResult]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainHeader />
      <ScrollView>
        <PlayTest />
        <Button
          title="Generate Question"
          onPress={handleGenerateQuestion}
          disabled={testGenerate.isLoading} // Disable the button during the loading state
        />

        <DiscoverHomeSection />
        <TopTrekersHomeSection />
        <TopCollectionsHomeSection />
        <TrendingTestsHomeSection />
        <TopPicksHomeSection />
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

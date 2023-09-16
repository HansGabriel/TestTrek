import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DiscoverHomeSection from "../components/discover/DiscoverHomeSection";
import TopTrekersHomeSection from "../components/top-trekers/TopTrekersHomeSection";
import MainHeader from "../components/headers/MainHeader";
import PlayTest from "../components/playtest/PlayTest";
import Footer from "../components/Footer";
import TopCollectionsHomeSection from "../components/top-collections/TopCollectionsHomeSection";
import TrendingTestsHomeSection from "../components/trending-tests/TrendingTestsHomeSection";
import TopPicksHomeSection from "../components/top-picks-tests/TopPicksHomeSection";

export const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <MainHeader />
      <ScrollView className="z-0">
        <PlayTest />
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

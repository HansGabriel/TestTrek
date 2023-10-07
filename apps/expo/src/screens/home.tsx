import React, { useEffect } from "react";
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
import { Audio } from "expo-av";
import bgMusic from "../sounds/comedy.mp3";
import { useMusicStore } from "../stores/useMusicStore";
import { playSound, unloadAudio } from "../services/audioService";
import { useIsFocused } from "@react-navigation/native";

export const HomeScreen = () => {
  const isMusicPlaying = useMusicStore((state) => state.isMusicPlaying);
  const isPlayTestScreen = useMusicStore((state) => state.isPlayTestScreen);
  const isScoreboardScreen = useMusicStore((state) => state.isScoreboardScreen);

  const generalMusicInstance = new Audio.Sound();

  console.log("isMusicPlaying", isMusicPlaying);
  console.log("isPlayTest", isPlayTestScreen);
  console.log("isScoreboard", isScoreboardScreen);

  useEffect(() => {
    if (isMusicPlaying) {
      if (!isPlayTestScreen && !isScoreboardScreen) {
        playSound({ music: bgMusic, sound: generalMusicInstance });
      }
    }

    return () => {
      unloadAudio({ sound: generalMusicInstance });
    };
  }, [isMusicPlaying, isPlayTestScreen, isScoreboardScreen]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainHeader />
      <ScrollView>
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

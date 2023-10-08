import React, { useEffect, useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
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
import { trpc } from "../utils/trpc";

export const HomeScreen = () => {
  const trpcUtils = trpc.useContext();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const isMusicPlaying = useMusicStore((state) => state.isMusicPlaying);
  const isPlayTestScreen = useMusicStore((state) => state.isPlayTestScreen);
  const isScoreboardScreen = useMusicStore((state) => state.isScoreboardScreen);

  const generalMusicInstance = new Audio.Sound();

  const onRefresh = () => {
    setRefreshing(true);
    trpcUtils.test.invalidate();
    trpcUtils.collection.invalidate();
    trpcUtils.user.invalidate();
    setRefreshing(false);
  };

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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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

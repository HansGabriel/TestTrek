import React, { useEffect, useState } from "react";
import { ScrollView, RefreshControl, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DiscoverHomeSection from "../components/discovers/DiscoverHomeSection";
import TopTrekersHomeSection from "../components/discover-trekers/DiscoverTrekersHomeSection";
import MainHeader from "../components/headers/MainHeader";
import PlayTest from "../components/playtest/PlayTest";
import Footer from "../components/Footer";
import DiscoverCollectionsHomeSection from "../components/discover-collections/DiscoverCollectionsHomeSection";
import { Audio } from "expo-av";
import bgMusic from "../../assets/sounds/comedy.mp3";
import { useMusicStore } from "../stores/useMusicStore";
import { playSound, unloadAudio } from "../services/audioService";
import { trpc } from "../utils/trpc";
import DiscoverReviewersHomeSection from "../components/discover-reviewers/DiscoverReviewersHomeSection";

export const HomeScreen = () => {
  const { height, width } = Dimensions.get("window");
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
    <SafeAreaView style={{ flex: 1, height: height, width: width }}>
      <MainHeader />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PlayTest />
        <DiscoverHomeSection />
        <TopTrekersHomeSection />
        <DiscoverCollectionsHomeSection />
        <DiscoverReviewersHomeSection />
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

import { useState, useEffect } from "react";
import { StatusBar, View, Image, Text, TouchableOpacity } from "react-native";
import PodiumComponent from "./PodiumComponent";
import { LinearGradient } from "expo-linear-gradient";
import DownloadIcon from "../../icons/DownloadIcon";
import ShareIcon from "../../icons/ShareIcon";
import ConfettiCannon from "react-native-confetti-cannon";
import { FlashList } from "@shopify/flash-list";

import topTrekersList from "../../temp-data/top-trekers/topTrekersList";

import XIcon from "../../icons/XIcon";

import type { FC } from "react";

interface Props {}

export const ScoreboardScreen: FC<Props> = ({}) => {
  const [isShowinConfetti, setIsShowingConfetti] = useState<boolean>(false);

  useEffect(() => {
    setIsShowingConfetti(true);
    setTimeout(() => {
      setIsShowingConfetti(false);
    }, 5000);
  }, []);

  return (
    <>
      <View className="flex-1">
        <Image
          source={require("../../../assets/images/scoreboard.png")}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
        <View className="justify-cente z-50 mb-5 mt-10 flex flex-row items-center justify-center">
          <TouchableOpacity className="absolute left-4">
            <XIcon color="white" colorFill="#fff" />
          </TouchableOpacity>

          <Text className="font-nunito-bold text-center text-2xl font-bold leading-[38.40px] text-white">
            Scoreboard
          </Text>
        </View>

        <View className="absolute top-[40%] left-5 transform">
          <PodiumComponent />
          <View className="flex h-[200px] w-full flex-col bg-white px-4">
            <FlashList
              data={topTrekersList}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View className="mt-3 flex flex-row items-center justify-start border-b border-zinc-100 pb-2">
                    <Text className="font-nunito-bold mr-3 text-center text-xl font-bold leading-loose text-neutral-800">
                      {index + 1}
                    </Text>
                    <Image
                      source={item.imageSource}
                      className="mr-5 h-12 w-12 rounded-full"
                    />
                    <Text className="font-nunito-bold text-center text-xl font-bold leading-loose text-neutral-800">
                      {item.name}
                    </Text>
                    <Text className="font-nunito-bold ml-auto text-center text-xl font-bold leading-loose text-neutral-800">
                      3433
                    </Text>
                  </View>
                );
              }}
              estimatedItemSize={7}
            />
          </View>
        </View>
      </View>

      <LinearGradient
        colors={["#856BFF", "#704FFF"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className="flex flex-row items-center justify-between px-6 pt-6 pb-9"
      >
        <TouchableOpacity className="flex w-[48%] flex-row items-center justify-center gap-x-2 rounded-[100px] border-b-4 border-neutral-200 bg-white py-[18px]">
          <DownloadIcon />
          <Text className="font-nunito-bold text-center text-base font-bold leading-snug tracking-tight text-violet-600">
            Save
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex w-[48%] flex-row items-center justify-center gap-x-2 rounded-[100px] border-b-4 border-neutral-200 bg-white py-[18px]">
          <ShareIcon />
          <Text className="font-nunito-bold text-center text-base font-bold leading-snug tracking-tight text-violet-600">
            Share
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      <StatusBar barStyle="light-content" />
      {isShowinConfetti && (
        <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
      )}
    </>
  );
};

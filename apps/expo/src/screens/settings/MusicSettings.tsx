import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Switch } from "@rneui/themed";
import SettingsHeader from "../../components/headers/SettingsHeader";
import { useMusicStore } from "../../stores/useMusicStore";

export const MusicAndEffectsScreen = () => {
  const {
    isEffectsPlaying,
    isMusicPlaying,
    toggleEffectsPlay,
    toggleMusicPlay,
  } = useMusicStore();

  return (
    <SafeAreaView className="flex-1">
      <SettingsHeader screenName={"Music & Effects"} />
      <View className="w-[80%] flex-row justify-between self-center">
        <View className="self-center">
          <Text className=" font-nunito-semibold text-lg">Music</Text>
        </View>
        <View className="self-center">
          <Switch
            value={isMusicPlaying}
            onValueChange={toggleMusicPlay}
            thumbColor={"#7c3aed"}
            trackColor={{ false: "#d4d4d8", true: "#8b5cf6" }}
          />
        </View>
      </View>
      <View className="w-[80%] flex-row justify-between self-center">
        <View className="self-center">
          <Text className=" font-nunito-semibold text-lg">Sound Effects</Text>
        </View>
        <View className="self-center">
          <Switch
            value={isEffectsPlaying}
            onValueChange={toggleEffectsPlay}
            thumbColor={"#7c3aed"}
            trackColor={{ false: "#d4d4d8", true: "#8b5cf6" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

import React, { useEffect } from "react";
import { Dimensions, View, Text } from "react-native";
import { Switch } from "@rneui/themed";
import SettingsHeader from "../../components/headers/SettingsHeader";
import { useMusicStore } from "../../stores/useMusicStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export const MusicAndEffectsScreen = () => {
  const { height, width } = Dimensions.get("window");
  const {
    isEffectsPlaying,
    isMusicPlaying,
    toggleEffectsPlay,
    toggleMusicPlay,
  } = useMusicStore();

  useEffect(() => {
    AsyncStorage.setItem("isMusicPlaying", JSON.stringify(isMusicPlaying));
  }, [isMusicPlaying]);

  useEffect(() => {
    AsyncStorage.setItem("isEffectsPlaying", JSON.stringify(isEffectsPlaying));
  }, [isEffectsPlaying]);

  useEffect(() => {
    const retrieveState = async () => {
      const savedMusicState = await AsyncStorage.getItem("isMusicPlaying");
      if (savedMusicState !== null) {
        useMusicStore.setState({ isMusicPlaying: JSON.parse(savedMusicState) });
      }
    };
    retrieveState();
  }, []);

  useEffect(() => {
    const retrieveState = async () => {
      const savedEffectsState = await AsyncStorage.getItem("isEffectsPlaying");
      if (savedEffectsState !== null) {
        useMusicStore.setState({
          isEffectsPlaying: JSON.parse(savedEffectsState),
        });
      }
    };
    retrieveState();
  }, []);

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        height: height,
        width: width,
      }}
    >
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

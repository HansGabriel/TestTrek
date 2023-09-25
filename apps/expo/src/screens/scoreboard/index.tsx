import { StatusBar, View, Image, Text, TouchableOpacity } from "react-native";
import PodiumComponent from "./PodiumComponent";

import XIcon from "../../icons/XIcon";

import type { FC } from "react";

interface Props {}

export const ScoreboardScreen: FC<Props> = ({}) => {
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
        </View>
      </View>

      <StatusBar barStyle="light-content" />
    </>
  );
};

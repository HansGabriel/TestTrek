import React from "react";
import { View, Text } from "react-native";
import PlayQuizBackground from "../../icons/playquiz/PlayQuizBackground";
import PlayQuizButton from "./PlayQuizButton";
import type { FC } from "react";

const PlayQuiz: FC = () => {
  return (
    <View className="relative h-40 w-96">
      <PlayQuizBackground />
      <View className="absolute top-16 left-11 mt-16 ml-11">
        <Text className="text-black"></Text>
        <Text className="text-black"></Text>
        <PlayQuizButton />
      </View>
    </View>
  );
};

export default PlayQuiz;

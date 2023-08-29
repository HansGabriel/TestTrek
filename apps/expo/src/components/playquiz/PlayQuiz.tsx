import React from "react";
import { View, Text } from "react-native";
import PlayQuizBackground from "../../icons/playquiz/PlayQuizBackground";
import PlayQuizButton from "./PlayQuizButton";
import type { FC } from "react";

const PlayQuiz: FC = () => {
  return (
    <View className="relative flex-1 items-center justify-center">
      <PlayQuizBackground className="absolute inset-0" />

      <View className="absolute top-20 left-7">
        <Text className="mb-2 text-black"></Text>
        <PlayQuizButton />
      </View>
    </View>
  );
};

export default PlayQuiz;

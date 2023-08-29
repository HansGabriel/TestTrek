import React from "react";
import { View, Text } from "react-native";
import PlayQuizBackground from "../../icons/playquiz/PlayQuizBackground";
import PlayQuizButton from "./PlayQuizButton";
import type { FC } from "react";

const PlayQuiz: FC = () => {
  return (
    <View className="relative flex-1 items-center justify-center">
      <PlayQuizBackground className="absolute inset-0" />

      <View className="absolute top-16 left-11">
        <Text className=" text-black"></Text>
        <Text className="text-black"></Text>
        <PlayQuizButton />
      </View>
    </View>
  );
};

export default PlayQuiz;

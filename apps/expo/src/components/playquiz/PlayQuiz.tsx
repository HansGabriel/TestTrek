import React from "react";
import { View } from "react-native";
import PlayQuizBackground from "../../icons/playquiz/PlayQuizBackground";
import type { FC } from "react";

const PlayQuiz: FC = () => {
  return (
    <View className="mx-auto mb-3">
      <PlayQuizBackground />
    </View>
  );
};

export default PlayQuiz;

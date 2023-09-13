import React from "react";
import PlayQuizBackground from "../../icons/playquiz/PlayQuizBackground";
import type { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const PlayQuiz: FC = () => {
  return (
    <SafeAreaView className="mb-3 items-center ">
      <PlayQuizBackground width={"90%"} />
    </SafeAreaView>
  );
};

export default PlayQuiz;

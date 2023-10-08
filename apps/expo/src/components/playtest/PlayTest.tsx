import React from "react";
import PlayTestBackground from "../../icons/playtest/PlayTestBackground";
import type { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const PlayTest: FC = () => {
  return (
    <SafeAreaView className="mb-3 -mt-6 items-center">
      <PlayTestBackground width={"90%"} />
    </SafeAreaView>
  );
};

export default PlayTest;

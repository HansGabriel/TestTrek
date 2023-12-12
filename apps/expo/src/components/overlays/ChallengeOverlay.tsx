import React, { FC } from "react";
import { View, Text, Dimensions } from "react-native";
import { Overlay } from "@rneui/themed";
import { HotStreakLogo } from "../../icons/playtest/HotStreakLogo";
import { PhoenixLogo } from "../../icons/playtest/PhoenixLogo";
import { SafeAreaView } from "react-native-safe-area-context";


export type ChallengeType = "correct-streak" | "wrong-streak";

interface OverlayProps {
  isVisible: boolean;
  toggleVisibility: () => void;
  challengeType: ChallengeType;
}

export const ChallengeOverlay: FC<OverlayProps> = ({
  isVisible,
  toggleVisibility,
  challengeType,
}) => {
  const { height, width } = Dimensions.get("window");

  return (
    <SafeAreaView>
      <Overlay
        isVisible={isVisible}
        onBackdropPress={toggleVisibility}
        backdropStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderWidth: 0,
          borderColor: "rgba(0, 0, 0, 0)",
          justifyContent: "space-evenly",
          shadowColor: "transparent",
        }}
      >
        <View className="items-center justify-center self-center">
          {challengeType === "correct-streak" ? (
            <HotStreakLogo width={width * 0.5} height={height * 0.2} />
          ) : (
            <PhoenixLogo width={width * 0.5} height={height * 0.2} />
          )}
          <View className="w-[80%] self-center">
            <Text className=" font-nunito-extrabold text-center text-2xl text-white">
              {challengeType === "correct-streak"
                ? "NICE STREAK"
                : "REDEMPTION"}
            </Text>
            <Text className=" font-nunito-extrabold text-center text-lg text-white">
              Answer this question to gain{" "}
              {challengeType === "correct-streak" ? "double" : "triple"} points!
            </Text>
          </View>
        </View>
      </Overlay>
    </SafeAreaView>
  );
};

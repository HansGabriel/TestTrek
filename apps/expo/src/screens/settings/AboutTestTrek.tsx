import React from "react";
import { Dimensions, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsHeader from "../../components/headers/SettingsHeader";
import { TestTrekLogo } from "../../icons/logos/TestTrekIcon";

export const AboutTestTrekScreen = () => {
  const { height, width } = Dimensions.get("window");
  return (
    <SafeAreaView className="flex-1" style={{ height: height, width: width }}>
      <SettingsHeader screenName={"About TestTrek"} />
      <View className="h-[25%] w-[90%] justify-center self-center">
        <TestTrekLogo
          width={300}
          height={300}
          fill={"rgba(105, 73, 255, 1)"}
          className="self-center"
        />
      </View>
      <View className="w-[90%] self-center">
        <Text className=" font-nunito-bold self-center text-3xl">
          TestTrek v1.0
        </Text>
      </View>
      <View className=" my-auto h-[45%] w-[90%] self-center">
        <View className="mb-5 items-center">
          <Text className=" font-nunito-bold text-xl">What is TestTrek?</Text>
        </View>
        <View className="items-center self-center">
          <Text className=" font-nunito-medium text-center text-xl">
            TestTrek is a mobile application dedicated to streamline test and
            reviewer creation for students. By combining artificial
            intelligence, optical character recognition, and gamification
            elements, TestTrek is an all-in-one solution at the palm of your
            hand.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

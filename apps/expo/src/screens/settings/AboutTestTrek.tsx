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
    </SafeAreaView>
  );
};

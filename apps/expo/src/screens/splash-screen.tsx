import React, { useEffect } from "react";

import { View, SafeAreaView, Text } from "react-native";
import { TestTrekLogo } from "../icons/logos/TestTrekIcon";
import { SkypeIndicator } from "react-native-indicators";
import { useNavigation } from "@react-navigation/native";

export const SplashScreen = () => {
  const navigate = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => navigate.navigate("Walkthrough"), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="h-4/5 w-full items-center justify-center">
        <View className="h-56 w-56 items-center justify-center">
          <TestTrekLogo
            width={400}
            height={400}
            fill={"rgba(105, 73, 255, 1)"}
          />
        </View>
        <View>
          <Text className="font-nunito-bold pt-1 text-5xl">TestTrek</Text>
        </View>
      </View>
      <View>
        <SkypeIndicator
          color="rgba(105, 73, 255, 1)"
          size={50}
          count={6}
          minScale={0.1}
        />
      </View>
    </SafeAreaView>
  );
};

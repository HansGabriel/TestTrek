import React, { useEffect } from "react";

import {
  View,
  Text,
  BackHandler,
  Dimensions,
} from "react-native";
import { TestTrekLogo } from "../icons/logos/TestTrekIcon";
import { SkypeIndicator } from "react-native-indicators";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const SplashScreen = () => {
  const { height, width } = Dimensions.get("window");
  const navigate = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true;

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, []),
  );

  useEffect(() => {
    const timer = setTimeout(() => navigate.navigate("Walkthrough"), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1" style={{ height: height, width: width }}>
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

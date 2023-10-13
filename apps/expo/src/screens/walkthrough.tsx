import React, { useRef } from "react";

import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  BackHandler,
  Dimensions,
} from "react-native";
import useSignin from "../hooks/useSignin";

import WalkthroughIcon1 from "../icons/WalkthroughIcon1";
import WalkthroughIcon2 from "../icons/WalktrhoughIcon2";
import WalkthroughIcon3 from "../icons/WalkthroughIcon3";
import GoogleIcon from "../icons/GoogleIcon";
import FacebookIcon from "../icons/FacebookIcon";

import Swiper from "react-native-swiper";

import type { FC } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const WalkthroughScreen: FC = () => {
  const { height, width } = Dimensions.get("window");

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true;

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, []),
  );

  const signInWithGoogle = useSignin({
    strategy: "oauth_google",
  });

  const signInWithFacebook = useSignin({
    strategy: "oauth_facebook",
  });

  const activeDotWidth = useRef(new Animated.Value(8)).current;

  const animateDot = () => {
    activeDotWidth.setValue(8);

    Animated.timing(activeDotWidth, {
      toValue: 32,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const handleIndexChanged = () => {
    animateDot();
  };

  return (
    <SafeAreaView
      className="flex-1 items-center bg-white"
      style={{ height: height, width: width }}
    >
      <Swiper
        index={1}
        loop={true}
        onIndexChanged={handleIndexChanged}
        activeDot={
          <Animated.View
            style={[
              { width: activeDotWidth },
              {
                height: 8,
                backgroundColor: "#6949FF",
                borderRadius: 50,
                marginHorizontal: 3,
                marginVertical: 3,
              },
            ]}
          />
        }
      >
        <View className="mb-8 w-[90%] flex-1 items-center justify-center self-center">
          <WalkthroughIcon1 height={"60%"} width={"90%"} />
          <Text className="font-nunito-bold mt-10 w-[382px] text-center text-3xl leading-[51.20px] text-neutral-800">
            Create and play tests whenever and wherever you want
          </Text>
        </View>
        <View className="mb-8 w-[90%] flex-1 items-center justify-center self-center">
          <WalkthroughIcon2 height={"60%"} width={"90%"} />
          <Text className="font-nunito-bold mt-10 w-[382px] text-center text-3xl leading-[51.20px] text-neutral-800">
            Find fun and interesting tests to boost up your knowledge
          </Text>
        </View>
        <View className="mb-8 w-[90%] flex-1 items-center justify-center self-center">
          <WalkthroughIcon3 height={"60%"} width={"90%"} />
          <Text className="font-nunito-bold mt-10 w-[382px] text-center text-3xl leading-[51.20px] text-neutral-800">
            Play and take test challenges from other trekers.
          </Text>
        </View>
      </Swiper>
      <TouchableOpacity
        onPress={signInWithGoogle}
        className="mb-1 mt-5 w-[90%] rounded-2xl border-b-4 border-l border-r border-t border-zinc-100 bg-white px-8 py-[18px]"
      >
        <View className="flex flex-row items-center justify-center gap-3">
          <GoogleIcon />
          <Text className="font-nunito-semibold text-base leading-snug tracking-tight text-neutral-800">
            Continue with Google
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={signInWithFacebook}
        className="mb-5 mt-5 w-[90%] rounded-2xl border-b-4 border-l border-r border-t border-zinc-100 bg-white px-8 py-[18px]"
      >
        <View className="flex flex-row items-center justify-center gap-3">
          <FacebookIcon />
          <Text className="font-nunito-semibold text-base leading-snug tracking-tight text-neutral-800">
            Continue with Facebook
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

import { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Image,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import PodiumComponent from "./PodiumComponent";
import ConfettiCannon from "react-native-confetti-cannon";
import { FlashList } from "@shopify/flash-list";
import { BronzeMedalIcon, GoldMedalIcon, SilverMedalIcon } from "./icons";
import XIcon from "../../icons/XIcon";
import { trpc } from "../../utils/trpc";
import { RootStackScreenProps } from "../../types";
import { truncateString } from "@acme/utils/src/strings";
import congrats from "../../../assets/sounds/congratulations.mp3";
import type { FC } from "react";
import { Audio } from "expo-av";
import { useMusicStore } from "../../stores/useMusicStore";
import { playEffects } from "../../services/audioService";
import { useIsFocused } from "@react-navigation/native";
import { AppButton } from "../../components/buttons/AppButton";

export const ScoreboardScreen: FC<RootStackScreenProps<"Scoreboard">> = ({
  navigation,
  route,
}) => {
  const { testId } = route.params;
  const [isShowinConfetti, setIsShowingConfetti] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const isEffectsPlaying = useMusicStore((state) => state.isEffectsPlaying);
  const setIsScoreboardScreen = useMusicStore(
    (state) => state.setIsScoreboardScreen,
  );
  const congratsInstance = new Audio.Sound();

  const { data: topTrekersList } = trpc.test.getScoreboard.useQuery({
    testId,
  });

  const goToHome = () => {
    setIsScoreboardScreen(false);
    navigation.navigate("Home");
  };

  const goToLibrary = () => {
    navigation.navigate("MyLibrary");
  };

  useEffect(() => {
    setIsShowingConfetti(true);
    setTimeout(() => {
      setIsShowingConfetti(false);
    }, 10000);
  }, []);

  useEffect(() => {
    const backAction = () => {
      goToHome();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (isFocused) {
      setIsScoreboardScreen(true);
      if (isEffectsPlaying && topTrekersList) {
        playEffects({ sound: congratsInstance, music: congrats });
      }
    } else {
      setIsScoreboardScreen(false);
    }
  }, [isEffectsPlaying, topTrekersList, isFocused]);

  if (!topTrekersList) {
    return <></>;
  }

  const firstPlaceTreker = topTrekersList[0];
  const secondPlaceTreker = topTrekersList[1];
  const thirdPlaceTreker = topTrekersList[2];

  const remainingTrekers = topTrekersList.slice(3);

  return (
    <>
      <View className="flex-1">
        <Image
          source={require("../../../assets/images/scoreboard.png")}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
        <View className="justify-cente z-50 mb-5 mt-10 flex flex-row items-center justify-center">
          <TouchableOpacity className="absolute left-4" onPress={goToHome}>
            <XIcon color="white" colorFill="#fff" />
          </TouchableOpacity>

          <Text className="font-nunito-bold text-center text-2xl font-bold leading-[38.40px] text-white">
            Scoreboard
          </Text>
        </View>

        {firstPlaceTreker && (
          <View className="absolute top-[13%] z-50 w-full">
            <View className="relative flex flex-col items-center gap-y-3 pb-10">
              <Image
                source={{
                  uri: firstPlaceTreker.imageUrl,
                }}
                className="mx-2 h-[72px] w-[72px] rounded-full"
              />
              <View className="absolute top-[55px]">
                <GoldMedalIcon />
              </View>
              <Text className="font-nunito-bold text-center text-xl font-bold leading-loose text-white">
                {truncateString(firstPlaceTreker.firstName)}
              </Text>
              <View className="inline-flex h-8 items-center justify-center rounded-[100px] bg-white px-4 py-1.5">
                <Text className="font-nunito-bold text-center text-sm font-semibold leading-tight tracking-tight text-violet-600">
                  {firstPlaceTreker.highScore}
                </Text>
              </View>
            </View>
          </View>
        )}

        {secondPlaceTreker && (
          <View className="absolute left-8 top-[18%] z-50">
            <View className="relative flex flex-col items-center gap-y-3 pb-10">
              <Image
                source={{
                  uri: secondPlaceTreker.imageUrl,
                }}
                className="mx-2 h-[72px] w-[72px] rounded-full"
              />
              <View className="absolute top-[55px]">
                <SilverMedalIcon />
              </View>
              <Text className="font-nunito-bold text-center text-xl font-bold leading-loose text-white">
                {truncateString(secondPlaceTreker.firstName)}
              </Text>

              <View className="inline-flex h-8 items-center justify-center rounded-[100px] bg-white px-4 py-1.5">
                <Text className="font-nunito-bold text-center text-sm font-semibold leading-tight tracking-tight text-violet-600">
                  {secondPlaceTreker.highScore}
                </Text>
              </View>
            </View>
          </View>
        )}

        {thirdPlaceTreker && (
          <View className="absolute right-8 top-[23%] z-50">
            <View className="relative flex flex-col items-center gap-y-3 pb-10">
              <Image
                source={{
                  uri: thirdPlaceTreker.imageUrl,
                }}
                className="mx-2 h-[72px] w-[72px] rounded-full"
              />
              <View className="absolute top-[55px]">
                <BronzeMedalIcon />
              </View>
              <Text className="font-nunito-bold text-center text-xl font-bold leading-loose text-white">
                {truncateString(thirdPlaceTreker.firstName)}
              </Text>
              <View className="inline-flex h-8 items-center justify-center rounded-[100px] bg-white px-4 py-1.5">
                <Text className="font-nunito-bold text-center text-sm font-semibold leading-tight tracking-tight text-violet-600">
                  {thirdPlaceTreker.highScore}
                </Text>
              </View>
            </View>
          </View>
        )}

        <View className=" top-[25%]">
          <PodiumComponent width={"90%"} style={{ alignSelf: "center" }} />

          {remainingTrekers.length > 0 && (
            <View className="flex h-[200px] w-full flex-col bg-white px-4">
              <FlashList
                data={remainingTrekers}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: user, index }) => {
                  return (
                    <View
                      key={user.id}
                      className="mt-3 flex flex-row items-center justify-start border-b border-zinc-100 pb-2"
                    >
                      <Text className="font-nunito-bold mr-3 text-center text-xl font-bold leading-loose text-neutral-800">
                        {index + 4}
                      </Text>
                      <Image
                        source={{
                          uri: user.imageUrl,
                        }}
                        className="mr-5 h-12 w-12 rounded-full"
                      />
                      <Text className="font-nunito-bold text-center text-xl font-bold leading-loose text-neutral-800">
                        {user.firstName}
                      </Text>
                      <Text className="font-nunito-bold ml-auto text-center text-xl font-bold leading-loose text-neutral-800">
                        {user.highScore}
                      </Text>
                    </View>
                  );
                }}
                estimatedItemSize={7}
              />
            </View>
          )}
        </View>

        <View className="absolute top-[91%] w-full">
          <AppButton
            buttonColor="white"
            text="Go To Library"
            textColor="violet-600"
            onPress={goToLibrary}
            classNameValue="mb-5 mt-5"
            borderShadowColor="indigo-800"
            borderRadius="large"
            fontStyle="bold"
            TOwidth="[95%]"
            Vwidth="full"
          />
        </View>
      </View>

      <StatusBar barStyle="light-content" />
      {isShowinConfetti && (
        <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
      )}
    </>
  );
};

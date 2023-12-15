import { FlashList } from "@shopify/flash-list";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import TinyTestTrekIcon from "../icons/logos/TinyTestTrekIcon";
import CoinIcon from "../icons/statistics/CoinIcon";
import MedalIcon from "../icons/statistics/MedalIcon";
import TargetIcon from "../icons/statistics/TargetIcon";
import { trpc } from "../utils/trpc";
import { SkeletonLoader } from "../components/loaders/SkeletonLoader";
import useGoBack from "../hooks/useGoBack";
import { SafeAreaView } from "react-native-safe-area-context";
import BronzeBadge from "../icons/badges/BronzeBadge";
import SilverBadge from "../icons/badges/SilverBadge";
import GoldBadge from "../icons/badges/GoldBadge";

const BadgeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "bronze":
      return (
        <View className="h-full items-center justify-center self-center">
          <BronzeBadge />
          <Text className="font-nunito-extrabold text-xs">Bronze Badge</Text>
          <Text className="font-nunito-medium text-xs">20,000 Points</Text>
        </View>
      );
    case "silver":
      return (
        <View className="items-center">
          <SilverBadge />
          <Text className="font-nunito-extrabold text-xs">Silver Badge</Text>
          <Text className="font-nunito-medium text-xs">50,000 Points</Text>
        </View>
      );
    case "gold":
      return (
        <View className="items-center">
          <GoldBadge />
          <Text className="font-nunito-extrabold text-xs">Gold Badge</Text>
          <Text className="font-nunito-medium text-xs">100,000 Points</Text>
        </View>
      );
    default:
      return null;
  }
};

export const MyStatistics = () => {
  const { height, width } = Dimensions.get("window");
  const goBack = useGoBack();
  const { data: totalUserOnTop, isLoading: topLoading } =
    trpc.user.getTimesUserOnTop.useQuery();
  const { data: totalTests, isLoading: testLoading } =
    trpc.user.getTotalTests.useQuery();
  const { data: totalScore, isLoading: scoreLoading } =
    trpc.user.getTotalPoints.useQuery();
  const { data: totalPlays, isLoading: playsLoading } =
    trpc.user.getUserPlays.useQuery();

  const { data: scores, isLoading: weeklyScoreLoading } =
    trpc.user.getUserWeeklyAndDailyScores.useQuery();

  const { data: badgesList, isLoading: badgesLoading } =
    trpc.user.getBadges.useQuery();

  const data = [
    {
      name: "Tests",
      icon: <TinyTestTrekIcon />,
      value: totalTests?._count.userId,
    },
    {
      name: "Total Points",
      icon: <CoinIcon />,
      value: totalScore?.totalPoints,
    },
    { name: "Top Three", icon: <MedalIcon />, value: totalUserOnTop },
    {
      name: "Tests Taken",
      icon: <TargetIcon />,
      value: totalPlays?._count.playerId,
    },
  ];

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: scores?.dailyScores || [0, 0, 0, 0, 0, 0, 0],
        strokeWidth: 2,
      },
    ],
  };

  if (
    topLoading ||
    testLoading ||
    scoreLoading ||
    playsLoading ||
    weeklyScoreLoading ||
    badgesLoading
  ) {
    return (
      <SafeAreaView
        className="flex-1"
        style={{
          height: height,
          width: width,
        }}
      >
        <View className="mx-6 flex flex-row justify-between bg-white py-5">
          <View className="flex-row gap-4 self-center">
            <TouchableOpacity
              className="flex flex-row items-center self-center"
              onPress={goBack}
            >
              <LeftArrowIcon />
            </TouchableOpacity>
            <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
              My Statistics
            </Text>
          </View>
        </View>
        <View className="mt-8 h-[90%] w-[90%] items-center space-y-10 self-center">
          <View className=" h-[25%] w-[100%] items-center justify-center">
            <SkeletonLoader isCircular={true} width={"100%"} height={"75%"} />
          </View>
          <View className="h-[50%] w-[100%] items-center justify-evenly">
            <SkeletonLoader isCircular={true} width={"100%"} height={30} />
            <SkeletonLoader isCircular={true} width={"100%"} height={30} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        height: height,
        width: width,
      }}
    >
      <View className="flex-col">
        <View className="mx-6 flex flex-row justify-between bg-white py-5">
          <View className="flex-row gap-4 self-center">
            <TouchableOpacity
              className="flex flex-row items-center self-center"
              onPress={goBack}
            >
              <LeftArrowIcon />
            </TouchableOpacity>
            <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
              My Statistics
            </Text>
          </View>
        </View>
        <ScrollView
          style={{ height: height * 0.9, width: width }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1">
            <View className=" h-[10%] w-[90%] flex-col self-center ">
              <View className="mt-5 flex-row justify-around">
                <Text className=" font-nunito-bold text-lg">
                  Your Points This Week
                </Text>
                <Text className=" font-nunito-semibold text-base">
                  {scores?.weeklyScore} pts
                </Text>
              </View>
            </View>
            <View className=" h-[50%]  w-[90%] self-center">
              <LineChart
                style={{
                  alignSelf: "flex-start",
                }}
                data={lineData}
                width={width * 0.89}
                height={height * 0.65}
                chartConfig={{
                  backgroundColor: "white",
                  backgroundGradientFrom: "white",
                  backgroundGradientTo: "white",
                  decimalPlaces: 0,
                  color: () => `#7c3aed`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  fillShadowGradient: "rgba(105, 73, 255, 1)",
                }}
                bezier
                withInnerLines={false}
                withOuterLines={false}
                withDots={false}
              />
            </View>

            <View className=" flex w-[90%] flex-col self-center bg-white ">
              <View className="flex-row px-2">
                <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
                  My Achievements
                </Text>
              </View>
              {badgesList && badgesList.badges.length >= 1 && (
                <View
                  style={{
                    height: height * 0.12,
                  }}
                  className="mt-4 w-[100%] flex-1 flex-row items-center justify-evenly self-center rounded-2xl border border-zinc-200"
                >
                  {badgesList?.badges.map((badge, index) => (
                    <View key={index} className="flex-1">
                      {badge === "bronze" && <BadgeIcon type="bronze" />}
                      {badge === "silver" && <BadgeIcon type="silver" />}
                      {badge === "gold" && <BadgeIcon type="gold" />}
                    </View>
                  ))}
                </View>
              )}
              <View className="flex-1 " style={{ height: 300 }}>
                <FlashList
                  data={data}
                  numColumns={2}
                  estimatedItemSize={5}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <SafeAreaView className="flex-1">
                      <View className=" flex-1 self-center">
                        <View
                          className=" flex-row items-center justify-evenly rounded-2xl border border-zinc-200"
                          style={{
                            height: height * 0.1,
                            width: width * 0.4,
                          }}
                        >
                          <View className="h-[60%] w-[20%] justify-start">
                            {item.icon}
                          </View>
                          <View className="h-[90%] w-[65%] justify-center">
                            <Text className=" font-nunito-bold text-xl">
                              {item.value}
                            </Text>
                            <Text className=" font-nunito-medium text-sm">
                              {item.name}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </SafeAreaView>
                  )}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

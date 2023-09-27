import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Footer from "../components/Footer";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import TinyTestTrekIcon from "../icons/logos/TinyTestTrekIcon";
import CoinIcon from "../icons/statistics/CoinIcon";
import MedalIcon from "../icons/statistics/MedalIcon";
import TargetIcon from "../icons/statistics/TargetIcon";
import { trpc } from "../utils/trpc";
import { SkeletonLoader } from "../components/loaders/SkeletonLoader";

export const MyStatistics = () => {
  const navigation = useNavigation();
  const { data: totalUserOnTop, isLoading: topLoading } =
    trpc.user.getTimesUserOnTop.useQuery();
  const { data: totalTests, isLoading: testLoading } =
    trpc.user.getTotalTests.useQuery();
  const { data: totalScore, isLoading: scoreLoading } =
    trpc.user.getTotalScore.useQuery();
  const { data: totalPlays, isLoading: playsLoading } =
    trpc.user.getUserPlays.useQuery();

  const { data: scores, isLoading: weeklyScoreLoading } =
    trpc.user.getUserWeeklyAndDailyScores.useQuery();

  const data = [
    {
      name: "Tests",
      icon: <TinyTestTrekIcon />,
      value: totalTests?._count.userId,
    },
    {
      name: "Lifetime Points",
      icon: <CoinIcon />,
      value: totalScore?._sum.score,
    },
    { name: "Top 3 Positions", icon: <MedalIcon />, value: totalUserOnTop },
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

  const isFetching = () => {
    return (
      topLoading &&
      testLoading &&
      scoreLoading &&
      playsLoading &&
      weeklyScoreLoading
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-col pt-9">
        <View className="mx-6 flex flex-row justify-between bg-white py-5">
          <View className="flex-row gap-4 self-center">
            <TouchableOpacity
              className="flex flex-row items-center self-center"
              onPress={() => navigation.navigate("Profile")}
            >
              <LeftArrowIcon />
            </TouchableOpacity>
            <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
              My Statistics
            </Text>
          </View>
        </View>
        <ScrollView
          className=" h-[75%] w-full "
          showsVerticalScrollIndicator={false}
        >
          {isFetching() === false ? (
            <View className="flex-1">
              <View className=" h-[10%] w-[90%] flex-col self-center border-t border-l border-r border-zinc-200 ">
                <View className="mt-5 flex-row justify-around">
                  <Text className=" font-nunito-bold text-lg">
                    Your Points This Week
                  </Text>
                  <Text className=" font-nunito-semibold text-base">
                    {scores?.weeklyScore} pts
                  </Text>
                </View>
              </View>
              <View className=" h-[45%]  w-[90%] self-center border-r border-l border-b border-zinc-200">
                <LineChart
                  style={{
                    alignSelf: "flex-start",
                  }}
                  data={lineData}
                  width={Dimensions.get("window").width * 0.89}
                  height={Dimensions.get("window").height * 0.5}
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

              <View className=" mt-7 flex w-[95%] flex-col self-center bg-white ">
                <View className="flex-row gap-4 px-2 pb-5">
                  <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
                    My Achievements
                  </Text>
                </View>
                <View className="flex-1 " style={{ height: 300 }}>
                  <FlashList
                    data={data}
                    numColumns={2}
                    estimatedItemSize={5}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <SafeAreaView className="flex-1">
                        <View className="mx-2 my-2 flex-1 self-center">
                          <View className="h-20 w-40 flex-row items-center justify-center rounded-2xl border border-zinc-200">
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
          ) : (
            <View className="mt-20 h-[90%] w-[90%] items-center space-y-10 self-center">
              <View className=" h-[25%] w-[100%] items-center justify-center">
                <SkeletonLoader
                  isCircular={true}
                  width={"100%"}
                  height={"75%"}
                />
              </View>
              <View className="h-[50%] w-[100%] items-center justify-evenly">
                <SkeletonLoader isCircular={false} width={"100%"} height={20} />
                <SkeletonLoader isCircular={false} width={"100%"} height={20} />
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

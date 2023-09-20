import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Footer from "../components/Footer";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import TinyTestTrekIcon from "../icons/logos/TinyTestTrekIcon";
import { MoreCircleIcon } from "../icons/question-options";
import ClockIcon from "../icons/statistics/ClockIcon";
import CoinIcon from "../icons/statistics/CoinIcon";
import FireIcon from "../icons/statistics/FireIcon";
import MedalIcon from "../icons/statistics/MedalIcon";
import TargetIcon from "../icons/statistics/TargetIcon";

export const MyStatistics = () => {
  const navigation = useNavigation();
  const data = [
    { name: "Tests", icon: <TinyTestTrekIcon />, value: 34 },
    { name: "Lifetime Points", icon: <CoinIcon />, value: 3231 },
    { name: "Test Passed", icon: <FireIcon />, value: 123 },
    { name: "Top 3 Positions", icon: <MedalIcon />, value: 65 },
    { name: "Tests Taken", icon: <TargetIcon />, value: 132 },
    { name: "Fastest Record", icon: <ClockIcon />, value: 12 },
  ];

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 100],
        strokeWidth: 2, // optional
      },
    ],
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
          <View className="self-center">
            <TouchableOpacity>
              <MoreCircleIcon />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView className=" h-[75%] w-full ">
          <View className="flex-1">
            <View className="h-[54%] w-[90%] flex-col self-center rounded-2xl border border-zinc-200">
              <View className="mt-5 flex-row justify-around">
                <Text className=" font-nunito-bold text-lg">
                  Your Points This Week
                </Text>
                <Text className=" font-nunito-semibold text-base">875 pts</Text>
              </View>
              <View className=" mt-10 h-[47%] w-[90%] self-center ">
                <LineChart
                  style={{
                    alignSelf: "center",
                  }}
                  data={lineData}
                  width={320}
                  height={380}
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
            </View>

            <View className=" mt-5 flex w-[95%] flex-col self-center bg-white ">
              <View className="flex-row gap-4 px-2 pb-5">
                <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
                  My Achievements
                </Text>
              </View>
              <View className="flex-1 " style={{ height: 350 }}>
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
        </ScrollView>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

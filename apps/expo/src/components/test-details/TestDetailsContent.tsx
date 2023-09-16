import React from "react";
import {
  View,
  Image,
  SafeAreaView,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { IMAGE_PLACEHOLDER } from "../../constants";

import type { FC } from "react";
import type { RouterOutputs } from "../../utils/trpc";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

interface Props {
  testDetails: RouterOutputs["test"]["getById"];
}

const TestDetailsContent: FC<Props> = ({ testDetails }) => {
  const statsData = [
    { number: 45, label: "Questions" },
    { number: 5.6, label: "Played" },
    { number: 16.8, label: "Favorited" },
  ];
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <View
        style={{
          height: screenHeight / 3,
          width: screenWidth * 0.9,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: 20,
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 20,
            resizeMode: "cover",
          }}
          source={{ uri: testDetails?.imageUrl ?? IMAGE_PLACEHOLDER }}
        />
      </View>

      <Text className="font-nunito mt-3 w-[87%] break-words text-2xl font-bold leading-[38.40px] text-[#212121]">
        {testDetails?.title ?? "Test Title"}
      </Text>

      <View className="mt-5 w-[87%] border-b border-[#EEEEEE]"></View>

      {Array.from({ length: 2 }).map((_, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <View className="w-[87%] flex-row items-center justify-between py-1">
            {statsData
              .slice(rowIndex * 3, rowIndex * 3 + 3)
              .map((stat, columnIndex) => (
                <React.Fragment key={stat.label}>
                  <View className="w-1/3 flex-col items-center justify-center py-2">
                    <Text className="font-nunito-bold text-[20px] leading-[32px] text-[#212121]">
                      {stat.number}
                    </Text>
                    <Text className="font-nunito-semibold text-[16px] leading-[22.4px] text-[#424242]">
                      {stat.label}
                    </Text>
                  </View>
                  {columnIndex !== 2 && (
                    <View className="h-4/5 self-center border-l border-[#EEEEEE]"></View>
                  )}
                </React.Fragment>
              ))}
          </View>
          {rowIndex !== 1 && (
            <View className="mb-3 w-[87%] border-b border-[#EEEEEE]"></View>
          )}
        </React.Fragment>
      ))}

      <View className="w-[90%] flex-row items-center justify-between gap-4 py-3">
        <Image
          className="h-[60px] w-[60px] rounded-full"
          source={{ uri: testDetails?.user.imageUrl ?? IMAGE_PLACEHOLDER }}
        />
        <View className="flex-grow flex-col items-start justify-center gap-0.5">
          <Text className="font-nunito-bold text-[20px] leading-[32px] text-[#212121]">
            {testDetails?.user.firstName} {testDetails?.user.lastName}
          </Text>
          <Text className="font-nunito-semibold text-[14px] leading-[19.6px] text-[#616161]">
            @{testDetails?.user.username}
          </Text>
        </View>
        <TouchableOpacity className=" mt-5 items-center justify-center rounded-full bg-[#6949FF] px-5 py-1">
          <Text className="font-nunito-semibold text-center text-[12px] leading-[19.6px] text-white">
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="font-nunito mt-3 w-[87%] break-words text-xl font-bold leading-[32px] text-[#212121]">
        Description
      </Text>
      <Text className="font-nunito text-m w-[87%] break-words font-medium leading-[25.20px] tracking-tight text-[#424242]">
        {testDetails?.description ?? "N/A"}
      </Text>
    </SafeAreaView>
  );
};

export default TestDetailsContent;

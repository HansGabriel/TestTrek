import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import EditProfileButton from "../profile-buttons/EditProfileButton";
import type { FC } from "react";

const formatUsername = (fullName: string) => {
  return "@" + fullName.toLowerCase().replace(/\s+/g, "_");
};

const ProfileDetailsSection: FC = () => {
  const statsData = [
    { number: 45, label: "Tests" },
    { number: 5.6, label: "Plays" },
    { number: 16.8, label: "Players" },
    { number: 7, label: "Collections" },
    { number: 372.5, label: "Followers" },
    { number: 269, label: "Following" },
  ];

  const name = "Andrew Ainsley";
  const userName = formatUsername(name);

  return (
    <View className="mt-2 flex-1 items-center justify-start">
      <View className="mt-7 h-[236px] w-[382px] flex-col items-center gap-1">
        <View className="w-full flex-row items-center justify-between gap-4 py-3">
          <Image
            className="h-[60px] w-[60px] rounded-full"
            source={{ uri: "https://via.placeholder.com/60x60" }}
          />
          <View className="flex-grow flex-col items-start justify-center gap-0.5">
            <Text className="font-nunito-bold text-[20px] leading-[32px] text-[#212121]">
              {name}
            </Text>
            <Text className="font-nunito-semibold text-[14px] leading-[19.6px] text-[#616161]">
              {userName}
            </Text>
          </View>
          <EditProfileButton />
        </View>

        <View className="w-full border-b border-[#EEEEEE]"></View>

        {Array.from({ length: 2 }).map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <View className="w-full flex-row items-center justify-between py-1">
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
              <View className="w-full border-b border-[#EEEEEE]"></View>
            )}
          </React.Fragment>
        ))}
        <View className="w-full border-b border-[#EEEEEE]"></View>
      </View>
    </View>
  );
};

export default ProfileDetailsSection;

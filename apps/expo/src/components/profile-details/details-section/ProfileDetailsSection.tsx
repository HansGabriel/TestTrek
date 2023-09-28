import React from "react";
import { Text, View, Image, SafeAreaView } from "react-native";
import EditProfileButton from "../profile-buttons/EditProfileButton";
import type { FC } from "react";
import { Collection, Test, User } from "@prisma/client";

interface PlayObject {
  _count: {
    playerId: number;
  };
}

interface ProfileProps {
  userDetails?: User | null;
  testDetails?: Test[];
  collectionDetails?: Collection[];
  totalPlays?: PlayObject;
}

const ProfileDetailsSection: FC<ProfileProps> = ({
  userDetails,
  testDetails,
  collectionDetails,
  totalPlays,
}) => {
  if (!userDetails) {
    return <></>;
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="w-[90%] flex-col items-center self-center">
        <View className="my-3 w-[100%] flex-row items-center justify-between self-center">
          <View className="flex-grow flex-row">
            <Image
              className="h-[60px] w-[60px] rounded-full"
              source={{ uri: userDetails?.imageUrl?.toString() }}
            />
            <View className="mx-2">
              <Text className="font-nunito-bold text-lg leading-[32px] text-[#212121]">
                {userDetails?.firstName} {userDetails?.lastName}
              </Text>
              <Text className="font-nunito-semibold text-sm leading-[19.6px] text-[#616161]">
                @{userDetails?.username}
              </Text>
            </View>
          </View>
          <View>
            <EditProfileButton />
          </View>
        </View>
        <View className="my-3 w-80 flex-row justify-evenly border-t border-b border-[#EEEEEE]">
          <View className="items-center px-2 py-2">
            <Text className=" font-nunito-bold text-2xl">
              {testDetails?.length}
            </Text>
            <Text className=" font-nunito-medium text-base">Tests</Text>
          </View>
          <View className="items-center justify-center border-l border-r border-[#EEEEEE] px-5 py-2">
            <Text className=" font-nunito-bold text-2xl">
              {collectionDetails?.length}
            </Text>
            <Text className=" font-nunito-medium text-base">Collections</Text>
          </View>
          <View className="items-center px-2 py-2">
            <Text className=" font-nunito-bold text-2xl">
              {totalPlays?._count.playerId}
            </Text>
            <Text className=" font-nunito-medium text-base">Plays</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileDetailsSection;

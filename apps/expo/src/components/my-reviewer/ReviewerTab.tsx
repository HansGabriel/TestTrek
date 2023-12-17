import React from "react";
import type { FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { User, Visibility } from "@prisma/client";
import { Avatar } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { ReusablePlaceholder } from "../../placeholders/ReusablePlaceholder";
import { Ionicons } from "@expo/vector-icons";

interface ObjectProps {
  id: string;
  title: string;
  imageUrl: string;
  userId: string;
  content: string;
  visibility: Visibility;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

interface ContentProps {
  tabData?: Array<ObjectProps>;
}

export const ReviewerTabs: FC<ContentProps> = ({ tabData }) => {
  const navigation = useNavigation();

  if (tabData && tabData.length <= 0) {
    return (
      <View className="h-full">
        <ReusablePlaceholder
          icon={<Ionicons name="newspaper" size={40} color="#7c3aed" />}
          text={`No reviewers shown`}
          marginY={5}
        />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <FlashList
        showsVerticalScrollIndicator={false}
        data={tabData}
        estimatedItemSize={5}
        renderItem={({ item }) => (
          <TouchableOpacity
            className=" my-5 h-28 w-full flex-row overflow-hidden rounded-xl border-2 border-gray-100"
            onPress={() =>
              navigation.navigate("ReviewerDetails", { reviewerId: item.id })
            }
          >
            <View className=" w-32 items-center justify-center bg-violet-600">
              <Image
                className="h-full w-full"
                resizeMode="cover"
                source={{
                  uri: item.imageUrl,
                }}
              />
            </View>
            <View className=" ml-3 w-full justify-around">
              <View className="w-[55%]">
                <Text
                  className=" font-nunito-bold text-lg"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.title}
                </Text>
              </View>
              <View className="flex-row">
                <Text className=" mr-2">
                  {((fromNow) =>
                    fromNow.charAt(0).toUpperCase() + fromNow.slice(1))(
                    dayjs(item.createdAt).fromNow(),
                  )}
                </Text>
              </View>

              <View className="w-[55%] flex-row justify-between">
                <View className="flex-row">
                  <Avatar
                    rounded
                    size={24}
                    source={{
                      uri: item.user.imageUrl?.toString(),
                    }}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

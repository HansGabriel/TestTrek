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

  const goToCreateReviewer = (reviewerId: string) => () => {
    navigation.navigate("CreateReviewer", {
      reviewerId,
      type: "edit",
    });
  };

  return (
    <SafeAreaView className="flex-1">
      <FlashList
        showsVerticalScrollIndicator={false}
        data={tabData}
        estimatedItemSize={5}
        renderItem={({ item }) => (
          <TouchableOpacity
            className=" my-5 h-28 w-full flex-row overflow-hidden rounded-xl border-2 border-gray-100"
            onPress={goToCreateReviewer(item.id)}
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
                <Text className=" mr-2">{dayjs(item.createdAt).fromNow()}</Text>
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

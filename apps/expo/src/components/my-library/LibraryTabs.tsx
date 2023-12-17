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
import {
  Collection,
  Keyword,
  TestOnCollection,
  Visibility,
  Play,
  User,
} from "@prisma/client";
import { Avatar } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { ReusablePlaceholder } from "../../placeholders/ReusablePlaceholder";
import { Ionicons } from "@expo/vector-icons";

interface CollectionOnTest extends TestOnCollection {
  collection: Collection;
}

interface Player extends Play {
  player: User;
}

interface ObjectProps {
  id: string;
  userId: string;
  imageUrl: string;
  title: string;
  description: string;
  collections?: CollectionOnTest[];
  visibility: Visibility;
  keyword?: Keyword;
  createdAt: Date;
  updatedAt: Date;
  plays?: Player[];
}

interface ContentProps {
  tabData?: Array<ObjectProps>;
}

export const LibraryTabs: FC<ContentProps> = ({ tabData }) => {
  const navigation = useNavigation();

  if (tabData && tabData.length <= 0) {
    return (
      <View className="h-full">
        <ReusablePlaceholder
          icon={<Ionicons name="newspaper" size={40} color="#7c3aed" />}
          text={`No tests shown`}
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
            onPress={() =>
              navigation.navigate("TestDetails", { testId: item.id })
            }
            className=" mb-5 h-28 w-full flex-row overflow-hidden rounded-xl border-2 border-gray-100"
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
              <View className="-mb-4 w-[55%]">
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
                <Text className=" mr-2">
                  • {item.plays ? item.plays.length : 0}{" "}
                  {item.plays
                    ? item.plays.length > 1
                      ? "plays"
                      : "play"
                    : "play"}
                </Text>
              </View>

              <View className="w-[55%] flex-row justify-between">
                <View className="flex-row">
                  {item.plays?.slice(0, 5).map((playItem, index) => {
                    const playerId = playItem.playerId;
                    const isUniquePlayer = item.plays
                      ?.slice(0, index)
                      .every(
                        (prevPlayItem) => prevPlayItem.playerId !== playerId,
                      );

                    if (isUniquePlayer) {
                      return (
                        <Avatar
                          key={index}
                          rounded
                          size={24}
                          source={{
                            uri: playItem.player.imageUrl?.toString(),
                          }}
                        />
                      );
                    }
                    return null;
                  })}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

import React from "react";
import type { FC } from "react";

import { View, SafeAreaView, Text, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";

interface ObjectProps {
  firstName: string;
  lastName: string;
  thumbnails: string;
  time: string;
  views: string;
  clonedBy: Array<{
    name: string;
    avatar: string;
  }>;
}

interface ContentProps {
  tabData: Array<ObjectProps>;
}

export const LibraryTabs: FC<ContentProps> = ({ tabData }) => {
  return (
    <SafeAreaView className="flex-1">
      <FlashList
        showsVerticalScrollIndicator={false}
        data={tabData}
        estimatedItemSize={5}
        renderItem={({ item }) => (
          <View className=" my-5 h-28 w-full flex-row overflow-hidden rounded-xl border-2 border-black">
            <View className=" w-32 items-center justify-center bg-violet-600">
              <Image
                className="h-full w-full"
                resizeMode="cover"
                source={{
                  uri: item.thumbnails,
                }}
              />
            </View>
            <View className=" ml-3 w-full justify-around">
              <View>
                <Text className=" font-nunito-bold text-lg">
                  {item.firstName} {item.lastName}
                </Text>
              </View>
              <View className="flex-row">
                <Text className=" mr-2">{item.time}</Text>
                <Text className=" mr-2">.</Text>
                <Text className=" mr-2">{item.views} views</Text>
              </View>
              <View className="flex-row">
                <Text className=" mr-3 text-xs">Cloned By:</Text>
                {item.clonedBy.map((persons, index) => {
                  return (
                    <Image
                      className=" -ml-1 h-5 w-5 rounded-full"
                      key={index}
                      source={{
                        uri: persons.avatar,
                      }}
                    />
                  );
                })}
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

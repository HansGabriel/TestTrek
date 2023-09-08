import React from "react";
import type { FC } from "react";

import { View, SafeAreaView, Text, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
  Collections,
  Keyword,
  TestsOnCollections,
  Visibility,
} from ".prisma/client";

interface CollectionsOnTests extends TestsOnCollections {
  collection: Collections;
}

interface ObjectProps {
  id: string;
  userId: string;
  imageUrl: string;
  title: string;
  description: string;
  collections?: CollectionsOnTests[];
  visibility: Visibility;
  keyword?: Keyword;
  createdAt: Date;
  updatedAt: Date;
}

interface ContentProps {
  tabData?: Array<ObjectProps>;
}

export const LibraryTabs: FC<ContentProps> = ({ tabData }) => {
  return (
    <SafeAreaView className="flex-1">
      <FlashList
        showsVerticalScrollIndicator={false}
        data={tabData}
        estimatedItemSize={5}
        renderItem={({ item }) => (
          <View className=" my-5 h-28 w-full flex-row overflow-hidden rounded-xl border-2 border-gray-100">
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
              <View>
                <Text className=" font-nunito-bold text-lg">{item.title}</Text>
              </View>
              <View className="flex-row">
                <Text className=" mr-2">{item.visibility}</Text>
                <Text className=" mr-2">.</Text>
                {item.collections?.map((collectionItem, index) => {
                  return (
                    <Text key={index} className=" mr-2">
                      {collectionItem.collection.title}
                    </Text>
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

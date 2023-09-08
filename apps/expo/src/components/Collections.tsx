import React from "react";
import type { FC } from "react";

import { View, SafeAreaView, Text, ImageBackground } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { TotalAndSortHeader } from "./TotalAndSortHeader";
import { Collections } from ".prisma/client";

interface CollectionProps {
  tabData?: Collections[];
}

export const CollectionsTab: FC<CollectionProps> = ({ tabData }) => {
  return (
    <SafeAreaView className="flex-1">
      <TotalAndSortHeader
        total={tabData?.length}
        tab={"Collections"}
        filter={"newest"}
      />
      <FlashList
        data={tabData}
        numColumns={2}
        estimatedItemSize={5}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className=" mx-1 my-5">
            <ImageBackground
              source={{ uri: item.imageUrl }}
              className=" overflow-hidden rounded-xl border-2 border-white "
              imageStyle={{ opacity: 0.9 }}
            >
              <View className="h-28 w-36 content-end items-center justify-end  ">
                <Text className="font-nunito-bold my-3 max-h-[50%] max-w-[80%] rounded-2xl  bg-violet-600 p-1 text-xl text-white">
                  {item.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

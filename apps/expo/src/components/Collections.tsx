import React from "react";
import type { FC } from "react";

import { View, SafeAreaView, Text, ImageBackground } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Collection } from "@prisma/client";

interface CollectionProps {
  tabData?: Collection[];
}

export const CollectionsTab: FC<CollectionProps> = ({ tabData }) => {
  return (
    <SafeAreaView className="flex-1">
      <FlashList
        data={tabData}
        numColumns={2}
        estimatedItemSize={5}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="mx-2 my-5">
            <ImageBackground
              source={{ uri: item.imageUrl }}
              className=" overflow-hidden rounded-xl border-2 border-white "
              imageStyle={{ opacity: 0.9 }}
            >
              <View
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
              />
              <View className="h-28 w-36 content-end items-start justify-end">
                <Text className="font-nunito-bold text-s p-s my-3 ml-5 max-h-[50%] max-w-[80%] rounded-2xl text-white">
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

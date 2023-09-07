import React from "react";
import type { FC } from "react";

import { View, SafeAreaView, Text, ImageBackground } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { TotalAndSortHeader } from "./TotalAndSortHeader";

const data = [
  {
    name: "Education",
    image: "https://cdn.mos.cms.futurecdn.net/JarKa4TVZxSCuN8x8WNPSN.jpg",
  },
  {
    name: "Sports",
    image: "https://i.ytimg.com/vi/jEp9yyhwZFE/maxresdefault.jpg",
  },
  {
    name: "Medicine",
    image:
      "https://i0.wp.com/activeplayer.io/wp-content/uploads/2022/07/Genshin-Impact-live-player-count.jpg?fit=1280%2C720&amp;ssl=1",
  },
];

interface CollectionProps {
  tabData?: Array<string>;
}

export const CollectionsTab: FC<CollectionProps> = ({ tabData }) => {
  return (
    <SafeAreaView className="flex-1">
      <TotalAndSortHeader
        total={data.length}
        tab={"Collections"}
        filter={"newest"}
      />
      <FlashList
        data={data}
        numColumns={2}
        estimatedItemSize={5}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className=" mx-1 my-5">
            <ImageBackground
              source={{ uri: item.image }}
              className=" overflow-hidden rounded-xl border-2 border-white "
              imageStyle={{ opacity: 0.9 }}
            >
              <View className="h-28 w-36 content-end items-center justify-end  ">
                <Text className="font-nunito-bold my-3 max-h-[50%] max-w-[80%] rounded-2xl  bg-violet-600 p-1 text-xl text-white">
                  {item.name}
                </Text>
              </View>
            </ImageBackground>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

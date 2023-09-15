import React, { FC } from "react";

import { TouchableOpacity, View, Text } from "react-native";

import { Feather } from "@expo/vector-icons";

import { FlashList } from "@shopify/flash-list";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";

interface ContentProps {
  query: string;
}

export const SearchContent: FC<ContentProps> = ({ query }) => {
  const searchData = [{ term: "test1" }, { term: "test2" }, { term: "test3" }];

  return (
    <View>
      <Animated.View
        className=" sticky min-h-screen w-[100%] flex-1 self-center bg-white"
        entering={SlideOutUp.withInitialValues({ originY: -100 })}
        exiting={SlideInUp.withInitialValues({ originY: -100 })}
      >
        <View>
          <View className="my-3 mx-6 h-10 flex-row items-center">
            <Text className=" font-nunito-bold text-xl">Suggestions</Text>
          </View>
          <View className="my-3 border border-zinc-100" />
        </View>
        <FlashList
          className=" self-center"
          estimatedItemSize={5}
          data={searchData}
          extraData={query}
          renderItem={({ item }) => (
            <View className="my-3 flex-1 flex-row justify-around space-x-28">
              <Text className=" font-nunito-bold text-lg text-gray-600">
                {item.term}
              </Text>
              <TouchableOpacity>
                <Feather name="x" size={24} color="gray" />
              </TouchableOpacity>
            </View>
          )}
        />
      </Animated.View>
    </View>
  );
};

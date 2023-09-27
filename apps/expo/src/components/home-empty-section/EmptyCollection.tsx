import React, { FC } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import HomeEmptyCollectionBanner from "../../icons/home-empty-section/HomeEmptyCollectionBanner";

const HomeEmptyCollection: FC = () => {
  return (
    <SafeAreaView>
      <View className="h-[75%] items-center">
        <HomeEmptyCollectionBanner />
      </View>

      <View className="left-9 bottom-8 h-[23%] w-[30%]">
        <TouchableOpacity className=" h-[100%] rounded-lg bg-purple-600">
          <Text className="font-nunito top-2 h-4 w-[100%] break-words text-center text-xs font-bold text-white">
            Create Collection
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeEmptyCollection;

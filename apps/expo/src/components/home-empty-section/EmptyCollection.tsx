import React, { FC } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import HomeEmptyCollectionBanner from "../../icons/home-empty-section/HomeEmptyCollectionBanner";
import { useNavigation } from "@react-navigation/native";

const HomeEmptyCollection: FC = () => {
  const navigation = useNavigation();

  const goToCreateCollectionScreen = () => {
    navigation.navigate("CreateCollection");
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="h-[75%] items-center">
        <HomeEmptyCollectionBanner width={"90%"} />
      </View>

      <View className="bottom-8 left-9 h-[23%] w-[30%]">
        <TouchableOpacity
          className=" h-[100%] rounded-lg bg-purple-600"
          onPress={goToCreateCollectionScreen}
        >
          <Text className="font-nunito top-2 h-4 w-[100%] break-words text-center text-xs font-bold text-white">
            Create Collection
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeEmptyCollection;

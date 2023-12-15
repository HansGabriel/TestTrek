import React, { FC } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import HomeEmptyTestBanner from "../../icons/home-empty-section/HomeEmptyTestBanner";
import { useNavigation } from "@react-navigation/native";

const HomeEmptyTest: FC = () => {
  const navigation = useNavigation();

  const goToCreateTestScreen = () => {
    navigation.navigate("CreateTest");
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="h-[75%] items-center">
        <HomeEmptyTestBanner width={"90%"} />
      </View>

      <View className="bottom-8 left-9 h-[23%] w-[30%]">
        <TouchableOpacity
          className=" h-[100%] rounded-lg bg-purple-600"
          onPress={goToCreateTestScreen}
        >
          <Text className="font-nunito top-2 h-4 w-[100%] break-words text-center text-xs font-bold text-white">
            Create Test
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeEmptyTest;

import React, { FC } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import HomeEmptyReviewerBanner from "../../icons/home-empty-section/HomeEmptyReviewerBanner";
import { useNavigation } from "@react-navigation/native";

const HomeEmptyReviewer: FC = () => {
  const navigation = useNavigation();

  const goToCreateReviewerScreen = () => {
    navigation.navigate("CreateReviewer");
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="h-[75%] items-center">
        <HomeEmptyReviewerBanner width={"90%"} />
      </View>

      <View className="bottom-8 left-9 h-[23%] w-[30%]">
        <TouchableOpacity
          className=" h-[100%] rounded-lg bg-purple-600"
          onPress={goToCreateReviewerScreen}
        >
          <Text className="font-nunito top-2 h-4 w-[100%] break-words text-center text-xs font-bold text-white">
            Create Reviewer
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeEmptyReviewer;

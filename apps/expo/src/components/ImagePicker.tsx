import React from "react";
import { Image, View, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import type { FC } from "react";

interface Props {
  image?: string;
  className?: string;
  type?: "test" | "question";
}

const TestImagePicker: FC<Props> = ({ image, className, type = "test" }) => {
  const navigation = useNavigation();

  const goToImageGallery = () => {
    navigation.navigate("AddCoverImage", {
      query: "Sample Images",
      type,
    });
  };

  return (
    <TouchableOpacity onPress={goToImageGallery} className={className}>
      {image ? (
        <View className="mx-auto h-56 w-full items-center justify-center rounded-3xl">
          <Image source={{ uri: image }} className="h-60 w-full rounded-3xl" />
        </View>
      ) : (
        <View className="mx-auto h-56 w-full items-center justify-center rounded-3xl border-2 border-violet-600 bg-neutral-50">
          <FontAwesome name="image" size={48} color="rgba(105, 73, 255, 1)" />
          <Text className="font-nunito-bold mt-4 text-violet-600">
            Add Cover Image
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default TestImagePicker;

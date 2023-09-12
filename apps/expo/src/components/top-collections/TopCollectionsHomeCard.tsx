import { View, ImageBackground, Text } from "react-native";

import type { FC } from "react";

interface Props {
  imageSource: string;
  name: string;
}

const TopTrekersHomeSection: FC<Props> = (props) => {
  return (
    <View className="my-2 ml-6">
      <ImageBackground
        source={{ uri: props.imageSource }}
        className="overflow-hidden rounded-xl border-2 border-white"
        style={{ position: "relative" }}
      >
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        ></View>

        <View className="ml-5 h-28 w-36 content-end items-start justify-end">
          <Text className="font-nunito-bold text-s p-s my-3 max-h-[50%] max-w-[80%] rounded-2xl text-white">
            {props.name}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default TopTrekersHomeSection;

import { View, Text, Image, type ImageSourcePropType } from "react-native";
import type { FC } from "react";

interface Props {
  imageSource: ImageSourcePropType;
  name: string;
}

const TopTrekersHomeCard: FC<Props> = (props) => {
  return (
    <View className="h-21 mx-3 w-20 flex-shrink-0 flex-col items-center justify-center p-2">
      <View className="relative h-20 w-20">
        <Image
          className="absolute left-0 top-0 h-20 w-20 rounded-full"
          source={props.imageSource}
        />
      </View>
      <Text
        className="text-#212121 font-nunito-bold leading-5.6 self-stretch break-words text-center tracking-tighter"
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {props.name}
      </Text>
    </View>
  );
};

export default TopTrekersHomeCard;

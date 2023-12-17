import { View, Text, TouchableOpacity } from "react-native";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import type { FC } from "react";
import useGoBack from "../../hooks/useGoBack";

interface HeaderProps {
  screenName: string;
}

const SettingsHeader: FC<HeaderProps> = ({ screenName }) => {
  const goBack = useGoBack();
  return (
    <>
      <View className="mx-5 flex  flex-row justify-between py-5">
        <View className="w-[90%] flex-row gap-4 self-center">
          <TouchableOpacity
            onPress={goBack}
            className="flex flex-row items-center self-center p-1"
            hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
          >
            <LeftArrowIcon />
          </TouchableOpacity>
          <Text
            className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {screenName}
          </Text>
        </View>
      </View>
    </>
  );
};
export default SettingsHeader;

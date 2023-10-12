import { View, Text, TouchableOpacity } from "react-native";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import type { FC } from "react";

interface HeaderProps {
  screenName: string;
  optionIcon?: React.ReactNode;
  onIconPress?: () => void;
  backIcon?: React.ReactNode;
  handleExit? : () => void
}

export const ReusableHeader: FC<HeaderProps> = ({
  screenName,
  optionIcon,
  onIconPress,
  backIcon = <LeftArrowIcon />,
  handleExit,
}) => {
  return (
    <>
      <View className="mx-5 flex  flex-row justify-between py-5 z-50" >
        <View className="flex-row gap-4 self-center">
          <TouchableOpacity
            onPress={handleExit}
            className="flex flex-row items-center self-center"
          >
            {backIcon}
          </TouchableOpacity>
          <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
            {screenName}
          </Text>
        </View>
        <TouchableOpacity onPress={onIconPress} className="self-center">
          {optionIcon}
        </TouchableOpacity>
      </View>
    </>
  );
};

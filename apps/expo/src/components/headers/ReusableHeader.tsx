import { View, Text, TouchableOpacity } from "react-native";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import type { FC } from "react";
import useGoBack from "../../hooks/useGoBack";

interface HeaderProps {
  screenName: string;
  optionIcon?: React.ReactNode;
  onIconPress?: () => void;
  backIcon?: React.ReactNode;
}

export const ReusableHeader: FC<HeaderProps> = ({
  screenName,
  optionIcon,
  onIconPress,
  backIcon = <LeftArrowIcon />,
}) => {
  const goBack = useGoBack();
  return (
    <>
      <View className="mx-5 mt-7 flex  flex-row justify-between py-5">
        <View className="flex-row gap-4 self-center">
          <TouchableOpacity
            onPress={goBack}
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

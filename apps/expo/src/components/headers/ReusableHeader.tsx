/* eslint-disable @typescript-eslint/no-empty-function */
import { View, Text, TouchableOpacity } from "react-native";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import { zip } from "lodash";
import type { FC } from "react";
import type { ViewProps } from "react-native";

interface HeaderProps extends ViewProps {
  screenName: string;
  optionIcon?: React.ReactNode | React.ReactNode[];
  onIconPress?: (() => void)[] | (() => void);
  backIcon?: React.ReactNode;
  handleExit?: () => void;
}

export const ReusableHeader: FC<HeaderProps> = ({
  screenName,
  optionIcon,
  onIconPress = () => {},
  backIcon = <LeftArrowIcon />,
  handleExit,
  ...props
}) => {
  const singleOnPress = () => {
    if (typeof onIconPress === "function") {
      onIconPress();
    }
  };

  return (
    <>
      <View
        className="z-50 mx-5  flex flex-row justify-between py-5"
        {...props}
      >
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

        {Array.isArray(optionIcon) && Array.isArray(onIconPress) ? (
          <View className="flex flex-row gap-6">
            {zip(optionIcon, onIconPress).map(([icon, onPress], index) => {
              return (
                <TouchableOpacity
                  onPress={onPress}
                  className="self-center"
                  key={index}
                >
                  {icon}
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <TouchableOpacity onPress={singleOnPress} className="self-center">
            {optionIcon}
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

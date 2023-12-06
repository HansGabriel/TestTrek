import { View, Text, TouchableOpacity } from "react-native";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import DeleteDropdown from "../dropdowns/DeleteDropdown";

import type { FC } from "react";
import type { ViewProps } from "react-native";

interface HeaderProps extends ViewProps {
  screenName: string;
  showDeleteIcon?: boolean;
  onDeletePress?: () => void;
  optionIcon?: React.ReactNode;
  onIconPress?: () => void;
  backIcon?: React.ReactNode;
  handleExit?: () => void;
  isDeleting?: boolean;
}

export const ReusableHeader: FC<HeaderProps> = ({
  screenName = "",
  optionIcon,
  onIconPress,
  backIcon = <LeftArrowIcon />,
  handleExit,
  showDeleteIcon = false,
  onDeletePress,
  isDeleting = false,
  ...props
}) => {
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
        <View className="flex flex-row items-center gap-x-4">
          {showDeleteIcon && onDeletePress && (
            <DeleteDropdown
              onDelete={onDeletePress}
              isLoading={isDeleting}
              itemName={screenName}
            />
          )}

          <TouchableOpacity onPress={onIconPress} className="self-center">
            {optionIcon}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

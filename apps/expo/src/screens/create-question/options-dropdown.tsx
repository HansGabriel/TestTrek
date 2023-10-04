import React, { useState } from "react";
import { TouchableOpacity, Text, View, Alert } from "react-native";
import { MoreCircleIcon, DeleteIcon } from "../../icons/question-options";

import type { FC } from "react";

interface Props {
  onDelete: () => void;
}

const OptionsDropdown: FC<Props> = ({ onDelete }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleAlertDelete = () => {
    Alert.alert(
      "Delete Question",
      "Are you sure you want to delete this question?",
      [
        {
          text: "Cancel",
          onPress: () => setShowDropdown(false),
          style: "cancel",
        },
        { text: "Delete", onPress: onDelete },
      ],
    );
  };

  return (
    <View className="relative">
      <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
        <MoreCircleIcon />
      </TouchableOpacity>
      {showDropdown && (
        <View className="pr-auto absolute right-1 top-10 flex h-[80px] w-[120px] flex-col items-center justify-center gap-y-4 rounded-[20px] bg-white pb-5 pt-2 shadow">
          <TouchableOpacity
            className="ml-4 mr-auto flex flex-row items-center justify-between"
            onPress={handleAlertDelete}
          >
            <DeleteIcon />
            <Text className="ml-2 text-sm font-semibold leading-tight tracking-tight text-rose-500">
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default OptionsDropdown;

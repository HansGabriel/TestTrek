import React, { useState } from "react";
import { Alert, ActivityIndicator } from "react-native";
import { TouchableOpacity, Text, View } from "react-native";
import { MoreCircleIcon, DeleteIcon } from "../../icons/question-options";

import type { FC } from "react";

interface Props {
  onDelete: () => void;
  isLoading?: boolean;
}

const DeleteDropdown: FC<Props> = ({ onDelete, isLoading = false }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleDelete = () => {
    Alert.alert(
      "Delete Question",
      "Are you sure you want to delete this question?",
      [
        {
          text: "Cancel",
          onPress: () => setShowDropdown(false),
          style: "cancel",
        },
        { text: "OK", onPress: onDelete },
      ],
    );
  };

  return (
    <View className="relative">
      <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
        <MoreCircleIcon />
      </TouchableOpacity>
      {showDropdown && (
        <View className="pr-auto absolute right-0 top-10 flex h-[60px] w-[120px] flex-col items-center justify-center gap-y-4 rounded-[20px] bg-white pb-5 pt-2 shadow">
          {isLoading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <TouchableOpacity
              className="ml-4 mr-auto flex flex-row items-center justify-between"
              onPress={handleDelete}
            >
              <DeleteIcon />
              <Text className="ml-2 text-sm font-semibold leading-tight tracking-tight text-rose-500">
                Delete
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default DeleteDropdown;

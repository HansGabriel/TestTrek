import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import {
  MoreCircleIcon,
  DeleteIcon,
  SaveIcon,
} from "../../icons/question-options";

import type { FC } from "react";

interface Props {
  onSave: () => void;
  onDelete: () => void;
}

const OptionsDropdown: FC<Props> = ({ onSave, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <View className="relative">
      <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
        <MoreCircleIcon />
      </TouchableOpacity>
      {showDropdown && (
        <View className="pr-auto absolute right-1 top-10 flex h-[120px] w-[120px] flex-col items-center justify-center gap-y-4 rounded-[20px] bg-white pb-5 pt-2 shadow">
          <TouchableOpacity
            className="ml-4 mr-auto flex flex-row items-center justify-between"
            onPress={onSave}
          >
            <SaveIcon />
            <Text className="ml-2 text-sm font-semibold leading-tight tracking-tight text-neutral-800">
              Save
            </Text>
          </TouchableOpacity>
          <View className="relative h-[0px] w-[85px]">
            <View className="absolute left-0 top-0 h-[0px] w-[85px] border border-zinc-100"></View>
          </View>
          <TouchableOpacity
            className="ml-4 mr-auto flex flex-row items-center justify-between"
            onPress={onDelete}
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

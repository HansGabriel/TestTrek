import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import {
  MoreCircleIcon,
  DeleteIcon,
  EyeIcon,
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
        <View className="pr-auto absolute top-10 right-1 flex h-[164px] w-[120px] flex-col items-center justify-center gap-y-4 rounded-[20px] bg-white py-5 shadow">
          <TouchableOpacity className="mr-auto ml-4 flex flex-row items-center justify-between">
            <EyeIcon />
            <Text className="ml-2 text-sm font-semibold leading-tight tracking-tight text-neutral-800">
              Preview
            </Text>
          </TouchableOpacity>
          <View className="relative h-[0px] w-[85px]">
            <View className="absolute left-0 top-0 h-[0px] w-[85px] border border-zinc-100"></View>
          </View>
          <TouchableOpacity
            className="mr-auto ml-4 flex flex-row items-center justify-between"
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
            className="mr-auto ml-4 flex flex-row items-center justify-between"
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

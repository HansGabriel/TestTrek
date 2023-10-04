import React, { useState } from "react";
import { TouchableOpacity, Text, View, Alert } from "react-native";
import { MoreCircleIcon } from "../../icons/question-options";
import { Ionicons } from "@expo/vector-icons";

import type { FC } from "react";

interface Props {
  onSave: () => void;
  onExit: () => void;
}

const PlayDropdown: FC<Props> = ({ onSave, onExit }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const exitAlert = () =>
    Alert.alert(
      "Exit",
      "Are you sure you want to exit? You will lose all your progress.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Exit",
          onPress: onExit,
          style: "destructive",
        },
      ],
      {
        cancelable: true,
      },
    );

  const saveAlert = () =>
    Alert.alert(
      "Stop",
      "Are you sure you want to stop? You will end the test early.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Stop",
          onPress: onSave,
          style: "default",
        },
      ],
      {
        cancelable: true,
      },
    );

  return (
    <View className="relative">
      <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
        <MoreCircleIcon />
      </TouchableOpacity>
      {showDropdown && (
        <View className="pr-auto absolute right-1 top-10 flex h-[120px] w-[120px] flex-col items-center justify-center gap-y-4 rounded-[20px] bg-white pb-5 pt-2 shadow">
          <TouchableOpacity
            className="ml-4 mr-auto flex flex-row items-center justify-between"
            onPress={saveAlert}
          >
            <Ionicons name="stop-circle-outline" size={24} color="black" />
            <Text className="ml-2 text-sm font-semibold leading-tight tracking-tight text-neutral-800">
              Stop
            </Text>
          </TouchableOpacity>
          <View className="relative h-[0px] w-[85px]">
            <View className="absolute left-0 top-0 h-[0px] w-[85px] border border-zinc-100"></View>
          </View>
          <TouchableOpacity
            className="ml-4 mr-auto flex flex-row items-center justify-between"
            onPress={exitAlert}
          >
            <Ionicons name="exit-outline" size={24} color="red" />
            <Text className="ml-2 text-sm font-semibold leading-tight tracking-tight text-rose-500">
              Exit
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PlayDropdown;

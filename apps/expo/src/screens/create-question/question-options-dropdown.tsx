import React from "react";
import { TouchableOpacity, View, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import type { FC } from "react";

interface Props {
  isDeleting: boolean;
  setOpenDeleteAlert: () => void;
}

const QuestionOptionsDropdown: FC<Props> = ({
  isDeleting,
  setOpenDeleteAlert,
}) => {
  return (
    <View className="relative flex-row space-x-4">
      <TouchableOpacity onPress={setOpenDeleteAlert} disabled={isDeleting}>
        {isDeleting ? (
          <ActivityIndicator size="small" color="red" />
        ) : (
          <AntDesign name="delete" size={24} color="red" />
        )}
      </TouchableOpacity>
      <TouchableOpacity>
        <Entypo name="save" size={25} color="rgb(79 70 229)" />
      </TouchableOpacity>
    </View>
  );
};

export default QuestionOptionsDropdown;

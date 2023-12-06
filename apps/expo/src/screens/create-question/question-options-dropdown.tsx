import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import type { FC } from "react";

interface Props {
  isSaved: boolean;
  handleSaveAnswer: () => void;
}

const QuestionOptionsDropdown: FC<Props> = ({ isSaved, handleSaveAnswer }) => {
  return (
    <View className="relative flex-row space-x-5 self-center">
      <TouchableOpacity disabled={isSaved} onPress={handleSaveAnswer}>
        <Entypo name="save" size={25} color="rgb(79 70 229)" />
      </TouchableOpacity>
    </View>
  );
};

export default QuestionOptionsDropdown;

import React, { useState } from "react";
import { View, TextInput, Button, Text, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import type { FC } from "react";

interface CustomCheckBoxProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

interface ControlButtonProps {
  label: string;
  onChange: (newValue: boolean) => void;
  value: boolean;
}

const CustomCheckBox: FC<CustomCheckBoxProps> = ({ value, onValueChange }) => (
  <TouchableOpacity
    className={`border-1 mr-1 h-5 w-5 items-center justify-center rounded-sm border-gray-400 ${
      value ? "bg-blue-500" : ""
    }`}
    onPress={() => onValueChange(!value)}
  />
);

const ControlButton: FC<ControlButtonProps> = ({ label, onChange, value }) => (
  <View className="mr-2 flex-row items-center">
    <CustomCheckBox value={value} onValueChange={onChange} />
    <Text>{label}</Text>
  </View>
);

const AppTextInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [isBulleted, setIsBulleted] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleShowText = () => {
    setShowText(!showText);
  };

  return (
    <View className="flex-1 p-2">
      <View className="mb-2 flex-row items-center justify-between">
        <ControlButton label="Bold" onChange={setIsBold} value={isBold} />
        <ControlButton label="Italic" onChange={setIsItalic} value={isItalic} />
        <ControlButton
          label="Underline"
          onChange={setIsUnderlined}
          value={isUnderlined}
        />
        <ControlButton
          label="Bullet"
          onChange={setIsBulleted}
          value={isBulleted}
        />
      </View>
      <TextInput
        className={`border-1 flex-1 border-gray-400 p-2 ${
          isBold ? "font-bold" : ""
        } ${isItalic ? "italic" : ""} ${isUnderlined ? "underline" : ""} ${
          isBulleted ? "pl-2" : ""
        }`}
        multiline
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title="Show Text" onPress={handleShowText} />
      {showText && (
        <ScrollView
          className="border-1 mt-2 max-h-64 overflow-auto border-gray-300 bg-gray-100"
          showsVerticalScrollIndicator={true}
        >
          <Text className="p-4 text-lg">{inputValue}</Text>
        </ScrollView>
      )}
    </View>
  );
};

export default AppTextInput;

import { View, Text, TextInput, type TextInputProps } from "react-native";

import type { FC } from "react";

interface Props {
  textInputProps: TextInputProps;
  label: string;
}

const AppTextInput: FC<Props> = ({ label, textInputProps }) => {
  const { onBlur, onChangeText, value, ...props } = textInputProps;

  return (
    <View className="my-2 flex flex-col">
      <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
        {label}
      </Text>
      <TextInput
        className="border-primary-1 font-nunito-bold border-b py-2"
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={value}
        {...props}
      />
    </View>
  );
};
export default AppTextInput;

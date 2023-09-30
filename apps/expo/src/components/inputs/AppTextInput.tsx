import { View, Text, TextInput, type TextInputProps } from "react-native";
import { match } from "ts-pattern";

import type { FC } from "react";

interface Props {
  textInputProps: TextInputProps;
  label: string;
  type?: "text" | "textarea";
}

const AppTextInput: FC<Props> = ({ label, textInputProps, type = "text" }) => {
  const { onBlur, onChangeText, value, ...props } = textInputProps;

  return (
    <View className="my-2 flex flex-col">
      <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
        {label}
      </Text>
      {match(type)
        .with("text", () => (
          <TextInput
            className="border-primary-1 font-nunito-bold border-b py-2"
            onBlur={onBlur}
            placeholderTextColor="#9E9E9E"
            onChangeText={onChangeText}
            value={value}
            {...props}
          />
        ))
        .with("textarea", () => (
          <TextInput
            className="border-primary-1 font-nunito-bold mt-2 h-52 rounded-lg border px-5 py-3"
            multiline
            numberOfLines={4}
            onBlur={onBlur}
            placeholderTextColor="#9E9E9E"
            onChangeText={onChangeText}
            value={value}
            {...props}
          ></TextInput>
        ))
        .otherwise(() => (
          <></>
        ))}
    </View>
  );
};
export default AppTextInput;

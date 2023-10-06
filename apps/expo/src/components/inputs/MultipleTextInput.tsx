import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { View, Text, TextInput, type TextInputProps } from "react-native";
import useToast from "../../hooks/useToast";

import type { FC } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  onChangeTexts: (value: string[]) => void;
  label: string;
  texts: string[];
  textInputProps: TextInputProps;
}

const MultipleTextInput: FC<Props> = ({
  label,
  texts,
  onChangeTexts,
  textInputProps,
}) => {
  const { showToast } = useToast();
  const [inputText, setInputText] = useState<string>("");

  const handleOnSubmitEditing = () => {
    if (!inputText) {
      return;
    }
    if (texts.includes(inputText)) {
      showToast("Keyword already exists");
      return;
    }
    if (texts.length >= 5) {
      showToast("You can only add up to 5 keywords");
      return;
    }
    onChangeTexts([...texts, inputText]);
    setInputText("");
  };

  const handleOnRemoveText = (text: string) => {
    onChangeTexts(texts.filter((t) => t !== text));
  };

  useEffect(() => {
    setInputText("");
  }, [texts]);

  return (
    <View className="my-2 flex flex-col">
      <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
        {label}
      </Text>
      <TextInput
        className="border-primary-1 font-nunito-bold border-b py-2"
        {...textInputProps}
        value={inputText}
        placeholderTextColor="#9E9E9E"
        onChangeText={setInputText}
        onSubmitEditing={handleOnSubmitEditing}
      />
      <View className="mt-8 flex flex-row flex-wrap">
        {texts?.map((text, idx) => (
          <TouchableOpacity
            key={`${text}-${idx}`}
            onPress={() => handleOnRemoveText(text)}
            className="mb-2 mr-3 flex min-w-min flex-row items-center justify-center rounded-[100px] border border-violet-600 px-5 py-2"
          >
            <Text className="mr-2 text-center text-base font-semibold leading-snug tracking-tight text-violet-600">
              {text}
            </Text>
            <Feather name="x" size={24} color="#6949FF" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default MultipleTextInput;

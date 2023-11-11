import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { chunk } from "lodash";

import type { FC } from "react";
import { AppButton } from "../buttons/AppButton";
import XIcon from "../../icons/XIcon";

type Option = {
  id: string;
  title: string;
  value: number;
  isSelected: boolean;
};

interface Props {
  title: string;
  options: Option[];
  isVisible: boolean;
  setIsVisible: () => void;
  setOptions: (options: Option[]) => void;
  handleAIPress: () => void;
  selectButtonText?: string;
  handleSelectPress: () => void;
  isLoading?: boolean;
}

const ChoiceModal: FC<Props> = ({
  title,
  options,
  isVisible,
  setIsVisible,
  setOptions,
  handleAIPress,
  handleSelectPress,
  isLoading = false,
  selectButtonText = "Select Reviewer",
}) => {
  const handleOptionPress = (id: string) => {
    const newOptions = options.map((option) => {
      //{DO NOT REMOVE YET}
      // if (option.id === id && option.isSelected) {
      //   return {
      //     ...option,
      //     isSelected: false,
      //   };
      // }

      if (option.id === id) {
        return {
          ...option,
          isSelected: true,
        };
      }

      return {
        ...option,
        isSelected: false,
      };
    });

    setOptions(newOptions);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <TouchableWithoutFeedback className="border-2" disabled={isLoading}>
        <View className="absolute inset-0 h-[100%] w-[100%] flex-1 bg-black/70">
          <View className="flex-1 items-center justify-center bg-opacity-50 shadow shadow-black/80">
            <View className="flex h-[60%] w-[90%] flex-col items-center justify-evenly rounded-2xl bg-white">
              <TouchableOpacity
                className="-mt-[9%] mr-2 self-end"
                onPress={setIsVisible}
              >
                <XIcon className="self-end" />
              </TouchableOpacity>

              <View className="-mt-7 w-[90%]">
                <Text className="self-center px-5 text-center text-2xl font-bold">
                  {title}
                </Text>
              </View>

              <View className="w-[90%] self-center">
                {chunk(options, 2).map((row, idx) => (
                  <View
                    key={idx}
                    className="my-3 flex w-[100%] flex-row items-center justify-around self-center"
                  >
                    {row.map((option) => (
                      <TouchableOpacity
                        key={option.id}
                        className={`inline-flex h-[53px] w-[138px] flex-col items-center justify-center rounded-xl border-b-2 ${
                          option.isSelected
                            ? "border-indigo-700 bg-purple-500"
                            : "border-neutral-200 bg-neutral-100"
                        } p-3`}
                        onPress={() => handleOptionPress(option.id)}
                        disabled={false}
                      >
                        <Text
                          className={`self-stretch text-center text-lg font-bold leading-[28.80px] ${
                            option.isSelected
                              ? "text-white"
                              : "text-neutral-700"
                          }`}
                        >
                          {option.title}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
              <View className="h-[0px] w-full self-center border border-zinc-100" />
              <View className="w-[90%] flex-row justify-evenly">
                <View>
                  <AppButton
                    text={selectButtonText}
                    buttonColor="violet-600"
                    borderShadowColor="indigo-800"
                    borderRadius="full"
                    fontStyle="bold"
                    textColor="white"
                    TOwidth="full"
                    Vwidth="36"
                    onPress={handleSelectPress}
                    isLoading={isLoading}
                    disabled={isLoading}
                  />
                </View>
                <View>
                  <AppButton
                    text="Ask AI"
                    buttonColor="violet-600"
                    borderShadowColor="indigo-800"
                    borderRadius="full"
                    fontStyle="bold"
                    textColor="white"
                    TOwidth="full"
                    Vwidth="32"
                    onPress={handleAIPress}
                    disabled={isLoading}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ChoiceModal;

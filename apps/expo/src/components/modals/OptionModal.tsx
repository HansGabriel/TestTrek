import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import { chunk } from "lodash";

import type { FC } from "react";

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
  setIsVisible: (isVisible: boolean) => void;
  setOptions: (options: Option[]) => void;
}

const OptionModal: FC<Props> = ({
  title,
  options,
  isVisible,
  setIsVisible,
  setOptions,
}) => {
  const handleClose = () => {
    setIsVisible(false);
  };

  const handleOptionPress = (id: string) => {
    const newOptions = options.map((option) => {
      if (option.id === id) {
        return {
          ...option,
          isSelected: !option.isSelected,
        };
      }

      return option;
    });

    setOptions(newOptions);
  };

  const hasMoreThanOneSelected =
    options.filter((option) => option.isSelected).length >= 1;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setIsVisible(false);
      }}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <BlurView intensity={10} className="absolute inset-0">
          <View className="flex-1 items-center justify-center bg-opacity-50 shadow shadow-black/80">
            <View className="flex h-3/4 w-11/12 items-center rounded-2xl bg-white">
              <Text className="mt-10 text-center text-2xl font-bold">
                {title}
              </Text>

              <View className="my-5 flex flex-col items-center justify-between"></View>

              {chunk(options, 2).map((row) => (
                <View className="mt-5 flex flex-row items-center justify-between gap-x-2">
                  {row.map((option) => (
                    <TouchableOpacity
                      className={`inline-flex h-[53px] w-[138px] flex-col items-center justify-center rounded-xl border-b-2 ${
                        option.isSelected
                          ? "border-indigo-700 bg-violet-600"
                          : "border-neutral-200 bg-neutral-100"
                      } p-3`}
                      onPress={() => handleOptionPress(option.id)}
                      disabled={!option.isSelected && hasMoreThanOneSelected}
                    >
                      <Text
                        className={`self-stretch text-center text-lg font-bold leading-[28.80px] ${
                          option.isSelected ? "text-white" : "text-neutral-700"
                        }`}
                      >
                        {option.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}

              <TouchableOpacity
                className="mt-auto mb-5 h-[58px] w-[284px] items-center justify-center rounded-[100px] border-b-2 border-indigo-700 bg-violet-600 px-4 py-[18px]"
                onPress={handleClose}
              >
                <Text className="shrink grow basis-0 text-center text-base font-bold leading-snug tracking-tight text-white">
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default OptionModal;

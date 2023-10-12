import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
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
  buttonText?: string;
}

const OptionModal: FC<Props> = ({
  title,
  options,
  isVisible,
  setIsVisible,
  setOptions,
  buttonText = "Ok",
}) => {
  const handleClose = () => {
    setIsVisible(false);
  };

  const handleOptionPress = (id: string) => {
    const newOptions = options.map((option) => {
      if (option.id === id && option.isSelected) {
        return {
          ...option,
          isSelected: false,
        };
      }

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
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setIsVisible(false);
      }}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View className="absolute inset-0 h-[100%] w-[100%] flex-1 bg-black/70">
          <View className="flex-1 items-center justify-center bg-opacity-50 shadow shadow-black/80">
            <View className="flex h-3/4 w-11/12 items-center rounded-2xl bg-white">
              <Text className="mt-10 self-center px-5 text-center text-2xl font-bold">
                {title}
              </Text>

              <View className="my-5 flex flex-col items-center justify-between"></View>

              {chunk(options, 2).map((row, idx) => (
                <View
                  key={idx}
                  className="mt-5 flex w-[90%] flex-row items-center justify-around self-center"
                >
                  {row.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      className={`inline-flex h-[53px] w-[138px] flex-col items-center justify-center rounded-xl border-b-2 ${
                        option.isSelected
                          ? "border-indigo-700 bg-violet-600"
                          : "border-neutral-200 bg-neutral-100"
                      } p-3`}
                      onPress={() => handleOptionPress(option.id)}
                      disabled={false}
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
                className="mb-5 mt-auto h-[58px] w-[284px] items-center justify-center rounded-[100px] border-b-2 border-indigo-700 bg-violet-600 px-4 py-[18px]"
                onPress={handleClose}
              >
                <Text className="shrink grow basis-0 text-center text-base font-bold leading-snug tracking-tight text-white">
                  {buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default OptionModal;

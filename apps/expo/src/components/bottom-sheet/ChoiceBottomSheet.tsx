import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  TestIcon,
  TFIcon,
  ChatIcon,
  CheckboxIcon,
} from "../../icons/bottom-sheet";

import type { FC } from "react";

interface Props {
  goToCreateQuestion: () => void;
}

const ChoiceBottomSheet: FC<Props> = ({ goToCreateQuestion }) => {
  return (
    <View className="flex-1 bg-white pt-10 shadow shadow-black">
      <View className="flex flex-row items-center justify-center pb-5">
        <Text className="text-center text-2xl font-semibold leading-[38.40px] text-neutral-800">
          Add Question
        </Text>
      </View>
      {/* Horizontal Line */}
      <View className="mx-6 inline-flex h-[0px] w-[382px] items-center justify-center">
        <View className="h-[0px] w-[382px] border border-zinc-100"></View>
      </View>

      {/* Cards */}
      <ScrollView className="mt-8" showsVerticalScrollIndicator={false}>
        <View className="flex flex-col items-center">
          <View className="mx-6 flex flex-row">
            <TouchableOpacity
              onPress={goToCreateQuestion}
              className="m-1 flex basis-1/2 flex-col items-center justify-center rounded-2xl border border-zinc-100 bg-neutral-50 p-4"
            >
              <View className="h-10 w-10 items-center justify-center px-[7px] py-1">
                <TestIcon />
              </View>
              <Text className="text-center text-base font-bold leading-[28.80px] text-neutral-800">
                Multiple Choice
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="m-1 flex basis-1/2 flex-col items-center justify-center rounded-2xl border border-zinc-100 bg-neutral-50 p-4">
              <View className="h-10 w-10 items-center justify-center px-[7px] py-1">
                <TFIcon />
              </View>
              <Text className="text-center text-base font-bold leading-[28.80px] text-neutral-800">
                True or False
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mx-6 flex flex-row">
            <TouchableOpacity className="m-1 flex basis-1/2 flex-col items-center justify-center rounded-2xl border border-zinc-100 bg-neutral-50 p-4">
              <View className="h-10 w-10 items-center justify-center px-[7px] py-1">
                <CheckboxIcon />
              </View>
              <Text className="text-center text-base font-bold leading-[28.80px] text-neutral-800">
                Multi Select
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="m-1 flex basis-1/2 flex-col items-center justify-center rounded-2xl border border-zinc-100 bg-neutral-50 p-4">
              <View className="h-10 w-10 items-center justify-center px-[7px] py-1">
                <ChatIcon />
              </View>
              <Text className="text-center text-base font-bold leading-[28.80px] text-neutral-800">
                Identification
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChoiceBottomSheet;

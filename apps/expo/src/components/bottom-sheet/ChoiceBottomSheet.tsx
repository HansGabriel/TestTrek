import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  TestIcon,
  TFIcon,
  ChatIcon,
  CheckboxIcon,
} from "../../icons/bottom-sheet";

import type { FC } from "react";
import type { QuestionType } from "../../stores/useQuestionStore";
import useError from "../../screens/create-question/hooks";

interface Props {
  goToCreateQuestion: (questionType: QuestionType) => void;
  closeBottomSheet?: () => void;
}

const ChoiceBottomSheet: FC<Props> = ({
  goToCreateQuestion,
  closeBottomSheet,
}) => {
  const { resetErrors } = useError();
  const handleChoicePress = (questionType: QuestionType) => () => {
    resetErrors();
    goToCreateQuestion(questionType);
    closeBottomSheet?.();
  };

  return (
    <View className="flex-1 bg-white pt-2 shadow shadow-black">
      <View className="mx-6 my-4 flex flex-row">
        <View className="w-full items-center justify-evenly self-center rounded-2xl border border-zinc-100 bg-white">
          <View className="my-2">
            <Text className="font-nunito-bold self-center text-center text-xl">
              Please choose your question type!
            </Text>
          </View>
        </View>
      </View>

      {/* Horizontal Line */}
      <View className="my-5 h-[0px] w-[382px] self-center border border-zinc-100" />

      {/* Cards Choices */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-col items-center">
          <View className="mx-6 flex flex-row">
            <TouchableOpacity
              onPress={handleChoicePress("multiple_choice")}
              className="m-1 flex basis-1/2 flex-col items-center justify-center rounded-2xl border border-zinc-100 bg-neutral-50 p-4"
            >
              <View className="h-10 w-10 items-center justify-center px-[7px] py-1">
                <TestIcon />
              </View>
              <Text className="text-center text-base font-bold leading-[28.80px] text-neutral-800">
                Multiple Choice
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleChoicePress("true_or_false")}
              className="m-1 flex basis-1/2 flex-col items-center justify-center rounded-2xl border border-zinc-100 bg-neutral-50 p-4"
            >
              <View className="h-10 w-10 items-center justify-center px-[7px] py-1">
                <TFIcon />
              </View>
              <Text className="text-center text-base font-bold leading-[28.80px] text-neutral-800">
                True or False
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mx-6 flex flex-row">
            <TouchableOpacity
              onPress={handleChoicePress("multi_select")}
              className="m-1 flex basis-1/2 flex-col items-center justify-center rounded-2xl border border-zinc-100 bg-neutral-50 p-4"
            >
              <View className="h-10 w-10 items-center justify-center px-[7px] py-1">
                <CheckboxIcon />
              </View>
              <Text className="text-center text-base font-bold leading-[28.80px] text-neutral-800">
                Multi Select
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleChoicePress("identification")}
              className="m-1 flex basis-1/2 flex-col items-center justify-center rounded-2xl border border-zinc-100 bg-neutral-50 p-4"
            >
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

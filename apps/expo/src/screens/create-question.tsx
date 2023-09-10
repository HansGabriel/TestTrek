/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useMemo, useCallback } from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Switch,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { BlurView } from "expo-blur";
import useGoBack from "../hooks/useGoBack";
import CheckboxIcon from "../icons/CheckboxIcon";

import type { FC } from "react";

interface Choice {
  id: number;
  text: string | undefined;
  isCorrect: boolean;
  styles: string;
}

type ChoiceStyle = {
  styles: string;
};

const choiceStyles: ChoiceStyle[] = [
  {
    styles: "border-blue-700 bg-blue-500",
  },
  {
    styles: "border-rose-500 bg-rose-600",
  },
  {
    styles: "border-orange-500 bg-amber-500",
  },
  {
    styles: "border-emerald-600 bg-emerald-500",
  },
];

export const CreateQuestionScreen: FC = () => {
  const goBack = useGoBack();

  const [isTextInputFocused, setIsTextInputFocused] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(0);
  const [choices, setChoices] = useState<Choice[]>(
    Array.from({ length: 4 }, (_, idx) => ({
      id: idx,
      text: undefined,
      isCorrect: false,
      styles: choiceStyles[idx]!.styles,
    })),
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Quiz", value: "quiz" },
    { label: "True or False", value: "true-or-false" },
  ]);

  const handleTextInputFocus = () => {
    setIsTextInputFocused(true);
  };

  const handleOpenModal = (index: number) => () => {
    setSelectedQuestionId(index);
    setShowModal(true);
  };

  const handleChoiceChange = (index: number, text: string) => {
    setChoices((prev) =>
      prev.map((choice) =>
        choice.id === index ? { ...choice, text: text } : choice,
      ),
    );
  };

  const toggleChoiceCorrect = (index: number) => () => {
    setChoices((prev) =>
      prev.map((choice) =>
        choice.id === index
          ? { ...choice, isCorrect: !choice.isCorrect }
          : choice,
      ),
    );
  };

  const renderChoice = useCallback(
    (choice: Choice) => (
      <TouchableOpacity
        key={choice.id}
        className={`basis-[48%] flex-col items-center justify-center rounded-2xl border-b-2 ${choice.styles} p-5`}
        onPress={handleOpenModal(choice.id)}
      >
        {choice.isCorrect && (
          <View className="absolute right-2 top-2 h-5 w-5">
            <CheckboxIcon />
          </View>
        )}
        <Text className="my-5 self-stretch text-center text-lg font-bold leading-[28.80px] text-white">
          {choice.text ? choice.text : "Add answer"}
        </Text>
      </TouchableOpacity>
    ),
    [],
  );

  const selectedChoice = useMemo(
    () => choices[selectedQuestionId],
    [choices, selectedQuestionId],
  );

  const hasOneCorrectAnswer = useMemo(
    () => choices.filter((choice) => choice.isCorrect).length >= 1,
    [choices],
  );

  return (
    <View className="mx-6 mt-12 flex-1">
      <View className="flex flex-row items-center justify-between pb-5">
        <View className="flex flex-row items-center gap-2">
          <TouchableOpacity onPress={goBack}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
          <Text className="font-nunito-bold text-2xl">Create Question</Text>
        </View>
      </View>

      <ScrollView className="mt-5 pb-20" showsVerticalScrollIndicator={false}>
        <View className="mt-8 mb-4 flex flex-col">
          <TouchableOpacity className="mx-auto mb-6 h-56 w-full items-center justify-center rounded-3xl border-2 border-violet-600 bg-neutral-50">
            <FontAwesome name="image" size={48} color="rgba(105, 73, 255, 1)" />
            <Text className="font-nunito-bold mt-4 text-violet-600">
              Add Cover Image
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row gap-2">
            <TouchableOpacity className="flex items-center justify-center rounded-[100px] bg-violet-600 px-5 py-2">
              <Text className="text-center text-base font-semibold leading-snug tracking-tight text-white">
                10 sec
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex items-center justify-center rounded-[100px] bg-violet-600 px-5 py-2">
              <Text className="text-center text-base font-semibold leading-snug tracking-tight text-white">
                100 pt
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <DropDownPicker
              style={{
                borderColor: "#6949FF",
                width: 120,
                borderRadius: open ? 30 : 100,
                borderWidth: 2,
              }}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Quiz"
              placeholderStyle={{
                color: "#6949FF",
                fontWeight: "bold",
              }}
              selectedItemLabelStyle={{
                color: "#6949FF",
                fontWeight: "bold",
              }}
              textStyle={{
                color: "#6949FF",
              }}
              dropDownContainerStyle={{
                borderColor: "#6949FF",
                borderRadius: 20,
                borderTopWidth: 1,
                borderWidth: 2,
              }}
              TickIconComponent={() => (
                <Feather name="check" size={24} color="#00B777" />
              )}
              ArrowDownIconComponent={() => (
                <Feather name="chevron-down" size={24} color="#6949FF" />
              )}
              ArrowUpIconComponent={() => (
                <Feather name="chevron-up" size={24} color="#6949FF" />
              )}
            />
          </View>
        </View>

        <View
          className={`-z-10 mt-5 items-center justify-center rounded-2xl border border-zinc-100 bg-neutral-50 px-5 py-8
          ${
            isTextInputFocused
              ? "border-2 border-violet-600 bg-white"
              : "shadow-none"
          }
        `}
        >
          <TextInput
            className="self-stretch text-center text-xl font-bold leading-loose text-black"
            onChangeText={setQuestionTitle}
            value={questionTitle}
            placeholder="Tap to add question"
            placeholderTextColor={"#757575"}
            onFocus={handleTextInputFocus}
          />
        </View>

        <View className="mt-5 flex flex-row items-center justify-between">
          {renderChoice(choices[0]!)}
          {renderChoice(choices[1]!)}
        </View>

        <View className="mt-5 flex flex-row items-center justify-between">
          {renderChoice(choices[2]!)}
          {renderChoice(choices[3]!)}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            setShowModal(!showModal);
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setShowModal(!showModal);
            }}
          >
            <BlurView intensity={10} className="absolute inset-0">
              <View className="flex-1 items-center justify-center bg-opacity-50 shadow-lg">
                <View className="h-1/2 w-11/12 rounded-2xl bg-white">
                  <Text className="mt-10 text-center text-2xl font-bold">
                    Add Answer
                  </Text>
                  <TextInput
                    className={`mx-5 mt-5 basis-[48%] flex-col items-center justify-center rounded-2xl border-b-2 ${selectedChoice?.styles} p-5 text-center text-lg font-bold leading-[28.80px] text-white`}
                    selectionColor="white"
                    value={selectedChoice?.text}
                    onChangeText={(modalText) =>
                      handleChoiceChange(selectedQuestionId, modalText)
                    }
                  ></TextInput>
                  <View className="flex flex-row items-center justify-center px-5 py-8">
                    <Text className="shrink grow basis-0 text-lg font-bold leading-[28.80px] text-neutral-800">
                      Correct Answer
                    </Text>
                    <Switch
                      value={selectedChoice?.isCorrect}
                      onValueChange={toggleChoiceCorrect(selectedQuestionId)}
                      trackColor={{ true: "#6949FF" }}
                      disabled={
                        hasOneCorrectAnswer && !selectedChoice?.isCorrect
                      }
                    />
                  </View>
                </View>
              </View>
            </BlurView>
          </TouchableWithoutFeedback>
        </Modal>

        <View className="mt-10 flex flex-row items-center justify-between border-t border-neutral-100 bg-white px-6 pt-6 pb-9">
          <TouchableOpacity className="relative h-[58px] w-24">
            <View className="absolute left-0 top-0 h-[58px] w-24 rounded-lg border border-violet-600 bg-neutral-100"></View>
            <View className="absolute left-0 top-0 inline-flex h-5 w-5 flex-col items-center justify-center rounded-br-lg border border-violet-600 bg-violet-600 p-1">
              <Text className="text-center text-[10px] font-bold text-white">
                1
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="inline-flex flex-col items-center justify-center rounded-2xl border-b-2 border-indigo-700 bg-violet-600 p-[17px] shadow">
            <Feather name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

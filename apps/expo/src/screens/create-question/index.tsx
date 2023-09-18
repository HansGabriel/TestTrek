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
  Image,
} from "react-native";
import useGoBack from "../../hooks/useGoBack";
import CheckboxIcon from "../../icons/CheckboxIcon";
import TestImagePicker from "../../components/ImagePicker";
import OptionModal from "../../components/modals/OptionModal";
import { TIME_LIMIT_OPTIONS, POINT_OPTIONS } from "./constants";
import useQuestionStore from "../../stores/useQuestionStore";
import OptionDropdown from "./options-dropdown";
import useImageStore from "../../stores/useImageStore";
import { alertExit } from "../../hooks/useAlert";

import type { FC } from "react";
import type { Choice, Option, ChoiceStyle } from "./types";
import type { PartialQuestion } from "../../stores/useQuestionStore";

type MultipleChoiceQuestion = Extract<
  PartialQuestion,
  { type: "multiple_choice" }
>;

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

  const { questions, selectedIndex, getSelectedQuestion, editQuestion } =
    useQuestionStore();

  const image = useImageStore((state) => state.image);
  const setImage = useImageStore((state) => state.setImage);

  const question = getSelectedQuestion();

  const [timeLimitOptions, setTimeLimitOptions] =
    useState<Option[]>(TIME_LIMIT_OPTIONS);
  const [pointOptions, setPointOptions] = useState<Option[]>(POINT_OPTIONS);
  const [isTextInputFocused, setIsTextInputFocused] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showTimeLimitModal, setShowTimeLimitModal] = useState<boolean>(false);
  const [showPointModal, setShowPointModal] = useState<boolean>(false);
  const [questionTitle, setQuestionTitle] = useState<string>(
    question?.title ?? "",
  );
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(0);
  const [choices, setChoices] = useState<Choice[]>(
    question!.type === "multiple_choice"
      ? question!.choices.map((choice, idx) => ({
          id: idx,
          text: choice.text ?? "",
          isCorrect: choice.isCorrect,
          styles: choiceStyles[idx]!.styles,
        }))
      : Array.from({ length: 2 }, (_, idx) => ({
          id: idx,
          text: undefined,
          isCorrect: false,
          styles: choiceStyles[idx]!.styles,
        })),
  );

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

  const handleSaveQuestion = () => {
    const multipleChoiceQuestion: MultipleChoiceQuestion = {
      title: questionTitle,
      choices: choices.map((choice, idx) => ({
        id: idx.toString(),
        text: choice.text ?? "",
        isCorrect: choice.isCorrect,
      })),
      image: image,
      inEdit: false,
      type: "multiple_choice",
      points: pointOptions.find((option) => option.isSelected)?.value ?? 0,
      time: timeLimitOptions.find((option) => option.isSelected)?.value ?? 0,
    };
    editQuestion(selectedIndex!, multipleChoiceQuestion);
    goBack();
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

  const handleClickQuestion = (index: number) => () => {
    setSelectedQuestionId(index);
    const selectedQuestion = questions[index];

    if (selectedQuestion?.type === "multiple_choice") {
      setQuestionTitle(selectedQuestion.title);
      setChoices(
        selectedQuestion.choices.map((choice, idx) => ({
          id: idx,
          text: choice.text ?? "",
          isCorrect: choice.isCorrect,
          styles: choiceStyles[idx]!.styles,
        })),
      );
      setImage(selectedQuestion?.image ?? undefined);
      setTimeLimitOptions((prev) =>
        prev.map((option) => ({
          ...option,
          isSelected: option.value === selectedQuestion.time,
        })),
      );
      setPointOptions((prev) =>
        prev.map((option) => ({
          ...option,
          isSelected: option.value === selectedQuestion.points,
        })),
      );
    }
  };

  const handleGoBack = () => {
    alertExit({ handleExit: goBack });
  };

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
      <View className="z-50 flex flex-row items-center justify-between pb-5">
        <View className="flex flex-row items-center gap-2">
          <TouchableOpacity onPress={handleGoBack}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
          <Text className="font-nunito-bold text-2xl">Create Question</Text>
        </View>
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
        <OptionDropdown onSave={handleSaveQuestion} onDelete={() => {}} />
      </View>

      <ScrollView className="mt-5 pb-20" showsVerticalScrollIndicator={false}>
        <View className="mt-8 mb-4 flex flex-col">
          <TestImagePicker image={image} />
        </View>

        <View className="flex flex-row items-center justify-between">
          <TouchableOpacity
            className="flex items-center justify-center rounded-[100px] bg-violet-600 px-4 py-2"
            onPress={() => setShowTimeLimitModal(true)}
          >
            <Text className="text-center font-semibold leading-snug tracking-tight text-white">
              {timeLimitOptions.find((option) => option.isSelected)?.title ??
                "Time Limit"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex items-center justify-center rounded-[100px] bg-violet-600 px-4 py-2"
            onPress={() => setShowPointModal(true)}
          >
            <Text className="text-center font-semibold leading-snug tracking-tight text-white">
              {pointOptions.find((option) => option.isSelected)?.title ??
                "Points"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center justify-center rounded-full border-2 border-violet-600 bg-white px-4 py-2"
            onPress={() => {
              // Handle button press logic here if needed
            }}
          >
            <Text className="font-bold text-violet-600">Generate with AI</Text>
          </TouchableOpacity>
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
            <View className="absolute inset-0 flex-1 bg-black/70">
              <View className="flex-1 items-center justify-center bg-opacity-50 shadow shadow-black/80">
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
                    placeholder="Add answer"
                    placeholderTextColor="#FFFFFF"
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
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <OptionModal
          title="Time Limit"
          options={timeLimitOptions}
          setOptions={setTimeLimitOptions}
          isVisible={showTimeLimitModal}
          setIsVisible={setShowTimeLimitModal}
        />

        <OptionModal
          title="Points"
          options={pointOptions}
          setOptions={setPointOptions}
          isVisible={showPointModal}
          setIsVisible={setShowPointModal}
        />

        <View className="mt-10 flex flex-row items-center justify-between border-t border-neutral-100 bg-white px-6 pt-6 pb-9">
          <ScrollView
            horizontal
            className="flex flex-row gap-x-2"
            showsHorizontalScrollIndicator={false}
          >
            {questions.map((question, idx) => (
              <TouchableOpacity
                className="relative h-[58px] w-24"
                key={idx}
                onPress={handleClickQuestion(idx)}
              >
                {question.image ? (
                  <Image
                    source={{ uri: question.image }}
                    className="absolute left-0 top-0 h-[58px] w-24 rounded-lg border border-violet-600"
                  />
                ) : (
                  <View className="absolute left-0 top-0 h-[58px] w-24 rounded-lg border border-violet-600 bg-neutral-100"></View>
                )}
                <View className="absolute left-0 top-0 inline-flex h-5 w-5 flex-col items-center justify-center rounded-br-lg border border-violet-600 bg-violet-600 p-1">
                  <Text className="text-center text-[10px] font-bold text-white">
                    {idx + 1}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity className="inline-flex flex-col items-center justify-center rounded-2xl border-b-2 border-indigo-700 bg-violet-600 p-[17px] shadow">
            <Feather name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

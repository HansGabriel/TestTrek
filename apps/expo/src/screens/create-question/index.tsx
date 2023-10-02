/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useMemo, useCallback, useRef } from "react";
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
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import useGoBack from "../../hooks/useGoBack";
import CheckboxIcon from "../../icons/CheckboxIcon";
import TestImagePicker from "../../components/ImagePicker";
import OptionModal from "../../components/modals/OptionModal";
import { TIME_LIMIT_OPTIONS, POINT_OPTIONS } from "./constants";
import QuestionOptionsDropdown from "./question-options-dropdown";
import useImageStore from "../../stores/useImageStore";
import BottomSheet from "@gorhom/bottom-sheet";
import ChoiceBottomSheet from "../../components/bottom-sheet/ChoiceBottomSheet";
import useQuestionStore from "../../stores/useQuestionStore";
import { useNavigation } from "@react-navigation/native";
import { alertExit } from "../../hooks/useAlert";
import { trpc } from "../../utils/trpc";
import { match } from "ts-pattern";
import useError from "./hooks";
import useToast from "../../hooks/useToast";
import useToggleImageStore from "../../stores/useToggleImageStore";

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
  const navigation = useNavigation();
  const { showToast } = useToast();
  const isImageVisible = useToggleImageStore((state) => state.isVisible);

  const { questions, selectedIndex, getSelectedQuestion, editQuestion } =
    useQuestionStore();
  const { errorState, checkErrors, resetErrors } = useError();

  const questionImage = useImageStore((state) => state.questionImage);
  const setImage = useImageStore((state) => state.setImage);
  const setQuestionImage = useImageStore((state) => state.setQuestionImage);
  const resetQuestionImage = useImageStore((state) => state.resetQuestionImage);
  const deleteQuestion = useQuestionStore((state) => state.deleteQuestion);
  const isLastQuestionInEdit = useQuestionStore(
    (state) => state.isLastQuestionInEdit,
  );
  const addEmptyQuestion = useQuestionStore((state) => state.addEmptyQuestion);
  const setLastIndex = useQuestionStore((state) => state.setLastIndex);

  const question = getSelectedQuestion();

  const getSelectedChoices = () => {
    if (!question) {
      return [];
    }
    if (question.type === "multiple_choice") {
      return question.choices.map((choice, idx) => ({
        id: idx,
        text: choice.text ?? "",
        isCorrect: choice.isCorrect,
        styles: choiceStyles[idx]!.styles,
      }));
    }
    return Array.from({ length: 2 }, (_, idx) => ({
      id: idx,
      text: undefined,
      isCorrect: false,
      styles: choiceStyles[idx]!.styles,
    }));
  };

  const resetSelectedChoices = () => {
    if (!question) {
      return [];
    }

    if (question.type === "multiple_choice") {
      return question.choices.map((choice, idx) => ({
        id: idx,
        text: undefined,
        isCorrect: false,
        styles: choiceStyles[idx]!.styles,
      }));
    }

    return Array.from({ length: 2 }, (_, idx) => ({
      id: idx,
      text: undefined,
      isCorrect: false,
      styles: choiceStyles[idx]!.styles,
    }));
  };

  const [timeLimitOptions, setTimeLimitOptions] = useState<Option[]>(
    TIME_LIMIT_OPTIONS.map((option) => ({
      ...option,
      isSelected: option.value === question?.time,
    })),
  );
  const [pointOptions, setPointOptions] = useState<Option[]>(
    POINT_OPTIONS.map((option) => ({
      ...option,
      isSelected: option.value === question?.points,
    })),
  );
  const [isTextInputFocused, setIsTextInputFocused] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showQuestionModal, setShowQuestionModal] = useState<boolean>(false);
  const [showTimeLimitModal, setShowTimeLimitModal] = useState<boolean>(false);
  const [showPointModal, setShowPointModal] = useState<boolean>(false);
  const [questionTitle, setQuestionTitle] = useState<string>(
    question?.title ?? "",
  );
  const [aiQuestion, setAiQuestion] = useState<string>("");
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(0);
  const [choices, setChoices] = useState<Choice[]>(getSelectedChoices());

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["5%", "25%", "60%"], []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const goToCreateQuestion = () => {
    if (isLastQuestionInEdit()) {
      setLastIndex();
      setTimeLimitOptions(TIME_LIMIT_OPTIONS);
      setPointOptions(POINT_OPTIONS);
      setQuestionTitle("");
      setChoices(resetSelectedChoices());
      setImage(undefined);
      navigation.navigate("CreateQuestion");
    } else {
      addEmptyQuestion("multiple_choice");
      setLastIndex();
      navigation.navigate("CreateQuestion");
    }
  };

  const { mutate: generateQuestion, isLoading: isGenerating } =
    trpc.gptApi.generateQuestion.useMutation({
      onSuccess: (data) => {
        match(data)
          .with(
            {
              type: "multipleChoice",
            },
            (data) => {
              setQuestionTitle(data.question);
              setChoices(
                data.choices.map((choice, idx) => ({
                  id: idx,
                  text: choice.text ?? "",
                  isCorrect: choice.isCorrect,
                  styles: choiceStyles[idx]!.styles,
                })),
              );
            },
          )
          .run();

        setAiQuestion("");
        setShowQuestionModal(false);
      },
    });

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetRef.current?.forceClose();
    }
  }, []);

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

  const getSelectedImage = () => {
    if (question?.image && !questionImage) {
      return question.image;
    }
    if (questionImage && !question?.image) {
      return questionImage;
    }
    if (question?.image && questionImage) {
      return questionImage;
    }
    return undefined;
  };

  const selectedImage = getSelectedImage();

  const handleSaveQuestion = () => {
    resetErrors();
    const errors = checkErrors({
      answers: choices,
      choices: choices.map((choice) => choice.text),
      points: pointOptions,
      timeLimits: timeLimitOptions,
      title: questionTitle,
    });
    if (errors) {
      return;
    }
    const multipleChoiceQuestion: MultipleChoiceQuestion = {
      title: questionTitle,
      choices: choices.map((choice, idx) => ({
        id: idx.toString(),
        text: choice.text ?? "",
        isCorrect: choice.isCorrect,
      })),
      image: selectedImage,
      inEdit: false,
      type: "multiple_choice",
      points: pointOptions.find((option) => option.isSelected)?.value ?? 0,
      time: timeLimitOptions.find((option) => option.isSelected)?.value ?? 0,
    };
    resetErrors();
    editQuestion(selectedIndex!, multipleChoiceQuestion);
    resetQuestionImage();
    showToast("Question saved!");
  };

  const renderChoice = (choice: Choice) => (
    <TouchableOpacity
      key={choice.id}
      className={`basis-[48%] flex-col items-center justify-center rounded-2xl border-b-2 ${
        choice.styles
      } ${
        errorState.choicesError[choice.id]?.length !== undefined
          ? "border-2 border-red-500"
          : ""
      } p-5`}
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
  );

  const handleClickQuestion = (index: number) => () => {
    setSelectedQuestionId(index);
    setQuestionImage(questions[index]?.image ?? undefined);
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
      setImage(selectedImage),
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
    resetQuestionImage();
    if (question?.inEdit) {
      alertExit({ handleExit: goBack });
    } else {
      goBack();
    }
  };

  const handleDelete = () => {
    deleteQuestion(selectedIndex!);
    goBack();
  };

  const handleGenerateQuestion = () => {
    generateQuestion({
      message: aiQuestion,
      questionType: "multipleChoice",
    });
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
        <QuestionOptionsDropdown
          onSave={() => {
            handleSaveQuestion();
            goBack();
          }}
          onDelete={handleDelete}
        />
      </View>

      <ScrollView className="mt-5 pb-20" showsVerticalScrollIndicator={false}>
        {isImageVisible && (
          <View className="mb-4 mt-8 flex flex-col">
            <TestImagePicker image={selectedImage} type="question" />
          </View>
        )}
        <View className="flex flex-row items-center justify-between">
          <TouchableOpacity
            className={`flex items-center justify-center rounded-[100px] bg-violet-600 px-4 py-2 ${
              errorState.timeLimitError !== null
                ? "border-2 border-red-500"
                : ""
            }`}
            onPress={() => setShowTimeLimitModal(true)}
          >
            <Text className="text-center font-semibold leading-snug tracking-tight text-white">
              {timeLimitOptions.find((option) => option.isSelected)?.title ??
                "Time Limit"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex items-center justify-center rounded-[100px] bg-violet-600 px-4 py-2 ${
              errorState.pointsError !== null ? "border-2 border-red-500" : ""
            }`}
            onPress={() => setShowPointModal(true)}
          >
            <Text className="text-center font-semibold leading-snug tracking-tight text-white">
              {pointOptions.find((option) => option.isSelected)?.title ??
                "Points"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center justify-center rounded-full border-2 border-violet-600 bg-white px-4 py-2"
            onPress={() => setShowQuestionModal(true)}
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
          ${errorState.titleError !== null ? "border-2 border-red-500" : ""}
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

        <TouchableOpacity
          className="mt-10 w-full items-center justify-center rounded-[100px] border-b-2 border-violet-700 bg-violet-600 py-[18px]"
          onPress={handleSaveQuestion}
        >
          <Text className="text-center text-base font-bold text-white">
            Save
          </Text>
        </TouchableOpacity>

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
            <View className="absolute inset-0 h-[100%] w-[100%] flex-1 bg-black/70">
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

        {/* Modals */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={showQuestionModal}
          onRequestClose={() => {
            setShowQuestionModal(!showQuestionModal);
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setShowQuestionModal(!showQuestionModal);
            }}
          >
            <View className="absolute inset-0 h-[100%] w-[100%] flex-1 bg-black/70">
              <View className="flex-1 items-center justify-center bg-opacity-50 shadow shadow-black/80">
                <View className="h-1/2 w-11/12 rounded-2xl bg-white">
                  <View className="mt-auto flex flex-row items-center justify-center px-5 py-8">
                    <TextInput
                      className="border-primary-1 bg-greyscale-50 h-10 flex-1 rounded-full border py-2 pl-5 pr-10"
                      placeholder="Ask AI a question"
                      placeholderTextColor="#757575"
                      onChangeText={(text) => setAiQuestion(text)}
                      value={aiQuestion}
                    />
                    <TouchableOpacity
                      className="absolute right-8"
                      onPress={handleGenerateQuestion}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <ActivityIndicator size="small" />
                      ) : (
                        <Feather name="send" size={24} color="#6949FF" />
                      )}
                    </TouchableOpacity>
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

        <View className="mt-10 flex flex-row items-center justify-between border-t border-neutral-100 bg-white px-6 pb-9 pt-6">
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
          <TouchableOpacity
            className="ml-5 inline-flex flex-col items-center justify-center rounded-2xl border-b-2 border-indigo-700 bg-violet-600 p-[17px] shadow"
            onPress={openBottomSheet}
          >
            <Feather name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={styles.bottomSheetContainer}
      >
        <ChoiceBottomSheet goToCreateQuestion={goToCreateQuestion} />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

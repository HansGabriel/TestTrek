/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
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
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import useGoBack from "../../hooks/useGoBack";
import TestImagePicker from "../../components/ImagePicker";
import OptionModal from "../../components/modals/OptionModal";
import { TIME_LIMIT_OPTIONS, POINT_OPTIONS } from "./constants";
import QuestionOptionsDropdown from "./question-options-dropdown";
import useImageStore from "../../stores/useImageStore";
import BottomSheet from "@gorhom/bottom-sheet";
import ChoiceBottomSheet from "../../components/bottom-sheet/ChoiceBottomSheet";
import useQuestionStore from "../../stores/useQuestionStore";
import { useNavigation } from "@react-navigation/native";
import { trpc } from "../../utils/trpc";
import { match } from "ts-pattern";
import useError from "./hooks";
import useToggleImageStore from "../../stores/useToggleImageStore";
import { choiceStyles } from "./constants";

import type { FC } from "react";
import type { Choice, Option } from "./types";
import type {
  PartialQuestion,
  QuestionType,
} from "../../stores/useQuestionStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReusableHeader } from "../../components/headers/ReusableHeader";
import {
  errorToast,
  successToast,
} from "../../components/notifications/ToastNotifications";
import { AskAiModal } from "../../components/modals/AskAiModal";
import { AlertModal } from "../../components/modals/AlertModal";
import { mapQuestionType } from "../../utils/helpers/strings";
import {
  MultipleChoiceCard,
  TrueOrFalseCards,
  MultiSelectCards,
  IdentificationCards,
} from "./ChoiceCard";

type MultipleChoiceQuestion = Extract<
  PartialQuestion,
  { type: "multiple_choice" }
>;

type TrueOrFalseQuestion = Extract<PartialQuestion, { type: "true_or_false" }>;
type IdentificationQuestion = Extract<
  PartialQuestion,
  { type: "identification" }
>;
type MultiSelectQuestion = Extract<PartialQuestion, { type: "multi_select" }>;

type ArrayQuestions =
  | MultipleChoiceQuestion
  | TrueOrFalseQuestion
  | MultiSelectQuestion;
type GeneralQuestion = ArrayQuestions | IdentificationQuestion;

export const CreateQuestionScreen: FC = () => {
  const goBack = useGoBack();
  const navigation = useNavigation();
  const isImageVisible = useToggleImageStore((state) => state.isVisible);

  const {
    questions,
    selectedIndex,
    setSelectedIndex,
    getSelectedQuestion,
    editQuestion,
  } = useQuestionStore();
  const { errorState, checkErrors, resetErrors, checkAnswerError } = useError();

  const questionImage = useImageStore((state) => state.questionImage);
  const setQuestionImage = useImageStore((state) => state.setQuestionImage);
  const resetQuestionImage = useImageStore((state) => state.resetQuestionImage);
  const deleteQuestion = useQuestionStore((state) => state.deleteQuestion);
  const deleteLastQuestion = useQuestionStore(
    (state) => state.deleteLastQuestion,
  );
  const isLastQuestionInEdit = useQuestionStore(
    (state) => state.isLastQuestionInEdit,
  );
  const addEmptyQuestion = useQuestionStore((state) => state.addEmptyQuestion);
  const setLastIndex = useQuestionStore((state) => state.setLastIndex);

  const question = getSelectedQuestion();
  const questionType = question?.type;
  const [openAlert, setOpenAlert] = useState(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isTextInputFocused, setIsTextInputFocused] = useState<boolean>(false);
  const [errorInAIQuestion, setErrorInAIQuestion] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showQuestionModal, setShowQuestionModal] = useState<boolean>(false);
  const [showTimeLimitModal, setShowTimeLimitModal] = useState<boolean>(false);
  const [showPointModal, setShowPointModal] = useState<boolean>(false);
  const [questionTitle, setQuestionTitle] = useState<string>(
    question?.title ?? "",
  );
  const [aiQuestion, setAiQuestion] = useState<string>("");
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(0);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChoiceModalTouched, setIsChoiceModalTouched] = useState(false);
  const [promptSaveModal, setPromptSaveModal] = useState(false);

  const { height, width } = Dimensions.get("window");

  const bottomSheetRef = useRef<BottomSheet>(null);

  const getSelectedChoices = () => {
    if (!question) {
      return [];
    }
    if (
      question.type === "multiple_choice" ||
      question.type === "true_or_false" ||
      question.type === "multi_select" ||
      question.type === "identification"
    ) {
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

    if (
      question.type === "multiple_choice" ||
      question.type === "true_or_false" ||
      question.type === "multi_select" ||
      question.type === "identification"
    ) {
      return question.choices.map((choice, idx) => ({
        id: idx,
        text: undefined,
        isCorrect: question.type === "identification" ? true : false,
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

  const snapPoints = useMemo(() => ["5%", "25%", "70%"], []);

  const openBottomSheet = () => {
    const isValidInput = handleSaveQuestion({
      showToasts: false,
    });

    if (typeof isValidInput !== "boolean" || !isValidInput) {
      errorToast({
        title: "Missing field",
        message: "Please fill out all required fields",
      });
      return;
    }

    bottomSheetRef.current?.expand();
  };

  const goToCreateQuestion = (selectedQuestionType: QuestionType) => {
    resetErrors();
    setIsChoiceModalTouched(false);
    if (isLastQuestionInEdit()) {
      deleteLastQuestion();
      addEmptyQuestion(selectedQuestionType);
      setLastIndex();
      setTimeLimitOptions(TIME_LIMIT_OPTIONS);
      setPointOptions(POINT_OPTIONS);
      setQuestionTitle("");
      setChoices(resetSelectedChoices());
      setQuestionImage(undefined);
      navigation.navigate("CreateQuestion");
    } else {
      addEmptyQuestion(selectedQuestionType);
      setLastIndex();
      setTimeLimitOptions(TIME_LIMIT_OPTIONS);
      setPointOptions(POINT_OPTIONS);
      setQuestionTitle("");
      setChoices(resetSelectedChoices());
      setQuestionImage(undefined);
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
              setTimeLimitOptions((prev) =>
                prev.map((option) => ({
                  ...option,
                  isSelected: option.value === data.timeLimit,
                })),
              );
              setPointOptions((prev) =>
                prev.map((option) => ({
                  ...option,
                  isSelected: option.value === data.points,
                })),
              );
            },
          )
          .with(
            {
              type: "trueOrFalse",
            },
            (data) => {
              setQuestionTitle(data.question);
              setChoices([
                {
                  id: 0,
                  text: "True",
                  isCorrect: data.choices[0]!.isCorrect,
                  styles: choiceStyles[0]!.styles,
                },
                {
                  id: 1,
                  text: "False",
                  isCorrect: data.choices[1]!.isCorrect,
                  styles: choiceStyles[1]!.styles,
                },
              ]);
              setTimeLimitOptions((prev) =>
                prev.map((option) => ({
                  ...option,
                  isSelected: option.value === data.timeLimit,
                })),
              );
              setPointOptions((prev) =>
                prev.map((option) => ({
                  ...option,
                  isSelected: option.value === data.points,
                })),
              );
            },
          )
          .with(
            {
              type: "multiselect",
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
              setTimeLimitOptions((prev) =>
                prev.map((option) => ({
                  ...option,
                  isSelected: option.value === data.timeLimit,
                })),
              );
              setPointOptions((prev) =>
                prev.map((option) => ({
                  ...option,
                  isSelected: option.value === data.points,
                })),
              );
            },
          )
          .with(
            {
              type: "identification",
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
              setTimeLimitOptions((prev) =>
                prev.map((option) => ({
                  ...option,
                  isSelected: option.value === data.timeLimit,
                })),
              );
              setPointOptions((prev) =>
                prev.map((option) => ({
                  ...option,
                  isSelected: option.value === data.points,
                })),
              );
            },
          )
          .exhaustive();

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
    setIsChoiceModalTouched(true);
    setShowModal(true);
  };

  const handleCloseQuestionModal = () => {
    setShowQuestionModal(false);
  };

  const handleChoiceChange = (index: number, text: string) => {
    setChoices((prev) =>
      prev.map((choice) =>
        choice.id === index ? { ...choice, text: text } : choice,
      ),
    );
  };

  const toggleChoiceCorrect = (index: number, isMultiple = false) => {
    setChoices((prev) =>
      prev.map((choice) => {
        if (choice.id === index) {
          return { ...choice, isCorrect: !choice.isCorrect };
        }
        if (!isMultiple && choice.isCorrect) {
          return { ...choice, isCorrect: false };
        }
        return choice;
      }),
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

  const handleSaveQuestion = ({
    showToasts = true,
  }: {
    showToasts?: boolean;
  } = {}) => {
    if (!questionType) return false;
    resetErrors();
    const errors = checkErrors({
      answers: choices,
      choices: choices.map((choice) => choice.text),
      points: pointOptions,
      timeLimits: timeLimitOptions,
      title: questionTitle,
      isMultiSelect:
        questionType === "multi_select" || questionType === "identification",
    });
    if (errors) {
      return errorState;
    }
    let question: GeneralQuestion | undefined = undefined;
    if (
      questionType === "multi_select" ||
      questionType === "multiple_choice" ||
      questionType === "true_or_false" ||
      questionType === "identification"
    ) {
      question = {
        title: questionTitle,
        choices: choices.map((choice, idx) => ({
          id: idx.toString(),
          text: choice.text ?? "",
          isCorrect: choice.isCorrect,
        })),
        image: selectedImage,
        inEdit: false,
        type: questionType,
        points: pointOptions.find((option) => option.isSelected)?.value ?? 0,
        time: timeLimitOptions.find((option) => option.isSelected)?.value ?? 0,
      };
    }
    if (questionType === "identification") {
      question = {
        title: questionTitle,
        choices: choices.map((choice, idx) => ({
          id: idx.toString(),
          text: choice.text ?? "",
          isCorrect: choice.isCorrect,
        })),
        image: selectedImage,
        inEdit: false,
        type: questionType,
        points: pointOptions.find((option) => option.isSelected)?.value ?? 0,
        time: timeLimitOptions.find((option) => option.isSelected)?.value ?? 0,
      };
    }
    if (!question) return false;

    editQuestion(selectedIndex!, question);
    resetQuestionImage();
    resetErrors();
    if (showToasts) {
      successToast({
        title: "Success",
        message: "Question saved successfully",
      });
    }
    return true;
  };

  useEffect(() => {
    if (errorState) {
      if (errorState.titleError !== null) {
        errorToast({
          title: "Missing field",
          message: "Title cannot be empty",
        });
      } else if (
        isChoiceModalTouched &&
        !errorState.choicesError.every((item) => item === undefined)
      ) {
        errorToast({
          title: "Missing field",
          message: "Choices cannot be empty",
        });
      } else if (errorState.timeLimitError !== null) {
        errorToast({
          title: "Missing field",
          message: "Time limit cannot be empty",
        });
      } else if (errorState.pointsError !== null) {
        errorToast({
          title: "Missing field",
          message: "Points cannot be empty",
        });
      } else if (
        errorState.answerError !== null &&
        questionType !== "multi_select"
      ) {
        errorToast({
          title: "Missing field",
          message: "Please assign a correct answer",
        });
      }
    }
  }, [errorState]);

  useEffect(() => {
    const selectedChoices = getSelectedChoices();
    setChoices(selectedChoices);
  }, [question]);

  const renderChoice = (choice: Choice) => {
    const props = {
      choice,
      choices,
      errorState,
      getSelectedChoices,
      goBack,
      handleOpenModal,
      isSaved,
      pointOptions,
      question,
      questionTitle,
      resetQuestionImage,
      setIsSaved,
      setOpenAlert,
      timeLimitOptions,
    };
    return <MultipleChoiceCard {...props} />;
  };

  const handleClickQuestion = (index: number) => () => {
    if (index === selectedIndex) {
      return;
    }

    const isValidInput = handleSaveQuestion({
      showToasts: false,
    });

    if (typeof isValidInput !== "boolean" || !isValidInput) {
      errorToast({
        title: "Missing field",
        message: "Please fill out all required fields",
      });
      return;
    }

    resetErrors();
    setSelectedIndex(index);
    setSelectedQuestionId(index);
    setQuestionImage(questions[index]?.image ?? undefined);
    const selectedQuestion = questions[index];

    if (
      selectedQuestion?.type === "multiple_choice" ||
      selectedQuestion?.type === "true_or_false" ||
      selectedQuestion?.type === "multi_select" ||
      selectedQuestion?.type === "identification"
    ) {
      setQuestionTitle(selectedQuestion.title);
      setChoices(
        selectedQuestion.choices.map((choice, idx) => ({
          id: idx,
          text: choice.text ?? "",
          isCorrect: choice.isCorrect,
          styles: choiceStyles[idx]!.styles,
        })),
      );

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

    setIsSaved(false);
  };

  const handleExitScreen = () => {
    setOpenAlert(true);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    if (questions.length <= 1) {
      errorToast({
        title: "Error",
        message: "Cannot delete first question item",
      });
    } else {
      deleteQuestion(selectedIndex!);
      const index = selectedIndex ? selectedIndex - 1 : 0;
      setSelectedIndex(index);
      setSelectedQuestionId(index);
      setQuestionImage(questions[index]?.image ?? undefined);
      const selectedQuestion = questions[index];

      if (
        selectedQuestion?.type === "multiple_choice" ||
        selectedQuestion?.type === "true_or_false" ||
        selectedQuestion?.type === "multi_select" ||
        selectedQuestion?.type === "identification"
      ) {
        setQuestionTitle(selectedQuestion.title);
        setChoices(
          selectedQuestion.choices.map((choice, idx) => ({
            id: idx,
            text: choice.text ?? "",
            isCorrect: choice.isCorrect,
            styles: choiceStyles[idx]!.styles,
          })),
        );

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
    }

    setIsDeleting(false);
  };

  const handleGenerateQuestion = () => {
    if (aiQuestion.length <= 0 || !questionType) {
      setErrorInAIQuestion(true);
    } else {
      generateQuestion({
        message: aiQuestion,
        questionType: mapQuestionType(questionType),
      });
      setErrorInAIQuestion(false);
    }
  };

  const handleSaveAnswer = (callback?: () => void) => () => {
    const isValidInput = handleSaveQuestion();
    if (typeof isValidInput === "boolean" && isValidInput) {
      callback?.();
    } else {
      const isMultiSelect = questionType === "multi_select";
      const answerError = checkAnswerError(choices, isMultiSelect);
      if (answerError) {
        errorToast({
          title: "No correct answer",
          message: "Please select a correct answer",
        });
      }
    }
  };

  const selectedChoice = useMemo(
    () => choices[selectedQuestionId],
    [choices, selectedQuestionId],
  );

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        height: height,
        width: width,
      }}
    >
      <ReusableHeader
        screenName={"Create Question"}
        optionIcon={
          <QuestionOptionsDropdown
            isSaved={!isSaved}
            handleSaveAnswer={handleSaveAnswer(() => {
              setIsSaved(false);
            })}
          />
        }
        showDeleteIcon={true}
        onDeletePress={handleDelete}
        isDeleting={isDeleting}
        backIcon={<Feather name="x" size={24} color="black" />}
        handleExit={handleExitScreen}
      />
      <View className="w-full flex-1 self-center">
        <ScrollView className="mt-5 pb-20" showsVerticalScrollIndicator={false}>
          {isImageVisible && (
            <View className="my-5 flex w-[90%] flex-col self-center">
              <TestImagePicker image={selectedImage} type="question" />
            </View>
          )}
          <View className="flex w-[90%] flex-row items-center justify-evenly self-center">
            <TouchableOpacity
              className={`flex items-center justify-center rounded-[100px] bg-violet-600 px-4 py-2 ${
                errorState.timeLimitError !== null
                  ? "border-2 border-red-500"
                  : ""
              }`}
              onPress={() => setShowTimeLimitModal(true)}
            >
              <>
                <Text className="text-center font-semibold leading-snug tracking-tight text-white">
                  {timeLimitOptions.find((option) => option.isSelected)
                    ?.title ?? "Time Limit"}
                </Text>
              </>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex items-center justify-center rounded-[100px] bg-violet-600 px-4 py-2 ${
                errorState.pointsError !== null ? "border-2 border-red-500" : ""
              }`}
              onPress={() => setShowPointModal(true)}
            >
              <>
                <Text className="text-center font-semibold leading-snug tracking-tight text-white">
                  {pointOptions.find((option) => option.isSelected)?.title ??
                    "Points"}
                </Text>
              </>
            </TouchableOpacity>

            <TouchableOpacity
              className="items-center justify-center rounded-full border-2 border-violet-600 bg-white px-2 py-2"
              onPress={() => setShowQuestionModal(true)}
            >
              <Text className="font-bold text-violet-600">
                Generate with AI
              </Text>
            </TouchableOpacity>
          </View>

          <View
            className={`-z-10 mt-5 w-[90%] items-center self-center rounded-2xl border border-zinc-100 bg-neutral-50 px-5 py-8
          ${
            isTextInputFocused
              ? "border-2 border-violet-600 bg-white"
              : "shadow-none"
          }
          ${errorState.titleError !== null ? "border-2 border-red-500" : ""}
        `}
          >
            <>
              <TextInput
                className="self-stretch text-center text-xl font-bold leading-loose text-black"
                onChangeText={setQuestionTitle}
                value={questionTitle}
                placeholder="Tap to add question"
                placeholderTextColor={"#757575"}
                onFocus={handleTextInputFocus}
                multiline
                maxLength={150}
              />
            </>
          </View>

          {match(questionType)
            .with("multiple_choice", () => (
              <View className="mt-5 flex w-[90%] flex-row items-center justify-evenly self-center">
                <View className="space-y-4">
                  <View>{renderChoice(choices[0]!)}</View>
                  <View>{renderChoice(choices[1]!)}</View>
                </View>
                <View className="space-y-4">
                  <View>{renderChoice(choices[2]!)}</View>
                  <View>{renderChoice(choices[3]!)}</View>
                </View>
              </View>
            ))
            .with("true_or_false", () => (
              <TrueOrFalseCards
                {...{
                  choices,
                  setChoices,
                  errorState,
                  getSelectedChoices,
                  goBack,
                  handleOpenModal,
                  isSaved,
                  pointOptions,
                  question,
                  questionTitle,
                  resetQuestionImage,
                  setIsSaved,
                  setOpenAlert,
                  timeLimitOptions,
                }}
              />
            ))
            .with("identification", () => (
              <IdentificationCards
                {...{
                  choices,
                  setChoices,
                  errorState,
                  getSelectedChoices,
                  goBack,
                  handleOpenModal,
                  isSaved,
                  pointOptions,
                  question,
                  questionTitle,
                  resetQuestionImage,
                  setIsSaved,
                  setOpenAlert,
                  timeLimitOptions,
                }}
              />
            ))
            .with("multi_select", () => (
              <MultiSelectCards
                {...{
                  choices,
                  setChoices,
                  errorState,
                  getSelectedChoices,
                  goBack,
                  handleOpenModal,
                  isSaved,
                  pointOptions,
                  question,
                  questionTitle,
                  resetQuestionImage,
                  setIsSaved,
                  setOpenAlert,
                  timeLimitOptions,
                }}
              />
            ))
            .with(undefined, () => <></>)
            .exhaustive()}

          <Modal
            animationType="fade"
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
                  <View className="h-[50%] w-11/12 rounded-2xl bg-white">
                    <Text className="mt-10 text-center text-2xl font-bold">
                      Add Answer
                    </Text>
                    <TextInput
                      multiline={true}
                      maxLength={65}
                      className={`mx-5 mt-5 h-[50%] flex-col items-center justify-center rounded-2xl ${selectedChoice?.styles} p-2 text-center text-lg font-bold leading-[28.80px] text-white`}
                      selectionColor="white"
                      value={selectedChoice?.text}
                      onChangeText={(modalText) =>
                        handleChoiceChange(selectedQuestionId, modalText)
                      }
                      placeholder="Enter your answer here"
                      placeholderTextColor="#FFFFFF"
                    />
                    {selectedChoice?.text &&
                    selectedChoice?.text.length >= 65 ? (
                      <Text className="mt-2 text-center text-red-500 ">
                        You've reached the maximum of 65 characters.
                      </Text>
                    ) : null}

                    {questionType !== "identification" && (
                      <View className="flex flex-row items-center justify-center rounded-b-2xl bg-white px-5 py-8">
                        <Text className="shrink grow basis-0 text-lg font-bold leading-[28.80px] text-neutral-800">
                          Correct Answer
                        </Text>
                        <Switch
                          value={selectedChoice?.isCorrect}
                          onValueChange={() => {
                            if (questionType === "multiple_choice") {
                              toggleChoiceCorrect(selectedQuestionId);
                            }
                            if (questionType === "multi_select") {
                              const isMultiple = true;
                              toggleChoiceCorrect(
                                selectedQuestionId,
                                isMultiple,
                              );
                            }
                          }}
                          trackColor={{ true: "#10049FF" }}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          {/* Modals */}

          <AskAiModal
            showAiModal={showQuestionModal}
            aiQuestion={aiQuestion}
            setAiQuestion={setAiQuestion}
            isGenerating={isGenerating}
            handleQuestionGeneration={handleGenerateQuestion}
            handleClose={() => {
              setErrorInAIQuestion(false);
              setAiQuestion("");
              handleCloseQuestionModal();
            }}
            hasError={errorInAIQuestion}
          />

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
              {questions.map((question, idx) => {
                return (
                  <TouchableOpacity
                    className="relative h-[58px] w-24"
                    key={idx}
                    onPress={handleClickQuestion(idx)}
                  >
                    {question.image ? (
                      <ImageBackground
                        source={{ uri: question.image }}
                        resizeMode="cover"
                        className={`absolute left-0 top-0 h-[58px] w-24 overflow-hidden rounded-lg ${
                          idx === selectedIndex
                            ? "border-4 border-violet-600"
                            : "border border-zinc-400"
                        }`}
                      />
                    ) : (
                      <ImageBackground
                        source={require("../../../assets/images/no-image-placeholder.png")}
                        resizeMode="contain"
                        className={`absolute h-[58px] w-24 overflow-hidden rounded-lg ${
                          idx === selectedIndex
                            ? "border-4 border-violet-600"
                            : "border border-zinc-400"
                        } `}
                      />
                    )}
                    <View className="absolute left-0 top-0 inline-flex h-8 w-8 flex-col items-center justify-center rounded-br-lg border border-violet-600 bg-violet-600 p-1">
                      <Text className="text-center text-[10px] font-bold text-white">
                        {idx + 1}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TouchableOpacity
              className="ml-5 inline-flex flex-col items-center justify-center rounded-2xl border-b border-l border-r border-t border-indigo-800 bg-violet-600 p-[17px] shadow"
              onPress={openBottomSheet}
            >
              <Feather name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <AlertModal
          isVisible={promptSaveModal}
          alertTitle={"Save your question?"}
          alertDescription={
            "You will lose all unsaved changes if you exit this screen"
          }
          confirmButtonText={"Yes"}
          isCancelButtonVisible={true}
          cancelButtonText={"Cancel"}
          onCancel={() => {
            setPromptSaveModal(false);
          }}
          onConfirm={handleSaveAnswer(() => {
            setIsSaved(false);
            setPromptSaveModal(false);
          })}
        />

        <AlertModal
          isVisible={openAlert}
          alertTitle={"Are you sure you want to exit?"}
          alertDescription={
            "Please make sure to save in order to keep your changes"
          }
          confirmButtonText={"Yes"}
          isCancelButtonVisible={true}
          cancelButtonText={"Cancel"}
          onCancel={() => {
            setOpenAlert(false);
          }}
          onConfirm={() => {
            resetQuestionImage();
            goBack();
          }}
        />

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={styles.bottomSheetContainer}
        >
          <ChoiceBottomSheet
            goToCreateQuestion={goToCreateQuestion}
            closeBottomSheet={() => bottomSheetRef.current?.close()}
          />
        </BottomSheet>
      </View>
    </SafeAreaView>
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

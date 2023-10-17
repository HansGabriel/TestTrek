import { useCallback, useMemo, useRef, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Alert,
  BackHandler,
  Dimensions,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Feather } from "@expo/vector-icons";
import { testInputSchema } from "@acme/schema/src/test";
import AppTextInput from "../../components/inputs/AppTextInput";
import MultipleTextInput from "../../components/inputs/MultipleTextInput";
import BottomSheet from "@gorhom/bottom-sheet";
import ChoiceBottomSheet from "../../components/bottom-sheet/ChoiceBottomSheet";
import { useNavigation } from "@react-navigation/native";
import TestImagePicker from "../../components/ImagePicker";
import useQuestionStore from "../../stores/useQuestionStore";
import { FlashList } from "@shopify/flash-list";
import RightArrowIcon from "../../icons/RightArrowIcon";
import { IMAGE_PLACEHOLDER_LARGE } from "../../constants";
import AppPicker, {
  type LabelOption,
} from "../../components/pickers/AppPicker";
import useImageStore from "../../stores/useImageStore";
import { match } from "ts-pattern";
import { trpc } from "../../utils/trpc";
import { truncateString } from "@acme/utils/src/strings";
import { Octicons } from "@expo/vector-icons";
import RightSidebar from "./RightSidebar";
import { RouterOutputs } from "../../utils/trpc";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import type { TestInput } from "@acme/schema/src/types";
import type { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import type { FieldError } from "react-hook-form";
import useGoBack from "../../hooks/useGoBack";
import { PromptModal } from "../../components/modals/PromptModal";
import ChoiceModal from "../../components/modals/ChoiceModal";
import type { Option } from "../types";
import { NUMBER_OF_QUESTIONS_OPTIONS } from "../constants";
import { ReusableHeader } from "../../components/headers/ReusableHeader";
import { AskAiModal } from "../../components/modals/AskAiModal";
import {
  errorToast,
  successToast,
} from "../../components/notifications/ToastNotifications";

type FormProps = Omit<TestInput, "questions">;
type Reviewer = RouterOutputs["reviewer"]["getAllReviewers"][number];

interface Props {
  testTitle: string;
  testDetails?: FormProps;
  onSubmit: (data: FormProps) => void;
  isCreatingQuiz?: boolean;
  isUploading?: boolean;
  handleExitScreen: () => void;
}

const CreateTestForm: FC<Props> = ({
  testTitle,
  testDetails,
  onSubmit,
  isCreatingQuiz = false,
  isUploading = false,
  handleExitScreen,
}) => {
  const { height, width } = Dimensions.get("window");
  const [selectedReviewer, setSelectedReviewer] = useState<Reviewer | null>(
    null,
  );
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [errorInAIQuestion, setErrorInAIQuestion] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiQuestion, setAiQuestion] = useState<string>("");
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [openCreationChoice, setOpenCreationChoice] = useState(false);
  const [showNumberofQuestionsModal, setShowNumberOfQuestionsModal] =
    useState(false);
  const navigation = useNavigation();
  const image = useImageStore((state) => state.image);
  const [numberOfQuestionOptions, setNumberOfQuestionOptions] = useState<
    Option[]
  >(
    NUMBER_OF_QUESTIONS_OPTIONS.map((option) => ({
      ...option,
    })),
  );

  const { addQuestions, removeBlankQuestions } = useQuestionStore();

  const { mutate: generateMultipleQuestions, isLoading: isGenerating } =
    trpc.gptApi.generateMultipleQuestions.useMutation();

  const getDisplayImage = (isDefault = false) => {
    if (testDetails?.image && !image) {
      return testDetails.image;
    }

    if (image && !testDetails?.image) {
      return image;
    }

    if (image && testDetails?.image) {
      return isDefault ? testDetails.image : image;
    }

    return undefined;
  };

  const goBack = useGoBack();

  const displayImage = getDisplayImage(true);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(
      testInputSchema.omit({
        questions: true,
      }),
    ),
    defaultValues: {
      title: testDetails?.title,
      description: testDetails?.description,
      image: displayImage,
      visibility: testDetails?.visibility,
      keywords: testDetails?.keywords ?? [],
    },
  });

  const questions = useQuestionStore((state) => state.questions).filter(
    (questions) => !questions.inEdit,
  );
  const setSelectedIndex = useQuestionStore((state) => state.setSelectedIndex);
  const isLastQuestionInEdit = useQuestionStore(
    (state) => state.isLastQuestionInEdit,
  );
  const addEmptyQuestion = useQuestionStore((state) => state.addEmptyQuestion);
  const setLastIndex = useQuestionStore((state) => state.setLastIndex);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["5%", "35%", "60%"], []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
    setBottomSheetOpen(true);
  };

  const handleCloseNumberOfQuestionsModal = () => {
    setShowNumberOfQuestionsModal(false);
  };

  const handleClosePromptModal = () => {
    setIsPromptModalOpen(false);
  };

  const handleCloseAiModal = () => {
    setShowAiModal(false);
  };

  const handleCloseCreationChoice = () => {
    setOpenCreationChoice(false);
  };

  useEffect(() => {
    if (questions.length < 5 && isBottomSheetOpen) {
      setIsPromptModalOpen(true);
    } else {
      setIsPromptModalOpen(false);
    }
  }, [isBottomSheetOpen]);

  const goToCreateQuestion = () => {
    setOpenCreationChoice(true);
    if (isLastQuestionInEdit()) {
      //create
      setLastIndex();
    } else {
      //edit
      addEmptyQuestion("multiple_choice");
      setLastIndex();
    }
  };

  const goToEditQuestion = (questionIndex: number) => () => {
    setSelectedIndex(questionIndex);
    navigation.navigate("CreateQuestion");
  };

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetRef.current?.forceClose();
      setBottomSheetOpen(false);
    }
  }, []);

  const submitForm = (data: FormProps) => {
    onSubmit({
      ...data,
    });
  };

  const readyQuestions = questions.slice(0, 10);

  useEffect(() => {
    navigation.addListener("focus", () => {
      if (image && !testDetails?.image) {
        setValue("image", image);
      }
      if (testDetails?.image && !image) {
        setValue("image", testDetails.image);
      }
      if (image && testDetails?.image) {
        setValue("image", image);
      }
    });
  }, [image, testDetails?.image]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Are you sure?",
        "You will lose all unsaved progress if you exit this screen",
        [
          {
            text: "CANCEL",
            onPress: () => null,
            style: "cancel",
          },
          { text: "OK", onPress: () => goBack() },
        ],
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const goToViewAllQuestions = () => {
    navigation.navigate("ViewAll", {
      fetchedData: "questions",
      type: "questions",
      questions: questions,
    });
  };

  const renderKeywordError = () => {
    if (errors.keywords !== undefined) {
      const keywordsList = errors.keywords as FieldError[];
      const error = keywordsList
        .filter((error) => error !== undefined)
        .map((error) => error.message);

      const uniqueErrors = [...new Set(error)];
      return uniqueErrors.map((error, index) => (
        <Text key={index} className="text-red-500">
          {error}
        </Text>
      ));
    }
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setBottomSheetOpen(false);
  };

  const createMultipleQuestions = (inputMessage: string) => {
    const numOfQuestions =
      numberOfQuestionOptions.find((option) => option.isSelected)?.value ?? 1;

    if (inputMessage.length <= 0) {
      setErrorInAIQuestion(true);
    } else {
      generateMultipleQuestions(
        {
          message: inputMessage,
          questionType: "multipleChoice",
          numOfQuestions: numOfQuestions,
          numOfChoicesPerQuestion: 4,
        },
        {
          onSuccess: (data) => {
            addQuestions(
              data.map((question) => {
                if (question.type === "multipleChoice") {
                  return {
                    type: "multiple_choice",
                    choices: question.choices,
                    inEdit: false,
                    title: question.question,
                    time: question.timeLimit,
                    points: question.points,
                  };
                }
                return {
                  type: "multiple_choice",
                  choices: [],
                  inEdit: false,
                  title: "",
                };
              }),
            );
            removeBlankQuestions();
            addEmptyQuestion("multiple_choice");
            setLastIndex();
            setErrorInAIQuestion(false);
            setShowNumberOfQuestionsModal(false);
            setShowAiModal(false);
            successToast({
              title: "Success",
              message: "Questions generated successfully",
            });
            navigation.navigate("CreateQuestion");
          },
          onError: (error) => {
            errorToast({
              title: "Error",
              message: error.message,
            });
          },
        },
      );
    }
  };

  useEffect(() => {
    if (errors) {
      if (errors.image && errors.image.message) {
        errorToast({
          title: "Missing field",
          message: errors.image.message,
        });
      } else if (errors.title && errors.title.message) {
        errorToast({
          title: "Missing field",
          message: errors.title.message,
        });
      } else if (errors.visibility && errors.visibility.message) {
        errorToast({
          title: "Missing field",
          message: errors.visibility.message,
        });
      } else if (errors.description && errors.description.message) {
        errorToast({
          title: "Missing field",
          message: errors.description.message,
        });
      }
    }
  }, [errors]);

  return (
    <SafeAreaView>
      <ReusableHeader
        screenName={testTitle}
        optionIcon={<Octicons name="three-bars" size={24} color="black" />}
        onIconPress={() => setIsSidebarOpen(true)}
        backIcon={<Feather name="x" size={24} color="black" />}
        handleExit={handleExitScreen}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="mx-6 flex flex-col self-center"
        style={{ height: height * 0.95, width: width * 0.9 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-col">
            <View className="mb-6">
              <Controller
                control={control}
                render={({ field: { value } }) => {
                  return (
                    <>
                      <TestImagePicker image={value} />
                      {errors.image && !value && (
                        <Text className="mt-2 text-red-500">
                          {errors.image.message}
                        </Text>
                      )}
                    </>
                  );
                }}
                name="image"
              />
            </View>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppTextInput
                  label="Title"
                  textInputProps={{
                    onBlur,
                    placeholder: "Enter Title",
                    onChangeText: onChange,
                    value,
                  }}
                />
              )}
              name="title"
            />
            {errors.title && (
              <Text className="text-red-500">{errors.title.message}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => {
                const onTextChange = (option: LabelOption) => {
                  onChange(option.value);
                };
                return (
                  <AppPicker
                    label="Visible to"
                    placeholder="Select visibility"
                    options={[
                      { label: "public", value: "public" },
                      { label: "private", value: "private" },
                    ]}
                    selectedValue={value}
                    setSelectedValue={onTextChange}
                  />
                );
              }}
              name="visibility"
            />
            {errors.visibility && (
              <Text className="text-red-500">{errors.visibility.message}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <MultipleTextInput
                      label="Keyword"
                      textInputProps={{
                        placeholder: "Type keyword and enter",
                      }}
                      texts={value}
                      onChangeTexts={onChange}
                    />
                  </>
                );
              }}
              name="keywords"
            />
            {renderKeywordError()}

            <View className="mb-6">
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <AppTextInput
                    label="Description"
                    type="textarea"
                    textInputProps={{
                      onBlur,
                      onChangeText: onChange,
                      value,
                    }}
                  />
                )}
                name="description"
              />
              {errors.description && (
                <Text className="text-red-500">
                  {errors.description.message}
                </Text>
              )}
            </View>
          </View>
          {selectedReviewer && (
            <View className="mb-10">
              <View className="mb-6 flex flex-row items-center justify-between">
                <Text className="text-xl font-bold leading-loose text-neutral-800">
                  Selected Reviewer
                </Text>
              </View>
              <TouchableOpacity className="my-2 flex h-[105px] items-center justify-start">
                <View className="flex shrink grow basis-0 items-center justify-start self-stretch rounded-xl border border-zinc-200 bg-white">
                  <View className="relative w-[140px] self-stretch">
                    <ImageBackground
                      source={{
                        uri: selectedReviewer.imageUrl,
                      }}
                      imageStyle={{
                        borderTopLeftRadius: 12,
                        borderBottomLeftRadius: 12,
                      }}
                      className="absolute left-0 top-0 h-[105px] w-[140px] rounded-l-xl"
                    />
                  </View>
                  <Text className="w-ful font-nunito-bold absolute left-40 top-2 text-lg leading-[28.80px] text-neutral-800">
                    {selectedReviewer.title}
                  </Text>
                  <Text
                    className="font-nunito-semibold absolute left-40 top-10 text-base leading-snug tracking-tight text-neutral-700"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {truncateString(selectedReviewer.content, 25)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {questions.length > 0 && (
            <>
              <View className="mb-10 h-full flex-1 flex-col">
                <View className="mb-6 flex flex-row items-center justify-between">
                  <Text className="text-xl font-bold leading-loose text-neutral-800">
                    Question ({questions.length})
                  </Text>
                  <TouchableOpacity
                    className="flex flex-row items-center gap-1"
                    onPress={goToViewAllQuestions}
                  >
                    <Text className="font-nunito-bold w-70 text-right text-lg font-semibold leading-6 text-[#6949FF]">
                      View All
                    </Text>
                    <RightArrowIcon />
                  </TouchableOpacity>
                </View>

                <SafeAreaView className="min-h-full flex-1">
                  <FlashList
                    estimatedItemSize={10}
                    data={readyQuestions}
                    showsVerticalScrollIndicator={true}
                    renderItem={({ item: question, index }) => {
                      return (
                        <TouchableOpacity
                          className="my-2 flex h-[105px] items-center justify-start"
                          key={index}
                          onPress={goToEditQuestion(index)}
                        >
                          <View className="flex shrink grow basis-0 items-center justify-start self-stretch rounded-xl border border-zinc-200 bg-white">
                            <View className="relative w-[140px] self-stretch">
                              <ImageBackground
                                source={{
                                  uri:
                                    question.image ?? IMAGE_PLACEHOLDER_LARGE,
                                }}
                                imageStyle={{
                                  borderTopLeftRadius: 12,
                                  borderBottomLeftRadius: 12,
                                }}
                                className="absolute left-0 top-0 h-[105px] w-[140px] rounded-l-xl"
                              />
                            </View>
                            <Text className="w-ful font-nunito-bold absolute left-40 top-2 text-lg leading-[28.80px] text-neutral-800">
                              {index + 1} -{" "}
                              {match(question.type)
                                .with(
                                  "multiple_choice",
                                  () => "Multiple Choice",
                                )
                                .with("true_or_false", () => "True or False")
                                .with("multi_select", () => "Multi Select")
                                .with("identification", () => "Identification")
                                .with("enumeration", () => "Enumeration")
                                .exhaustive()}
                            </Text>
                            <Text
                              className="font-nunito-semibold absolute left-40 top-10 text-base leading-snug tracking-tight text-neutral-700"
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {truncateString(question.title, 25)}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </SafeAreaView>
              </View>
            </>
          )}

          <View className="mb-24 flex flex-row items-center justify-between">
            <TouchableOpacity
              className="w-[45%] items-center justify-center rounded-[100px] border-b-2 border-l border-r border-t border-violet-300 bg-violet-100 py-[18px]"
              onPress={handleSubmit(submitForm)}
              disabled={questions.length < 5}
              style={[questions.length < 5 ? styles.disabledButton : {}]}
            >
              {isCreatingQuiz || isUploading ? (
                <ActivityIndicator color="black" />
              ) : (
                <Text className="shrink grow basis-0 text-center text-base font-bold leading-snug tracking-tight text-violet-600">
                  Save
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openBottomSheet}
              className="w-[45%] items-center justify-center rounded-[100px] border-b-4 border-l border-r border-t border-indigo-800 bg-indigo-700 py-[18px]"
            >
              <Text className="shrink grow basis-0 text-center text-base font-bold leading-snug tracking-tight text-white">
                Add Question
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {isBottomSheetOpen && (
        <View style={styles.overlay} onTouchEnd={closeBottomSheet} />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={styles.bottomSheetContainer}
      >
        <ChoiceBottomSheet
          goToCreateQuestion={goToCreateQuestion}
          closeBottomSheet={closeBottomSheet}
        />
      </BottomSheet>
      <RightSidebar
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
        }}
        setReviewer={setSelectedReviewer}
        handleConfirmPress={() => {
          setIsSidebarOpen(false);
        }}
        confirmButtonText={"Confirm"}
      />

      <PromptModal
        isVisible={isPromptModalOpen}
        onConfirm={handleClosePromptModal}
        modalIcon={
          <MaterialCommunityIcons
            name="bell-ring-outline"
            size={40}
            color="#7c3aed"
          />
        }
        modalTitle={"Reminder"}
        modalDescription={
          "Please create at least five (5) questions to save the test!"
        }
        confirmButtonText={"Ok"}
        isCancelButtonVisible={false}
      />

      <PromptModal
        isVisible={openCreationChoice}
        modalIcon={
          <MaterialCommunityIcons name="robot" size={40} color="#7c3aed" />
        }
        modalTitle={"Create Question"}
        modalDescription={"Do you want to generate questions with A.I?"}
        confirmButtonText={"Yes"}
        isCancelButtonVisible={true}
        cancelButtonText={"Manual Input"}
        onCancel={() => {
          handleCloseCreationChoice();
          navigation.navigate("CreateQuestion");
        }}
        onConfirm={() => {
          handleCloseCreationChoice();
          setTimeout(() => {
            setShowNumberOfQuestionsModal(true);
          }, 500);
        }}
      />

      <ChoiceModal
        title="No. of questions you want to generate"
        selectButtonText={
          !selectedReviewer?.content ? "Select Reviewer" : "Generate Questions"
        }
        options={numberOfQuestionOptions}
        setOptions={setNumberOfQuestionOptions}
        isVisible={showNumberofQuestionsModal}
        setIsVisible={handleCloseNumberOfQuestionsModal}
        isLoading={isGenerating}
        handleAIPress={() => {
          setShowNumberOfQuestionsModal(false);
          setShowAiModal(true);
        }}
        handleSelectPress={() => {
          if (!selectedReviewer?.content) {
            setIsSidebarOpen(true);
          } else {
            createMultipleQuestions(selectedReviewer.content);
          }
        }}
      />

      <AskAiModal
        showAiModal={showAiModal}
        aiQuestion={aiQuestion}
        setAiQuestion={setAiQuestion}
        isGenerating={isGenerating}
        handleQuestionGeneration={() => createMultipleQuestions(aiQuestion)}
        handleClose={() => {
          setAiQuestion("");
          setErrorInAIQuestion(false);
          handleCloseAiModal();
          setShowNumberOfQuestionsModal(true);
        }}
        hasError={errorInAIQuestion}
      />
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
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default CreateTestForm;

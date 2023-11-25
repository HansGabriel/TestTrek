import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { ReusableHeader } from "../../components/headers/ReusableHeader";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import TestImagePicker from "../../components/ImagePicker";
import { Reviewers } from "@acme/schema/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewerSchema } from "@acme/schema/src/reviewer";
import useImageStore from "../../stores/useImageStore";
import AppPicker, { LabelOption } from "../../components/pickers/AppPicker";
import { trpc } from "../../utils/trpc";
import { match } from "ts-pattern";
import { Feather } from "@expo/vector-icons";
import type { RootStackScreenProps } from "../../types";
import useGoBack from "../../hooks/useGoBack";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  errorToast,
  successToast,
} from "../../components/notifications/ToastNotifications";
import { AlertModal } from "../../components/modals/AlertModal";
import ChoiceModal from "../../components/modals/ChoiceModal";
import type { Option } from "./types";
import { NUMBER_OF_QUESTIONS_OPTIONS } from "./constants";
import useQuestionStore from "../../stores/useQuestionStore";
import { AppButton } from "../../components/buttons/AppButton";
import * as DocumentPicker from "expo-document-picker";

export const CreateReviewerScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"CreateReviewer">) => {
  const trpcUtils = trpc.useContext();
  const { height, width } = Dimensions.get("window");
  const { reviewerId, type } = route.params ?? {
    reviewerId: undefined,
    type: "create",
  };
  const richText = useRef<RichEditor | null>(null);
  let highlightedText = "";
  const regex =
    /<span style="(?:font-size: 1em; )?background-color: yellow;">(?:<b>)?(?:<i>)?(?:<u>)?(.*?)(?:<\/u>)?(?:<\/i>)?(?:<\/b>)?<\/span>/g;

  const [isHighlighterToggled, setIsHighlighterToggled] = useState(false);
  const [isChoiceModalToggled, setIsChoiceModalToggled] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [numberOfQuestionOptions, setNumberOfQuestionOptions] = useState<
    Option[]
  >(
    NUMBER_OF_QUESTIONS_OPTIONS.map((option) => ({
      ...option,
    })),
  );
  const [showNumberofQuestionsModal, setShowNumberOfQuestionsModal] =
    useState(false);

  const addEmptyQuestion = useQuestionStore((state) => state.addEmptyQuestion);
  const setLastIndex = useQuestionStore((state) => state.setLastIndex);
  const { addQuestions, removeBlankQuestions } = useQuestionStore();

  const reviewerImage = useImageStore((state) => state.reviewerImage);
  const resetReviewerImage = useImageStore((state) => state.resetReviewerImage);
  const goBack = useGoBack();

  const { data: reviewerDetails } = trpc.reviewer.getReviewerById.useQuery(
    {
      reviewerId: reviewerId ?? "",
    },
    {
      enabled: reviewerId !== undefined,
    },
  );

  const { mutate: generateMultipleQuestions, isLoading: isGenerating } =
    trpc.gptApi.generateMultipleQuestions.useMutation();

  const {
    mutate: createReviewer,
    isLoading: isCreatingReviewer,
    reset,
  } = trpc.reviewer.createReviewer.useMutation();

  const { mutate: deleteReviewer, isLoading: isDeleting } =
    trpc.reviewer.delete.useMutation({
      onSuccess: () => {
        successToast({
          title: "Success",
          message: "Reviewer deleted successfully",
        });
        trpcUtils.reviewer.invalidate();
        resetReviewerImage();
        reset();
        navigation.navigate("MyLibrary");
      },
      onError: () => {
        errorToast({
          title: "Error",
          message: "An error occurred",
        });
        resetReviewerImage();
      },
    });

  const { mutate: updateReviewer, isLoading: isUpdatingReviewer } =
    trpc.reviewer.updateReviewer.useMutation();

  const getDisplayImage = () => {
    if (reviewerImage) {
      return reviewerImage;
    }
    return undefined;
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
    getValues,
  } = useForm<Reviewers>({
    resolver: zodResolver(reviewerSchema),
    defaultValues: {
      title: reviewerDetails?.title ?? "",
      content: reviewerDetails?.content ?? "",
      visibility: reviewerDetails?.visibility ?? ("" as "public" | "private"),
      imageUrl: reviewerDetails?.imageUrl ?? getDisplayImage(),
    },
  });

  const toggleHighlighter = () => {
    setIsHighlighterToggled(!isHighlighterToggled);
    if (richText.current) {
      richText.current.setHiliteColor(
        !isHighlighterToggled ? "yellow" : "#ffffff",
      );
    }
  };

  const toggleChoiceModal = () => {
    setIsChoiceModalToggled(!isChoiceModalToggled);
    setShowNumberOfQuestionsModal(true);
  };

  const highlightIcon = () => {
    return (
      <FontAwesome5
        name="highlighter"
        size={18}
        color={isHighlighterToggled ? "#7c3aed" : "black"}
        onPress={toggleHighlighter}
      />
    );
  };

  const generateAiIcon = () => {
    return (
      <MaterialCommunityIcons
        name="robot-happy"
        size={18}
        color={isChoiceModalToggled ? "#7c3aed" : "black"}
        onPress={toggleChoiceModal}
      />
    );
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      if (reviewerImage) {
        setValue("imageUrl", reviewerImage);
      }
    });
  }, [reviewerImage]);

  const filePicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (result.type === "success") {
      console.log(result.uri);
    }
  };

  const submitReviewerData = (createdData: Reviewers) => {
    if (type === "edit") {
      updateReviewer(
        {
          reviewerId: reviewerId ?? "",
          title: createdData.title,
          imageUrl: createdData.imageUrl,
          visibility: createdData.visibility,
          content: createdData.content,
        },
        {
          onSuccess: () => {
            successToast({
              title: "Success",
              message: "Reviewer updated successfully",
            });
            resetReviewerImage();
            reset();
            navigation.navigate("MyLibrary");
          },
          onError: () => {
            errorToast({
              title: "Error",
              message: "An error occurred",
            });
            resetReviewerImage();
          },
        },
      );
      return;
    }

    if (type === "create") {
      createReviewer(
        {
          title: createdData.title,
          imageUrl: createdData.imageUrl,
          visibility: createdData.visibility,
          content: createdData.content,
        },
        {
          onSuccess: () => {
            successToast({
              title: "Success",
              message: "Reviewer created successfully",
            });
            resetReviewerImage();
            reset();
            navigation.navigate("MyLibrary");
          },
          onError: () => {
            errorToast({
              title: "Error",
              message: "An error occurred",
            });
            resetReviewerImage();
          },
        },
      );
      return;
    }
  };

  const createMultipleQuestions = (inputMessage: string) => {
    const numOfQuestions =
      numberOfQuestionOptions.find((option) => option.isSelected)?.value ?? 1;

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
              if (question.type === "multiselect") {
                return {
                  type: "multi_select",
                  choices: question.choices,
                  inEdit: false,
                  title: question.question,
                  time: question.timeLimit,
                  points: question.points,
                };
              }
              if (question.type === "trueOrFalse") {
                return {
                  type: "true_or_false",
                  choices: [
                    {
                      text: "True",
                      isCorrect: question.answer,
                    },
                    {
                      text: "False",
                      isCorrect: !question.answer,
                    },
                  ],
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
          setShowNumberOfQuestionsModal(false);
          successToast({
            title: "Success",
            message: "Questions generated successfully",
          });
          navigation.navigate("CreateTest");
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
  };

  useEffect(() => {
    if (reviewerDetails) {
      setValue("title", reviewerDetails.title);
      setValue("content", reviewerDetails.content);
      setValue("visibility", reviewerDetails.visibility);
      setValue("imageUrl", reviewerDetails.imageUrl);
      richText.current?.setContentHTML(reviewerDetails.content);
    }
  }, [reviewerDetails]);

  const handleExitScreen = () => {
    if (isDirty) {
      setOpenAlert(true);
    } else {
      resetReviewerImage();
      goBack();
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (isDirty) {
        setOpenAlert(true);
      } else {
        resetReviewerImage();
        goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, [isDirty]);

  useEffect(() => {
    if (errors) {
      if (errors.imageUrl && errors.imageUrl.message) {
        errorToast({
          title: "Missing field",
          message: errors.imageUrl.message,
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
      }
    }
  }, [errors]);

  return (
    <SafeAreaView className="flex-1" style={{ height: height, width: width }}>
      <ReusableHeader
        backIcon={<Feather name="x" size={24} color="black" />}
        handleExit={handleExitScreen}
        screenName={match(type)
          .with("create", () => "Create Reviewer")
          .with("edit", () => "Edit Reviewer")
          .with(undefined, () => "Create Reviewer")
          .exhaustive()}
        optionIcon={
          isCreatingReviewer || isUpdatingReviewer ? (
            <ActivityIndicator color="rgb(79 70 229)" />
          ) : (
            <Entypo
              name="save"
              size={28}
              color="rgb(79 70 229)"
              onPress={handleSubmit(submitReviewerData)}
            />
          )
        }
        showDropdown={type === "edit"}
        onDropdownPress={() => {
          deleteReviewer({
            reviewerId: reviewerId ?? "",
          });
        }}
        isLoadingDropdown={isDeleting}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-5 w-[90%] self-center">
          <Controller
            control={control}
            render={({ field: { value } }) => {
              return (
                <>
                  <TestImagePicker image={value} type="reviewer" />
                  {errors.imageUrl && !value && (
                    <Text className="mt-2 text-red-500">
                      {errors.imageUrl.message}
                    </Text>
                  )}
                </>
              );
            }}
            name="imageUrl"
          />
        </View>
        <View className="mt-5 w-[90%] self-center border-b border-zinc-100">
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Text
                  className={`font-nunito-bold ml-3 text-base leading-snug tracking-tight text-neutral-800`}
                >
                  Title
                </Text>
                <TextInput
                  onBlur={onBlur}
                  className="font-nunito-bold ml-3 h-10 text-lg"
                  editable
                  placeholder="Input title here"
                  maxLength={40}
                  onChangeText={onChange}
                  value={value}
                  cursorColor={"black"}
                />
              </>
            )}
          />
          {errors.title && (
            <Text className="text-red-500">{errors.title.message}</Text>
          )}
        </View>
        <View className="my-5 w-[90%] self-center">
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              const onTextChange = (option: LabelOption) => {
                onChange(option.value);
              };
              return (
                <AppPicker
                  dropDownTextMarginLeft={13}
                  labelMarginLeft="ml-3"
                  borderBottomColor="#f4f4f5"
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
        </View>
        <View className="my-3 h-[50%] w-[90%] self-center border border-zinc-100">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <>
                  <Text
                    className={`font-nunito-bold ml-3 text-base leading-snug tracking-tight text-neutral-800`}
                  >
                    Reviewer Content
                  </Text>

                  <ScrollView
                    className="flex-1"
                    style={{
                      height: Dimensions.get("window").height * 0.75,
                    }}
                  >
                    <KeyboardAvoidingView
                      behavior={Platform.OS === "ios" ? "padding" : "height"}
                      className="flex-1"
                    >
                      <RichEditor
                        initialContentHTML={value}
                        ref={richText}
                        onBlur={onBlur}
                        onChange={onChange}
                        pasteAsPlainText={true}
                        placeholder={"Enter your reviewer content here"}
                        androidLayerType="software"
                        className=" font-nunito-medium"
                        useContainer={false}
                        containerStyle={{
                          minHeight: 500,
                          maxHeight: Dimensions.get("window").height,
                        }}
                      />
                    </KeyboardAvoidingView>
                  </ScrollView>
                </>
              );
            }}
            name="content"
          />
        </View>
        <View>
          <AppButton
            text="Upload PDF file"
            buttonColor="violet-600"
            borderShadowColor="indigo-800"
            borderRadius="full"
            fontStyle="bold"
            textColor="white"
            TOwidth="36"
            Vwidth="36"
            onPress={filePicker}
          />
        </View>
      </ScrollView>

      <RichToolbar
        editor={richText}
        selectedIconTint="#7c3aed"
        iconTint="#020617"
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.setUnderline,
          actions.undo,
          actions.redo,
          actions.removeFormat,
          actions.hiliteColor,
          "toggleChoiceModal",
        ]}
        iconMap={{
          [actions.hiliteColor]: highlightIcon,
          toggleChoiceModal: generateAiIcon,
        }}
      />

      <AlertModal
        isVisible={openAlert}
        alertTitle={"Are you sure?"}
        alertDescription={
          "You will lose all unsaved progress if you exit this screen"
        }
        confirmButtonText={"Yes"}
        isCancelButtonVisible={true}
        cancelButtonText={"Cancel"}
        onCancel={() => {
          setOpenAlert(false);
        }}
        onConfirm={goBack}
      />

      <ChoiceModal
        title="No. of questions you want to generate"
        selectButtonText="Generate Questions"
        options={numberOfQuestionOptions}
        setOptions={setNumberOfQuestionOptions}
        isVisible={showNumberofQuestionsModal}
        setIsVisible={() => {
          setShowNumberOfQuestionsModal(false);
          setIsChoiceModalToggled(false);
        }}
        isLoading={isGenerating}
        showAskAIOption={false}
        handleSelectPress={() => {
          const reviewerContent = getValues().content;
          const matchArray = [...reviewerContent.matchAll(regex)];

          for (const match of matchArray) {
            highlightedText = highlightedText + " " + match[1];
          }

          console.log(highlightedText);

          createMultipleQuestions(highlightedText);

          setIsChoiceModalToggled(false);
        }}
      />
    </SafeAreaView>
  );
};

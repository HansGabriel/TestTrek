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
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { testInputSchema } from "@acme/schema/src/test";
import AppTextInput from "../components/inputs/AppTextInput";
import MultipleTextInput from "../components/inputs/MultipleTextInput";
import BottomSheet from "@gorhom/bottom-sheet";
import ChoiceBottomSheet from "../components/bottom-sheet/ChoiceBottomSheet";
import { useNavigation } from "@react-navigation/native";
import TestImagePicker from "../components/ImagePicker";
import useQuestionStore from "../stores/useQuestionStore";
import { FlashList } from "@shopify/flash-list";
import RightArrowIcon from "../icons/RightArrowIcon";
import { IMAGE_PLACEHOLDER_LARGE } from "../constants";
import AppPicker, { type LabelOption } from "../components/pickers/AppPicker";
import useImageStore from "../stores/useImageStore";
import { match } from "ts-pattern";
import { trpc } from "../utils/trpc";
import { truncateString } from "@acme/utils/src/strings";

import type { TestInput } from "@acme/schema/src/types";
import type { FC } from "react";
import type { SetOptional } from "type-fest";
import { SafeAreaView } from "react-native-safe-area-context";

import type { FieldError } from "react-hook-form";

type Omitted = Omit<TestInput, "questions">;
type FormProps = SetOptional<Omitted, "collection">;

interface Props {
  testDetails?: FormProps;
  onSubmit: (data: FormProps) => void;
  isCreatingQuiz?: boolean;
  isUploading?: boolean;
}

const CreateTestForm: FC<Props> = ({
  testDetails,
  onSubmit,
  isCreatingQuiz = false,
  isUploading = false,
}) => {
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const navigation = useNavigation();
  const image = useImageStore((state) => state.image);

  const { data: userCollections } = trpc.collection.getByUserId.useQuery({
    sortBy: "alphabetical",
  });

  const getDisplayImage = () => {
    if (testDetails?.image && !image) {
      return testDetails.image;
    }

    if (image && !testDetails?.image) {
      return image;
    }

    if (image && testDetails?.image) {
      return image;
    }

    return undefined;
  };

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
      image: getDisplayImage(),
      collection: testDetails?.collection,
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

  const snapPoints = useMemo(() => ["5%", "25%", "60%"], []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
    setBottomSheetOpen(true);
  };

  const goToCreateQuestion = () => {
    if (isLastQuestionInEdit()) {
      setLastIndex();
      navigation.navigate("CreateQuestion");
    } else {
      addEmptyQuestion("multiple_choice");
      setLastIndex();
      navigation.navigate("CreateQuestion");
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

  return (
    <SafeAreaView
      className={`${isBottomSheetOpen ? "inset-0 z-10 bg-black/60" : ""}`}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="mx-6 flex flex-col content-end justify-between"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mb-2 mt-8 flex flex-col">
            <View className="mb-6">
              <Controller
                control={control}
                render={({ field: { value } }) => (
                  <TestImagePicker image={value} />
                )}
                name="image"
              />
              {errors.image && (
                <Text className="mt-2 text-red-500">
                  {errors.image.message}
                </Text>
              )}
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
                  <>
                    {userCollections ? (
                      <AppPicker
                        label="Collection"
                        placeholder="Select collection"
                        options={userCollections.map((collection) => ({
                          label: collection.title,
                          value: collection.id,
                        }))}
                        selectedValue={value}
                        setSelectedValue={onTextChange}
                        hasDefault={true}
                      />
                    ) : null}
                  </>
                );
              }}
              name="collection"
            />
            {errors.collection && (
              <Text className="text-red-500">{errors.collection.message}</Text>
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
              className="w-[45%] items-center justify-center rounded-[100px] border-b-2 border-violet-300 bg-violet-100 py-[18px]"
              onPress={handleSubmit(submitForm)}
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
              className="w-[45%] items-center justify-center rounded-[100px] border-b-2 border-indigo-800 bg-indigo-700 py-[18px]"
            >
              <Text className="shrink grow basis-0 text-center text-base font-bold leading-snug tracking-tight text-white">
                Add Question
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={styles.bottomSheetContainer}
      >
        <ChoiceBottomSheet goToCreateQuestion={goToCreateQuestion} />
      </BottomSheet>
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

export default CreateTestForm;

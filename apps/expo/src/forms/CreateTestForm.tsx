import { useCallback, useMemo, useRef, useState, useEffect } from "react";
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

import type { TestInput } from "@acme/schema/src/types";
import type { FC } from "react";
import type { SetOptional } from "type-fest";
import { SafeAreaView } from "react-native-safe-area-context";

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
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(
      testInputSchema.omit({
        keywords: true,
        questions: true,
      }),
    ),
    defaultValues: {
      title: testDetails?.title,
      description: testDetails?.description,
      image: getDisplayImage(),
      collection: testDetails?.collection,
      visibility: testDetails?.visibility,
      keywords: testDetails?.keywords,
    },
  });

  const questions = useQuestionStore((state) => state.questions);
  const setSelectedIndex = useQuestionStore((state) => state.setSelectedIndex);
  const isLastQuestionInEdit = useQuestionStore(
    (state) => state.isLastQuestionInEdit,
  );
  const addEmptyQuestion = useQuestionStore((state) => state.addEmptyQuestion);
  const setLastIndex = useQuestionStore((state) => state.setLastIndex);

  const [keywords, setKeywords] = useState<string[]>(
    testDetails?.keywords ?? [],
  );

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["5%", "25%", "60%"], []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
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
    }
  }, []);

  const submitForm = (data: FormProps) => {
    onSubmit({
      ...data,
      keywords,
    });
    reset();
    setKeywords([]);
  };

  const readyQuestions = questions
    .filter((question) => !question.inEdit)
    .slice(0, 10);

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
      questions: questions.filter((question) => !question.inEdit),
    });
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="mx-6 flex flex-col content-end justify-between"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mt-8 mb-2 flex flex-col">
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
              render={({ field: { onChange, onBlur, value } }) => (
                <AppTextInput
                  label="Description"
                  textInputProps={{
                    onBlur,
                    placeholder: "Enter Description",
                    onChangeText: onChange,
                    value,
                  }}
                />
              )}
              name="description"
            />
            {errors.description && (
              <Text className="text-red-500">{errors.description.message}</Text>
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

            <MultipleTextInput
              label="Keyword"
              textInputProps={{
                placeholder: "Type keyword and enter",
              }}
              texts={keywords}
              onChangeTexts={setKeywords}
            />
          </View>

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
                              uri: question.image ?? IMAGE_PLACEHOLDER_LARGE,
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
                            .with("multiple_choice", () => "Multiple Choice")
                            .with("true_or_false", () => "True or False")
                            .with("multi_select", () => "Multi Select")
                            .with("identification", () => "Identification")
                            .with("enumeration", () => "Enumeration")
                            .exhaustive()}
                        </Text>
                        <Text className="font-nunito-semibold absolute left-40 top-10 text-base leading-snug tracking-tight text-neutral-700">
                          {question.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </SafeAreaView>
          </View>

          <View className="flex flex-row items-center justify-between pb-20">
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

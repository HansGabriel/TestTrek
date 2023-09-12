import { useCallback, useMemo, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { testDetailsSchema } from "@acme/schema/src/test";
import AppTextInput from "../components/inputs/AppTextInput";
import MultipleTextInput from "../components/inputs/MultipleTextInput";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  TestIcon,
  TFIcon,
  ChatIcon,
  CheckboxIcon,
} from "../icons/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import TestImagePicker from "../components/ImagePicker";
import useQuestionStore from "../stores/useQuestionStore";
import { FlashList } from "@shopify/flash-list";
import RightArrowIcon from "../icons/RightArrowIcon";

import type { TestDetails } from "@acme/schema/src/types";
import type { FC } from "react";

interface Props {
  onSubmit: (data: TestDetails) => void;
  isCreatingQuiz?: boolean;
  isUploading?: boolean;
}

const CreateTestForm: FC<Props> = ({
  onSubmit,
  isCreatingQuiz = false,
  isUploading = false,
}) => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestDetails>({
    resolver: zodResolver(
      testDetailsSchema.omit({
        keywords: true,
      }),
    ),
  });

  const questions = useQuestionStore((state) => state.questions);
  const isLastQuestionInEdit = useQuestionStore(
    (state) => state.isLastQuestionInEdit,
  );
  const addEmptyQuestion = useQuestionStore((state) => state.addEmptyQuestion);
  const setLastIndex = useQuestionStore((state) => state.setLastIndex);

  const [keywords, setKeywords] = useState<string[]>([]);

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
      addEmptyQuestion("multiple-choice");
      setLastIndex();
      navigation.navigate("CreateQuestion");
    }
  };

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetRef.current?.forceClose();
    }
  }, []);

  const submitForm = (data: TestDetails) => {
    onSubmit({
      ...data,
      keywords,
    });
    reset();
    setKeywords([]);
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="mx-6 flex flex-col content-end justify-between"
        >
          <View className="mt-8 mb-2 flex flex-col">
            <View className="mb-6">
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TestImagePicker image={value} setImage={onChange} />
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
                    multiline: true,
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

            {/* <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppTextInput
                  label="Collection"
                  textInputProps={{
                    onBlur,
                    placeholder: "Select Collection",
                    onChangeText: onChange,
                    value,
                  }}
                />
              )}
              name="collection"
            />
            {errors.collection && (
              <Text className="text-red-500">{errors.collection.message}</Text>
            )} */}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppTextInput
                  label="Visible to"
                  textInputProps={{
                    onBlur,
                    onChangeText: onChange,
                    placeholder: "Select Visibility",
                    value,
                  }}
                />
              )}
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
              <TouchableOpacity className="flex flex-row items-center gap-1">
                <Text className="font-nunito-bold w-70 text-right text-lg font-semibold leading-6 text-[#6949FF]">
                  View All
                </Text>
                <RightArrowIcon />
              </TouchableOpacity>
            </View>
            <FlashList
              data={questions}
              estimatedItemSize={10}
              showsVerticalScrollIndicator={true}
              renderItem={({ item: question, index }) => {
                const isInEdit = question.inEdit;
                if (isInEdit) return null;
                return (
                  <TouchableOpacity className="my-2 flex h-[105px] items-center justify-start">
                    <View className="flex shrink grow basis-0 items-center justify-start self-stretch rounded-xl border border-zinc-200 bg-white">
                      <View className="relative w-[140px] self-stretch">
                        <ImageBackground
                          source={{ uri: question.image }}
                          imageStyle={{
                            borderTopLeftRadius: 12,
                            borderBottomLeftRadius: 12,
                          }}
                          className="absolute left-0 top-0 h-[105px] w-[140px] rounded-l-xl"
                        />
                      </View>
                      <Text className="w-ful font-nunito-bold absolute left-40 top-2 text-lg leading-[28.80px] text-neutral-800">
                        {index + 1} - {question.type}
                      </Text>
                      <Text className="font-nunito-semibold absolute left-40 top-10 text-base leading-snug tracking-tight text-neutral-700">
                        {question.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
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
        </KeyboardAvoidingView>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={styles.bottomSheetContainer}
      >
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
                    Multi-Select
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
      </BottomSheet>
    </>
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

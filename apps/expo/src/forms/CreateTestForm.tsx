import { useCallback, useMemo, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { testDetailsSchema } from "@acme/schema/src/test";
import AppTextInput from "../components/inputs/AppTextInput";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  TestIcon,
  TFIcon,
  ChatIcon,
  CheckboxIcon,
} from "../icons/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

import type { TestDetails } from "@acme/schema/src/types";
import type { FC } from "react";

interface Props {
  onSubmit: (data: TestDetails) => void;
  isCreatingQuiz?: boolean;
}

const CreateTestForm: FC<Props> = ({ onSubmit, isCreatingQuiz = false }) => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TestDetails>({
    resolver: zodResolver(
      testDetailsSchema.omit({
        image: true,
        keywords: true,
      }),
    ),
  });

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["5%", "25%", "60%"], []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const goToCreateQuestion = () => {
    navigation.navigate("CreateQuestion");
  };

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetRef.current?.forceClose();
    }
  }, []);

  return (
    <>
      <ScrollView
        contentInset={{ bottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="mx-6 flex flex-col content-end justify-between"
        >
          <View className="my-8 flex flex-col">
            <Controller
              control={control}
              render={({ field: {} }) => (
                <TouchableOpacity className="mx-auto mb-6 h-56 w-full items-center justify-center rounded-3xl border-2 border-violet-600 bg-neutral-50">
                  <FontAwesome
                    name="image"
                    size={48}
                    color="rgba(105, 73, 255, 1)"
                  />
                  <Text className="font-nunito-bold mt-4 text-violet-600">
                    Add Cover Image
                  </Text>
                </TouchableOpacity>
              )}
              name="image"
            />

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

            <Controller
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
            )}

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
            {errors.collection && (
              <Text className="text-red-500">{errors.collection.message}</Text>
            )}
          </View>

          <View className="flex flex-row items-center justify-between pb-20">
            <TouchableOpacity
              className="w-[45%] items-center justify-center rounded-[100px] border-b-2 border-violet-300 bg-violet-100 py-[18px]"
              onPress={handleSubmit(onSubmit)}
            >
              {isCreatingQuiz ? (
                <ActivityIndicator color="violet" />
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
          <View className="inline-flex h-[0px] w-[382px] items-center justify-center">
            <View className="h-[0px] w-[382px] border border-zinc-100"></View>
          </View>

          {/* Cards */}
          <ScrollView className="mt-8" showsVerticalScrollIndicator={false}>
            <View className="flex flex-col items-center gap-1">
              <View className="flex flex-row gap-1">
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

              <View className="flex flex-row gap-1">
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

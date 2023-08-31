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

import type { TestDetails } from "@acme/schema/src/types";
import type { FC } from "react";

interface Props {
  onSubmit: (data: TestDetails) => void;
  isCreatingQuiz?: boolean;
}

const CreateTestForm: FC<Props> = ({ onSubmit, isCreatingQuiz = false }) => {
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

  const snapPoints = useMemo(() => ["5%", "25%", "50%", "75%", "90%"], []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
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
          className="flex flex-col content-end justify-between"
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
        <View className="flex-1 bg-white px-5 py-10 shadow shadow-black">
          <View className="flex flex-row items-center justify-center pb-5">
            <Text className="text-center text-2xl font-semibold leading-[38.40px] text-neutral-800">
              Add Question
            </Text>
          </View>
          <View className="inline-flex h-[0px] w-[382px] items-center justify-center">
            <View className="h-[0px] w-[382px] border border-zinc-100"></View>
          </View>
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

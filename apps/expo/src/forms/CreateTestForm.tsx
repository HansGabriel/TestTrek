import { useForm, Controller } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { testDetailsSchema } from "@acme/schema/src/test";
import AppTextInput from "../components/inputs/AppTextInput";

import type { TestDetails } from "@acme/schema/src/types";
import type { FC } from "react";

interface Props {
  onSubmit: (data: TestDetails) => void;
}

const CreateTestForm: FC<Props> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TestDetails>({
    resolver: zodResolver(testDetailsSchema),
  });

  return (
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

          {errors.collection && (
            <Text className="text-red-500">{errors.collection.message}</Text>
          )}
        </View>

        <View className="flex flex-row items-center justify-between pb-20">
          <TouchableOpacity
            className="w-[45%] items-center justify-center rounded-[100px] border-b-2 border-violet-300 bg-violet-100 py-[18px]"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="shrink grow basis-0 text-center text-base font-bold leading-snug tracking-tight text-violet-600">
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[45%] items-center justify-center rounded-[100px] border-b-2 border-indigo-800 bg-indigo-700 py-[18px]">
            <Text className="shrink grow basis-0 text-center text-base font-bold leading-snug tracking-tight text-white">
              Add Question
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default CreateTestForm;

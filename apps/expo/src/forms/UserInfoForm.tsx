import { useForm } from "react-hook-form";
import {
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInfoSchema } from "@acme/schema/src/user";
import type { UserInfo } from "@acme/schema/src/types";
import type { FC } from "react";

interface Props {
  onSubmit: (data: UserInfo) => void;
}

const UserInfoForm: FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userInfoSchema),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="mt-8"
    >
      <ScrollView className="flex flex-col gap-4">
        <View className="flex flex-col gap-2">
          <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
            Full name
          </Text>
          <TextInput
            className="border-primary-1 border-b py-2"
            placeholder="Full Name"
            {...register("fullName")}
          />
        </View>
        <View className="flex flex-col gap-2">
          <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
            Date of Birth
          </Text>
          <TextInput
            className="border-primary-1 border-b py-2"
            placeholder="Full Name"
            {...register("fullName")}
          />
        </View>
        <View className="flex flex-col gap-2">
          <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
            Phone Number
          </Text>
          <TextInput
            className="border-primary-1 border-b py-2"
            placeholder="Full Name"
            {...register("fullName")}
          />
        </View>
        <View className="flex flex-col gap-2">
          <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
            Country
          </Text>
          <TextInput
            className="border-primary-1 border-b py-2"
            placeholder="Full Name"
            {...register("fullName")}
          />
        </View>
        <View className="flex flex-col gap-2">
          <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
            Age
          </Text>
          <TextInput
            className="border-primary-1 border-b py-2"
            placeholder="Full Name"
            {...register("fullName")}
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmit((data) => {
            onSubmit(data);
          })}
        >
          <View className="mt-5 mb-20 flex w-full flex-row items-center justify-center rounded-[100px] border-b-2 border-indigo-700 bg-violet-600 px-4 py-[18px]">
            <Text className="font-nunito-bold shrink grow basis-0 text-center text-base leading-snug tracking-tight text-white">
              Continue
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserInfoForm;

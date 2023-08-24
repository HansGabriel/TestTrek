import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInfoSchema } from "@acme/schema/src/user";
import CalendarIcon from "../icons/CalendarIcon";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { formatDate } from "../utils/helpers/date";

import type { UserInfo } from "@acme/schema/src/types";
import type { FC } from "react";

interface Props {
  onSubmit: (data: UserInfo) => void;
}

const userFormSchema = userInfoSchema.omit({
  dateOfBirth: true,
});

const UserInfoForm: FC<Props> = ({ onSubmit }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [show, setShow] = useState<boolean>(false);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate ?? date);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfo>({
    resolver: zodResolver(userFormSchema),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView className="mt-8 flex h-full flex-col">
        <View className="my-2 flex flex-col">
          <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
            Full name
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-primary-1 font-nunito-bold border-b py-2"
                placeholder="Full Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="fullName"
          />
          {errors.fullName && (
            <Text className="text-red-500">{errors.fullName.message}</Text>
          )}
        </View>

        <View className="my-2 flex flex-col">
          <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
            Date of Birth
          </Text>
          <TouchableOpacity onPress={showDatePicker}>
            <View className="border-primary-1 flex flex-row items-center justify-between border-b">
              <Text
                className={`font-nunito-semibold py-2 ${
                  date ? "text-neutral-800" : "text-gray-400"
                }`}
              >
                {date ? formatDate(date) : "Date of Birth"}
              </Text>
              <CalendarIcon />
            </View>
          </TouchableOpacity>
        </View>
        <Modal visible={show} animationType="slide" transparent={true}>
          <View className="my-auto mx-5 flex flex-col items-center justify-between rounded-xl bg-white px-4 py-2 shadow-lg">
            <DateTimePicker
              testID="dateTimePicker"
              value={date ? new Date(date) : new Date()}
              mode={"date"}
              onChange={onChange}
              display="inline"
            />
          </View>
        </Modal>
        <View className="my-2 flex flex-col">
          <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
            Phone Number
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-primary-1 border-b py-2"
                placeholder="Phone Number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="phoneNumber"
          />
          {errors.phoneNumber && (
            <Text className="text-red-500">{errors.phoneNumber.message}</Text>
          )}
        </View>
        <View className="my-2 flex flex-col">
          <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
            Country
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-primary-1 border-b py-2"
                placeholder="Country"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="country"
          />
          {errors.country && (
            <Text className="text-red-500">{errors.country.message}</Text>
          )}
        </View>
        <View className="my-2 flex flex-col">
          <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
            Age
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-primary-1 border-b py-2"
                placeholder="Age"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="age"
          />
          {errors.age && (
            <Text className="text-red-500">{errors.age.message}</Text>
          )}
        </View>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
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

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextInput, TouchableOpacity, View, Text, Modal } from "react-native";
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

const UserInfoForm: FC<Props> = ({ onSubmit }) => {
  const [show, setShow] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserInfo>({
    resolver: zodResolver(userInfoSchema),
  });

  const dateOfBirth = watch("dateOfBirth");

  const onChange = (
    event: DateTimePickerEvent,
    currentDate: Date | undefined,
  ) => {
    if (!currentDate) return;
    setShow(false);
    setValue("dateOfBirth", currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View>
      <View className="flex flex-col content-end justify-between">
        <View className="mt-8 flex flex-col">
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
                    dateOfBirth ? "text-neutral-800" : "text-gray-400"
                  }`}
                >
                  {dateOfBirth ? formatDate(dateOfBirth) : "Date of Birth"}
                </Text>
                <CalendarIcon />
              </View>
              {errors.dateOfBirth && (
                <Text className="text-red-500">
                  {errors.dateOfBirth.message}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="my-2 flex flex-col">
            <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
              School
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="border-primary-1 border-b py-2"
                  placeholder="School"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="school"
            />
            {errors.school && (
              <Text className="text-red-500">{errors.school.message}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity onPress={handleSubmit(onSubmit)} className="mt-40">
          <View className="mt-5 flex w-full flex-row items-center justify-center rounded-[100px] border-b-2 border-indigo-700 bg-violet-600 px-4 py-[18px]">
            <Text className="font-nunito-bold shrink grow basis-0 text-center text-base leading-snug tracking-tight text-white">
              Continue
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal visible={show} animationType="slide" transparent={true}>
        <View className="my-auto mx-5 flex flex-col items-center justify-between rounded-xl bg-white px-4 py-2 shadow-lg">
          <DateTimePicker
            testID="dateTimePicker"
            value={dateOfBirth ? new Date(dateOfBirth) : new Date()}
            mode={"date"}
            onChange={onChange}
            display="inline"
          />
        </View>
      </Modal>
    </View>
  );
};

export default UserInfoForm;

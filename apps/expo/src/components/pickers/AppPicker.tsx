import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import type { FC } from "react";
import type { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

export type LabelOption = {
  label: string;
  value: string | undefined;
};

type LableOptions = DropdownProps<LabelOption>["data"];

interface Props {
  options: LableOptions;
  label: string;
  placeholder: string;
  selectedValue: string | undefined;
  setSelectedValue: (value: LabelOption) => void;
  hasDefault?: boolean;
}

const AppPicker: FC<Props> = ({
  options,
  label,
  placeholder,
  selectedValue,
  setSelectedValue,
  hasDefault = false,
}) => {
  const defaultOption: LabelOption = {
    label: "None",
    value: undefined,
  };

  const labelOptions: LableOptions = hasDefault
    ? [defaultOption, ...options]
    : options;
  return (
    <View className="my-2 flex flex-col">
      <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
        {label}
      </Text>
      <Dropdown
        style={{
          borderBottomColor: "#6949FF",
          borderBottomWidth: 1,
        }}
        data={labelOptions}
        placeholder={placeholder}
        placeholderStyle={{
          color: "#9E9E9E",
          fontSize: 15,
          fontFamily: "Nunito-Bold",
          fontWeight: "bold",
        }}
        selectedTextStyle={{
          fontFamily: "Nunito-Bold",
        }}
        labelField="label"
        valueField="value"
        value={selectedValue}
        onChange={setSelectedValue}
      />
    </View>
  );
};
export default AppPicker;

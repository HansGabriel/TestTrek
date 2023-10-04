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
  labelMarginLeft?: string;
  dropDownTextMarginLeft?: number;
  borderBottomColor?: string;
}

const AppPicker: FC<Props> = ({
  options,
  label,
  placeholder,
  selectedValue,
  setSelectedValue,
  hasDefault = false,
  labelMarginLeft = "ml-0",
  dropDownTextMarginLeft = 0,
  borderBottomColor = "#6949FF",
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
      <Text
        className={`font-nunito-bold ml-3 text-base leading-snug tracking-tight text-neutral-800 ${labelMarginLeft}`}
      >
        {label}
      </Text>
      <Dropdown
        style={{
          borderBottomColor: borderBottomColor,
          borderBottomWidth: 1,
        }}
        data={labelOptions}
        placeholder={placeholder}
        placeholderStyle={{
          color: "#9E9E9E",
          fontSize: 15,
          fontFamily: "Nunito-Bold",
          fontWeight: "bold",
          marginLeft: dropDownTextMarginLeft,
        }}
        selectedTextStyle={{
          fontFamily: "Nunito-Bold",
          marginLeft: dropDownTextMarginLeft,
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

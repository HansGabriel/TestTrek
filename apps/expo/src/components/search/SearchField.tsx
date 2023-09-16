import React, { FC } from "react";

import { TouchableOpacity, View } from "react-native";
import { SearchBar } from "@rneui/themed";
import SearchIcon from "../../icons/SearchIcon";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import { SearchContent } from "./SearchContent";

interface FieldProps {
  searchString: string;
  onChange: (input: string) => void;
  onClose: () => void;
  clicked: boolean;
  setClicked: () => void;
}

export const SearchField: FC<FieldProps> = ({
  searchString,
  onChange,
  onClose,
  clicked,
  setClicked,
}) => {
  const fieldBgColor = clicked ? "rgb(237 233 254)" : "lightgray";
  const fieldBorderColor = clicked ? "rgba(105, 73, 255, 1)" : "lightgray";

  return (
    <View className="flex-1">
      <Animated.View
        entering={SlideInRight}
        exiting={SlideOutRight}
        className=" w-80 flex-row self-center"
      >
        <TouchableOpacity
          className="mr-3 w-[10%] items-center justify-center"
          onPress={onClose}
        >
          <LeftArrowIcon />
        </TouchableOpacity>

        <SearchBar
          onFocus={setClicked}
          onChangeText={onChange}
          value={searchString}
          placeholder={"Search tests or collections"}
          lightTheme={true}
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            width: "90%",
            borderWidth: 0,
            padding: 0,
            flex: 1,
            justifyContent: "center",
          }}
          inputContainerStyle={{
            borderRadius: 15,
            width: "100%",
            backgroundColor: fieldBgColor,
            borderBottomWidth: 1,
            borderWidth: 1,
            borderColor: fieldBorderColor,
          }}
          inputStyle={{
            color: "black",
          }}
          searchIcon={
            <View>
              <SearchIcon width={20} height={20} />
            </View>
          }
        />
      </Animated.View>
      {clicked ? (
        <View className="z-50 flex-1">
          <SearchContent query={searchString} />
        </View>
      ) : (
        ""
      )}
    </View>
  );
};

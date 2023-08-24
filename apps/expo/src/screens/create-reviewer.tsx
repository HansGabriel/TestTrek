import React from "react";

import { View, SafeAreaView, Text, TextInput } from "react-native";
import { AppButton } from "../components/AppButton";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";

const textHeaderStyle = "font-nunito-bold mt-4";
const textBoxStyle = "border-b border-violet-600 mt-3 text-lg font-nunito-bold";

export const CreateReviewer = () => {
  const publication = ["Only Me", "Public"];
  return (
    <SafeAreaView className="items-center">
      <View className="mt-5 h-56 w-80 items-center justify-center rounded-3xl border-2 border-violet-600">
        <FontAwesome name="image" size={48} color="rgba(105, 73, 255, 1)" />
        <Text className="font-nunito-bold mt-4 text-violet-600">
          Add Cover Image
        </Text>
      </View>
      <View className="w-80">
        <Text className={textHeaderStyle}>Title</Text>
        <TextInput
          placeholder="  Enter Reviewer Title"
          className={textBoxStyle}
        />
      </View>

      <View className="w-80">
        <Text className={textHeaderStyle}>Visible to</Text>
        <SelectDropdown
          renderDropdownIcon={() => (
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          )}
          buttonStyle={{
            width: "100%",
            backgroundColor: "rgb(245 245 244)",
            borderBottomColor: "rgb(124 58 237)",
            borderBottomWidth: 1,
          }}
          buttonTextStyle={{
            fontFamily: "Nunito-Bold",
            textAlign: "left",
          }}
          defaultButtonText="Only Me"
          dropdownIconPosition="right"
          data={publication}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
        />
      </View>
      <View className="w-80">
        <AppButton
          text="Create"
          buttonColor="rgba(62, 37, 177, 1)"
          borderRadius="full"
          marginTop={150}
        />
      </View>
    </SafeAreaView>
  );
};

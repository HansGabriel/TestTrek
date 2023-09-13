import React from "react";

import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AppButton } from "../components/AppButton";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import useGoBack from "../hooks/useGoBack";

const textHeaderStyle = "font-nunito-bold mt-4";
const textBoxStyle = "border-b border-violet-600 mt-3 text-lg font-nunito-bold";

export const CreateCollection = () => {
  const publication = ["Only Me", "Public"];
  const goBack = useGoBack();
  return (
    <SafeAreaView className="flex-1">
      <View className="my-10 mx-6 flex-row items-center space-x-4">
        <TouchableOpacity onPress={goBack}>
          <LeftArrowIcon />
        </TouchableOpacity>
        <Text className=" font-nunito-bold text-2xl">Create New Collection</Text>
      </View>
      <View className="items-center ">
        <View className="h-56 w-80 items-center justify-center rounded-3xl border-2 border-violet-600">
          <FontAwesome name="image" size={48} color="rgba(105, 73, 255, 1)" />
          <Text className="font-nunito-bold mt-4 text-violet-600">
            Add Cover Image
          </Text>
        </View>
        <View className="w-80">
          <Text className={textHeaderStyle}>Title</Text>
          <TextInput
            placeholder="  Enter Collection Title"
            className={textBoxStyle}
          />
        </View>

        <View className="w-80">
          <Text className={textHeaderStyle}>Visible to</Text>
          <SelectDropdown
            renderDropdownIcon={() => (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="black"
              />
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
        <View className="absolute h-[80%] w-[100%] border-b-2 border-zinc-100" />
        <AppButton
          text="Create"
          buttonColor="indigo-700"
          borderShadowColor="indigo-800"
          borderRadius="full"
        />
      </View>
    </SafeAreaView>
  );
};

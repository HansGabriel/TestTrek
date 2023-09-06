import { View, Text, TouchableOpacity } from "react-native";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import type { FC } from "react";
import { useNavigation } from "@react-navigation/native";

const SettingsHeader: FC = ({}) => {
  const navigation = useNavigation();
  return (
    <>
      <View className="pt-9">
        <View className="mx-6 flex flex-row justify-between bg-white py-5">
          <TouchableOpacity
            className="flex flex-row items-center gap-2"
            onPress={() => navigation.navigate("Profile")}
          >
            <LeftArrowIcon />
            <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default SettingsHeader;

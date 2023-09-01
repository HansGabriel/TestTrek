import { View, Text, TouchableOpacity } from "react-native";
import RightArrowIcon from "../../icons/RightArrowIcon";
import type { FC } from "react";
import { useNavigation } from "@react-navigation/native";

const DiscoverHomeHeader: FC = () => {
  const navigation = useNavigation();

  return (
    <View className="w-70 h-13 sticky top-2 z-50 mx-6 flex flex-row justify-between bg-white py-2">
      <View>
        <Text className="font-nunito-bold text-xl leading-[30px] text-neutral-800">
          Discover
        </Text>
      </View>
      <TouchableOpacity
        className="flex flex-row items-center gap-1"
        onPress={() => navigation.navigate("Discover")}
      >
        <Text className="font-nunito-bold w-70 text-right text-lg font-semibold leading-6 text-[#6949FF]">
          View All
        </Text>
        <RightArrowIcon />
      </TouchableOpacity>
    </View>
  );
};

export default DiscoverHomeHeader;

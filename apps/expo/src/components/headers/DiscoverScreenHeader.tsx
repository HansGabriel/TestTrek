import { View, Text, TouchableOpacity } from "react-native";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import SearchIcon from "../../icons/SearchIcon";
import type { FC } from "react";
import { useNavigation } from "@react-navigation/native";

const DiscoverScreenHeader: FC = ({}) => {
  const navigation = useNavigation();
  return (
    <>
      <View className="pt-8">
        <View className="mx-6 flex flex-row justify-between bg-white py-5">
          <TouchableOpacity
            className="flex flex-row items-center gap-2"
            onPress={() => navigation.navigate("Home")}
          >
            <LeftArrowIcon />
            <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
              Discover
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row gap-4">
            <SearchIcon />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default DiscoverScreenHeader;

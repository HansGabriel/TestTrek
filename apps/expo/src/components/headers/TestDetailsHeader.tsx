import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import XIcon from "../../icons/XIcon";
import StarIcon from "../../icons/StarIcon";
import EditIcon from "../../icons/EditIcon";

import type { FC } from "react";

const TestDetailsHeader: FC = ({}) => {
  const navigation = useNavigation();
  return (
    <>
      <View className="sticky top-9 z-50 mx-6 mb-10 flex flex-row justify-between bg-white py-5">
        <TouchableOpacity
          className="flex flex-row items-center gap-4"
          onPress={() => navigation.navigate("Home")}
        >
          <XIcon />
        </TouchableOpacity>
        <View className="flex flex-row items-center gap-4">
          <TouchableOpacity>
            <EditIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <StarIcon />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default TestDetailsHeader;

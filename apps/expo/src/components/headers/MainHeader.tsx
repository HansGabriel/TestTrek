import { View, Text, TouchableOpacity } from "react-native";

import TinyTestTrekIcon from "../../icons/logos/TinyTestTrekIcon";
import SearchIcon from "../../icons/SearchIcon";
import NotificationsIcon from "../../icons/NotificationsIcon";

import type { FC } from "react";

const MainHeader: FC = ({}) => {
  return (
    <>
      <View className="sticky top-0 z-50 mx-6 flex flex-row justify-between bg-white py-5">
        <View>
          <TouchableOpacity className="flex flex-row gap-4">
            <TinyTestTrekIcon />
            <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
              TestTrek
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-4">
          <TouchableOpacity>
            <SearchIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <NotificationsIcon />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default MainHeader;

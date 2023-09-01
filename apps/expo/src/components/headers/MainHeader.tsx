import { View, Text, TouchableOpacity } from "react-native";

import TinyTestTrekIcon from "../../icons/logos/TinyTestTrekIcon";
import SearchIcon from "../../icons/SearchIcon";
import NotificationsIcon from "../../icons/NotificationsIcon";

import type { FC } from "react";

const MainHeader: FC = ({}) => {
  return (
    <>
      <View className="sticky top-0 z-50 mx-6 flex flex-row justify-between bg-white py-5">
        <TouchableOpacity className="flex flex-row items-center gap-4">
          {/* Added items-center here */}
          <TinyTestTrekIcon />
          <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
            TestTrek
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row items-center gap-4">
          {/* Added items-center here for consistency */}
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

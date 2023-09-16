import { View, Text, TouchableOpacity } from "react-native";

import TinyTestTrekIcon from "../../icons/logos/TinyTestTrekIcon";
import SearchIcon from "../../icons/SearchIcon";
import NotificationsIcon from "../../icons/NotificationsIcon";

import { FC, useState } from "react";

import { SearchField } from "../search/SearchField";
import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";

const MainHeader: FC = ({}) => {
  const [query, setQuery] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const updateQuery = (input: string) => {
    setQuery(input);
  };

  const handlePressed = () => {
    setIsPressed(!isPressed);
    setIsClicked(false);
  };

  return (
    <View className="z-50">
      {isPressed ? (
        <View className="sticky z-50 mt-5 flex-row justify-between self-center bg-white">
          <SearchField
            searchString={query}
            onChange={updateQuery}
            onClose={() => setIsPressed(false)}
            clicked={isClicked}
            setClicked={() => setIsClicked(!isClicked)}
          />
        </View>
      ) : (
        <Animated.View
          className="sticky top-0 z-50 mx-6 mt-5 flex-row justify-between bg-white pb-2 pt-1"
          entering={SlideInLeft}
          exiting={SlideOutLeft}
        >
          <TouchableOpacity className="flex flex-row items-center gap-4">
            {/* Added items-center here */}
            <TinyTestTrekIcon />
            <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
              TestTrek
            </Text>
          </TouchableOpacity>

          <View className="flex flex-row items-center gap-4">
            {/* Added items-center here for consistency */}
            <TouchableOpacity onPress={handlePressed}>
              <SearchIcon />
            </TouchableOpacity>
            <TouchableOpacity>
              <NotificationsIcon />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default MainHeader;

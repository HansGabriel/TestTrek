import { View, Text, TouchableOpacity } from "react-native";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import SearchIcon from "../../icons/SearchIcon";
import { useState, type FC } from "react";

import useGoBack from "../../hooks/useGoBack";
import { SearchField } from "../search/SearchField";

interface Props {
  title?: string;
  viewAllScreenType?: "test" | "user" | "collection" | "reviewer";
  displaySearchBar?: boolean;
}

const ViewAllScreenHeader: FC<Props> = ({
  displaySearchBar = true,
  ...props
}) => {
  const goBack = useGoBack();
  const [query, setQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const updateQuery = (input: string) => {
    setQuery(input);
  };

  const openSearchBar = () => {
    setIsSearchVisible(true);
  };

  const closeSearchBar = () => {
    setIsSearchVisible(false);
  };

  return (
    <>
      {isSearchVisible ? (
        <View className="sticky z-50 flex flex-row justify-between bg-white py-5">
          <SearchField
            searchString={query}
            onChange={updateQuery}
            onClose={closeSearchBar}
            clicked={isSearchVisible}
            setClicked={() => setIsSearchVisible(true)}
            currentViewAllScreen={props.viewAllScreenType}
          />
        </View>
      ) : (
        <View className="sticky z-50 mx-3 flex flex-row justify-between bg-white py-5">
          <View className="flex-row self-center">
            <TouchableOpacity
              className="flex flex-row items-center gap-2 self-center"
              onPress={goBack}
            >
              <LeftArrowIcon />
              <Text
                className="font-nunito-bold w-4/5 text-2xl leading-[38.40px] text-neutral-800"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {props.title}
              </Text>
            </TouchableOpacity>
          </View>
          {displaySearchBar && (
            <TouchableOpacity className="self-center" onPress={openSearchBar}>
              <SearchIcon />
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
};

export default ViewAllScreenHeader;

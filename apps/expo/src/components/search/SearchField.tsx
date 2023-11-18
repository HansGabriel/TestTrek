import React, { FC, useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { SearchBar } from "@rneui/themed";
import SearchIcon from "../../icons/SearchIcon";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import { SearchContent } from "./SearchContent";
import { trpc } from "../../utils/trpc";
import { debounce } from "lodash";

interface FieldProps {
  searchString: string;
  onChange: (input: string) => void;
  onClose: () => void;
  clicked: boolean;
  setClicked: () => void;
}

export const SearchField: FC<FieldProps> = ({
  searchString,
  onChange,
  onClose,
  clicked,
  setClicked,
}) => {
  const fieldBgColor = clicked ? "rgb(237 233 254)" : "lightgray";
  const fieldBorderColor = clicked ? "rgba(105, 73, 255, 1)" : "lightgray";

  const [debouncedQuery, setDebouncedQuery] = useState(searchString);

  const { data: hits } = trpc.algolia.algoliaSearch.useQuery(
    [
      { indexName: "tests", query: debouncedQuery },
      { indexName: "users", query: debouncedQuery },
      { indexName: "collections", query: debouncedQuery },
      { indexName: "reviewers", query: debouncedQuery },
    ],
    {
      enabled: debouncedQuery.length > 0,
    },
  );

  const debouncedOnChange = useCallback(
    debounce((query: string) => setDebouncedQuery(query), 500),
    [],
  );

  useEffect(() => {
    debouncedOnChange(searchString);
  }, [searchString, debouncedOnChange]);

  return (
    <View className="flex-1">
      <Animated.View
        entering={SlideInRight}
        exiting={SlideOutRight}
        className="w-[90%] flex-row self-center"
      >
        <TouchableOpacity
          className="mr-1 w-[10%] items-center justify-center"
          onPress={onClose}
        >
          <LeftArrowIcon />
        </TouchableOpacity>

        <SearchBar
          onFocus={setClicked}
          onChangeText={onChange}
          value={searchString}
          placeholder={"Search"}
          lightTheme={true}
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            width: "80%", // Adjusted width
            borderWidth: 0,
            padding: 0,
            flex: 1,
            justifyContent: "center",
          }}
          inputContainerStyle={{
            borderRadius: 15,
            width: "100%",
            backgroundColor: fieldBgColor,
            borderBottomWidth: 1,
            borderWidth: 1,
            borderColor: fieldBorderColor,
          }}
          inputStyle={{
            color: "black",
          }}
          searchIcon={
            <View>
              <SearchIcon width={20} height={20} />
            </View>
          }
        />
      </Animated.View>
      {/* Don't remove this. This is for displaying search contents */}

      {clicked ? (
        <View className="z-50 flex-1">
          <SearchContent
            query={searchString}
            results={
              hits || { tests: [], users: [], collections: [], reviewers: [] }
            }
          />
        </View>
      ) : (
        ""
      )}
    </View>
  );
};

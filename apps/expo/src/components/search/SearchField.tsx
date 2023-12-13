import React, { FC, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { SearchBar } from "@rneui/themed";
import SearchIcon from "../../icons/SearchIcon";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import { SearchContent } from "./SearchContent";
import { trpc } from "../../utils/trpc";

interface FieldProps {
  searchString: string;
  onChange: (input: string) => void;
  onClose: () => void;
  clicked: boolean;
  setClicked: () => void;
  filterByCurrentUser?: boolean;
  currentViewAllScreen?: "test" | "user" | "collection" | "reviewer";
  includedCategories?: string[];
}

export const SearchField: FC<FieldProps> = ({
  searchString,
  onChange,
  onClose,
  clicked,
  setClicked,
  filterByCurrentUser = false,
  currentViewAllScreen,
  includedCategories,
}) => {
  const fieldBgColor = clicked ? "rgb(237 233 254)" : "lightgray";
  const fieldBorderColor = clicked ? "rgba(105, 73, 255, 1)" : "lightgray";

  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(searchString);
  const [selectedCategories, setSelectedCategories] = useState({
    tests: false,
    users: false,
    collections: false,
    reviewers: false,
  });

  const { data: currentUser } = trpc.user.getUserDetails.useQuery();
  const currentUserId = filterByCurrentUser ? currentUser?.userId : undefined;

  const toggleCategory = (category: string | number) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category as keyof typeof prev]: !prev[category as keyof typeof prev],
    }));
  };

  const isAnyCategorySelected = Object.values(selectedCategories).some(
    (value) => value,
  );

  const searchQueries = Object.entries(selectedCategories)
    .filter(([category, isSelected]) => {
      return (
        (isSelected || !isAnyCategorySelected) &&
        !(currentUserId && category === "users")
      );
    })
    .map(([category]) => ({
      indexName: category,
      query: query,
    }));

  const algoliaQueriesWithUserFilter = {
    details: searchQueries,
    filterBySignedUser: filterByCurrentUser,
  };

  const { data: hits, isLoading: queryLoading } =
    trpc.algolia.algoliaSearch.useQuery(algoliaQueriesWithUserFilter, {
      enabled: query.length > 0,
    });

  useEffect(() => {
    setIsLoading(queryLoading);
  }, [queryLoading]);

  const handleSearchSubmit = () => {
    setQuery(searchString);
  };

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
          onSubmitEditing={handleSearchSubmit}
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
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            fixedTypeFilter={currentViewAllScreen}
            isLoading={isLoading}
            includedCategories={includedCategories}
          />
        </View>
      ) : (
        ""
      )}
    </View>
  );
};

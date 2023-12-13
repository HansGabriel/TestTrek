import React, { FC } from "react";

import { TouchableOpacity, View } from "react-native";

import { FlashList } from "@shopify/flash-list";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
import TestSearchCard from "./search-cards/TestSearchCard";
import UserSearchCard from "./search-cards/UserSearchCard";
import CollectionSearchCard from "./search-cards/CollectionSearchCard";
import ReviewerSearchCard from "./search-cards/ReviewerSearchCard";
import { Text } from "react-native";
import {
  CompiledAlgoliaHits,
  ReturnedAlgoliaCollections,
  ReturnedAlgoliaReviewers,
  ReturnedAlgoliaTests,
  ReturnedAlgoliaUsers,
} from "../../types/algoliaTypes";
import { useNavigation } from "@react-navigation/native";

interface ContentProps {
  query: string;
  results: CompiledAlgoliaHits;
  selectedCategories: { [key: string]: boolean };
  toggleCategory: (category: string) => void;
  fixedTypeFilter?: "test" | "user" | "collection" | "reviewer";
  isLoading: boolean;
  includedCategories?: string[];
}

interface CombinedItem {
  type: "test" | "user" | "collection" | "reviewer";
  data:
    | ReturnedAlgoliaTests
    | ReturnedAlgoliaUsers
    | ReturnedAlgoliaCollections
    | ReturnedAlgoliaReviewers;
}

const categoryDisplayNames = {
  tests: "Tests",
  users: "Trekkers",
  collections: "Collections",
  reviewers: "Reviewers",
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const SearchContent: FC<ContentProps> = ({
  results,
  selectedCategories,
  toggleCategory,
  fixedTypeFilter,
  isLoading,
  includedCategories,
}) => {
  const navigation = useNavigation();

  const combinedItems: CombinedItem[] = [
    ...(results.tests.length > 0
      ? results.tests.map(
          (item): CombinedItem => ({ type: "test", data: item }),
        )
      : []),
    ...(results.users.length > 0
      ? results.users.map(
          (item): CombinedItem => ({ type: "user", data: item }),
        )
      : []),
    ...(results.collections.length > 0
      ? results.collections.map(
          (item): CombinedItem => ({ type: "collection", data: item }),
        )
      : []),
    ...(results.reviewers.length > 0
      ? results.reviewers.map(
          (item): CombinedItem => ({ type: "reviewer", data: item }),
        )
      : []),
  ];

  let filteredResults = combinedItems;
  if (fixedTypeFilter) {
    filteredResults = combinedItems.filter(
      (item) => item.type === fixedTypeFilter,
    );
  }

  const goToTestDetailsScreen = (testId: string) => {
    navigation.navigate("TestDetails", {
      testId,
    });
  };

  const goToOthersProfileScreen = (userId: string) => {
    navigation.navigate("OthersProfile", { userId });
  };

  const goToCollectionDetailsScreen = (collectionId: string) => {
    navigation.navigate("CollectionDetails", { collectionId });
  };

  const goToReviewerDetailsScreen = (reviewerId: string) => {
    navigation.navigate("ReviewerDetails", { reviewerId });
  };

  const renderItem = ({ item }: { item: CombinedItem }) => {
    switch (item.type) {
      case "test":
        return (
          <TouchableOpacity
            onPress={() =>
              goToTestDetailsScreen((item.data as ReturnedAlgoliaTests).id)
            }
          >
            <TestSearchCard {...(item.data as ReturnedAlgoliaTests)} />
          </TouchableOpacity>
        );
      case "user":
        return (
          <TouchableOpacity
            onPress={() => goToOthersProfileScreen(item.data.id)}
          >
            <UserSearchCard {...(item.data as ReturnedAlgoliaUsers)} />
          </TouchableOpacity>
        );
      case "collection":
        return (
          <TouchableOpacity
            onPress={() => goToCollectionDetailsScreen(item.data.id)}
          >
            <CollectionSearchCard
              {...(item.data as ReturnedAlgoliaCollections)}
            />
          </TouchableOpacity>
        );
      case "reviewer":
        return (
          <TouchableOpacity
            onPress={() => goToReviewerDetailsScreen(item.data.id)}
          >
            <ReviewerSearchCard {...(item.data as ReturnedAlgoliaReviewers)} />
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  const categoryButtons = Object.keys(selectedCategories)
    .filter(
      (category) =>
        !includedCategories || includedCategories.includes(category),
    )
    .map((category) => (
      <TouchableOpacity
        key={category}
        onPress={() => toggleCategory(category)}
        className="m-1"
      >
        <View
          className={`items-center justify-center rounded-lg 
                    ${
                      selectedCategories[category]
                        ? "border-violet-600 bg-violet-600"
                        : "border-gray-400 bg-gray-400"
                    } 
                    border-2`}
        >
          <Text className="font-nunito-semibold text-s m-1 mx-2 text-white">
            {categoryDisplayNames[
              category as keyof typeof categoryDisplayNames
            ] || capitalizeFirstLetter(category)}
          </Text>
        </View>
      </TouchableOpacity>
    ));

  return (
    <View>
      <Animated.View
        className=" sticky min-h-screen w-[100%] flex-1 self-center bg-white"
        entering={SlideOutUp.withInitialValues({ originY: -100 })}
        exiting={SlideInUp.withInitialValues({ originY: -100 })}
      >
        <View>
          <View className="my-3 border border-zinc-100" />
        </View>
        {!fixedTypeFilter && (
          <View
            className="w-[90%] self-center"
            style={{
              flexDirection: "row",
              justifyContent: "center",
              padding: 5,
            }}
          >
            {categoryButtons}
          </View>
        )}
        {!isLoading && filteredResults.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 16, color: "gray" }}>
              No Search Results Found
            </Text>
          </View>
        ) : (
          <FlashList
            data={filteredResults}
            renderItem={renderItem}
            estimatedItemSize={100}
            keyExtractor={(item, index) => `${item.type}-${index}`}
          />
        )}
      </Animated.View>
    </View>
  );
};

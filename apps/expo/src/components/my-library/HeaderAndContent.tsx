import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FC, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackendTabPage } from "../../types/libraryTypes";
import { trpc } from "../../utils/trpc";
import { CollectionTabContent } from "../my-collections/CollectionTabContent";
import { AddButton } from "../buttons/AddButton";
import { LibraryTabs } from "./LibraryTabs";

interface HeaderProps {
  tab: BackendTabPage;
  tabType: string;
}

const sortObject = [
  {
    sortName: "newest",
    icon: (
      <FontAwesome5
        name="sort-amount-down-alt"
        size={24}
        color="rgba(105, 73, 255, 1)"
      />
    ),
  },
  {
    sortName: "oldest",
    icon: (
      <FontAwesome5
        name="sort-amount-up"
        size={24}
        color="rgba(105, 73, 255, 1)"
      />
    ),
  },
  {
    sortName: "alphabetical",
    icon: (
      <FontAwesome5
        name="sort-alpha-down"
        size={24}
        color="rgba(105, 73, 255, 1)"
      />
    ),
  },
];

export const HeaderAndContent: FC<HeaderProps> = ({ tab, tabType }) => {
  const [sortType, setSortType] = useState<
    "newest" | "oldest" | "alphabetical"
  >("newest");

  const { data: testData } = trpc.testFilter.getAll.useQuery({
    testType: tab,
    sortBy: sortType,
  });

  const { data: collectionData } = trpc.collection.getByUserId.useQuery({
    sortBy: sortType,
  });

  const sortItems = () => {
    let nextSortType: "newest" | "oldest" | "alphabetical";

    switch (sortType) {
      case "newest":
        nextSortType = "oldest";
        break;
      case "oldest":
        nextSortType = "alphabetical";
        break;
      case "alphabetical":
        nextSortType = "newest";
        break;
      default:
        nextSortType = "newest";
    }

    setSortType(nextSortType);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="mb-4 mt-1 w-full flex-row items-end justify-between">
        <View className="mx-4">
          <Text className=" font-nunito-bold text-xl">
            {tabType === "Test" ? testData?.length : collectionData?.length}{" "}
            {tab === "user"
              ? tabType === "Collection"
                ? "Collections"
                : "Tests"
              : tab === "favorite"
              ? "Favorites"
              : tab === "other"
              ? "Other Tests"
              : ""}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            className="mx-2.5 flex-row gap-2"
            onPress={sortItems}
          >
            <Text className=" font-nunito-bold text-xl capitalize text-violet-600">
              {sortType}
            </Text>
            {sortObject.map((item, index) => {
              if (sortType === item.sortName) {
                return <View key={index}>{item.icon}</View>;
              }
            })}
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-1">
        {tabType === "Test" ? (
          <LibraryTabs tabData={testData} />
        ) : (
          <View className="flex-1">
            <CollectionTabContent tabData={collectionData} />
            <View className="z-50 -mt-12 h-14 w-14 items-center self-end">
              <AddButton screen={"CreateCollection"} />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

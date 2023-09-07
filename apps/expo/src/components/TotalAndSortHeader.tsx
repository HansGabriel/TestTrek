import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { FC } from "react";

interface Props {
  total?: number;
  tab: "Tests" | "Favorites" | "Other Tests" | "Collections";
  filter: "newest" | "oldest" | "alphabetical";
}

export const TotalAndSortHeader: FC<Props> = ({ total, tab, filter }) => {
  return (
    <View className="mt-4 w-full flex-row items-end justify-between">
      <View>
        <Text className=" font-nunito-bold text-xl">
          {total} {tab}
        </Text>
      </View>
      <View className="flex-row gap-2">
        <Text className=" font-nunito-bold text-xl capitalize text-violet-600">
          {filter}
        </Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="sort"
            size={26}
            color={"rgba(105, 73, 255, 1)"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

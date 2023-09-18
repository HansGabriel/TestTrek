import { Collection } from "@prisma/client";
import { FC } from "react";
import { View, Text } from "react-native";

import { CollectionsTab } from "./Collections";

interface Props {
  tabData?: Collection[];
}

export const CollectionTabContent: FC<Props> = ({ tabData }) => {
  return tabData ? (
    <View className="flex-1">
      <CollectionsTab tabData={tabData} />
    </View>
  ) : (
    <View className="flex-1 items-center justify-center">
      <Text>Empty Section</Text>
    </View>
  );
};

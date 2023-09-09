import { Test } from ".prisma/client";
import { View, Text } from "react-native";
import { LibraryTabs } from "./LibraryTabs";

interface ContentProps {
  tabData?: Test[];
}

export const TabContent = ({ tabData }: ContentProps) => {
  return tabData?.length !== 0 ? (
    <View className="flex-1">
      <LibraryTabs tabData={tabData} />
    </View>
  ) : (
    <View className="flex-1 items-center justify-center">
      <Text>Empty Section</Text>
    </View>
  );
};

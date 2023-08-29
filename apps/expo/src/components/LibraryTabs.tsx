import React, { ReactNode } from "react";

import { View, SafeAreaView, Text } from "react-native";

interface LibraryTabProps {
  tabName: string;
  component?: ReactNode;
}

export const LibraryTabs = ({ tabName }: LibraryTabProps) => {
  return (
    <SafeAreaView>
      <View>
        <Text>{tabName}</Text>
      </View>
    </SafeAreaView>
  );
};

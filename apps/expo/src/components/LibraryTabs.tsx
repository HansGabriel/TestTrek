import React, { ReactNode } from "react";
import type { FC } from "react";

import { View, SafeAreaView, Text } from "react-native";

interface Props {
  tabName: string;
  component?: ReactNode;
}

export const LibraryTabs: FC<Props> = ({ tabName }) => {
  return (
    <SafeAreaView>
      <View>
        <Text>{tabName}</Text>
      </View>
    </SafeAreaView>
  );
};

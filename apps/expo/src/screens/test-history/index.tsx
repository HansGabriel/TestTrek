import { Text, View } from "react-native";
import { RootStackScreenProps } from "../../types";

import type { FC } from "react";

type TestHistoryProps = RootStackScreenProps<"TestHistory">;

export const TestHistoryScreen: FC<TestHistoryProps> = ({
  navigation,
  route,
}) => {
  const { testId } = route.params;

  const goToScoreBoard = () => {
    navigation.navigate("Scoreboard", {
      testId: testId,
    });
  };

  return (
    <View>
      <Text>Test History</Text>
      <Text>{testId}</Text>
    </View>
  );
};

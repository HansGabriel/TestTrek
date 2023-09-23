import { View, Text } from "react-native";
import { trpc } from "../../utils/trpc";

import type { FC } from "react";
import type { RootStackScreenProps } from "../../types";

export const PlayTestScreen: FC<RootStackScreenProps<"PlayTest">> = ({
  route,
}) => {
  const { testId } = route.params;

  const { data: testDetails } = trpc.play.getTest.useQuery({ testId });

  if (!testDetails) {
    return <></>;
  }

  console.log(testDetails);

  return (
    <View>
      <Text>PlayTestScreen</Text>
    </View>
  );
};

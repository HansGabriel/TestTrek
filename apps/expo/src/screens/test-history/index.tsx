import { View, SafeAreaView, Dimensions } from "react-native";
import { RootStackScreenProps } from "../../types";
import { FlashList } from "@shopify/flash-list";
import QuestionCard from "../../components/cards/QuestionCard";
import { ReusableHeader } from "../../components/headers/ReusableHeader";
import { Feather } from "@expo/vector-icons";
import { trpc } from "../../utils/trpc";
import { AppButton } from "../../components/buttons/AppButton";

import type { FC } from "react";

type TestHistoryProps = RootStackScreenProps<"TestHistory">;

export const TestHistoryScreen: FC<TestHistoryProps> = ({
  navigation,
  route,
}) => {
  const { height, width } = Dimensions.get("window");
  const { testId } = route.params;

  const { data: testHistory, isLoading: isFetchingUser } =
    trpc.testHistory.getUserHistoryById.useQuery({
      historyId: testId,
    });

  const goToScoreBoard = () => {
    navigation.navigate("Scoreboard", {
      testId: testId,
    });
  };

  return (
    <SafeAreaView
      style={{
        height: height,
        width: width,
      }}
    >
      <ReusableHeader
        screenName="Test History"
        backIcon={<Feather name="x" size={24} color="black" />}
      />
      <View className="mx-5 h-full flex-1">
        <FlashList
          estimatedItemSize={10}
          data={testHistory?.questions ?? []}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: question, index }) => {
            return <QuestionCard question={question} index={index} />;
          }}
        />
      </View>
      <View className="mb-4 mt-10 w-[90%] flex-row items-center justify-evenly self-center">
        <AppButton
          text="Go to Scoreboard"
          buttonColor="violet-600"
          borderShadowColor="indigo-800"
          borderRadius="full"
          fontStyle="bold"
          textColor="white"
          TOwidth="full"
          Vwidth="full"
          Vheight="10"
          onPress={goToScoreBoard}
          isLoading={isFetchingUser}
        />
      </View>
    </SafeAreaView>
  );
};

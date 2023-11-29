import { View, SafeAreaView, Dimensions, Alert } from "react-native";
import { RootStackScreenProps } from "../../types";
import { FlashList } from "@shopify/flash-list";
import QuestionCard from "../../components/cards/QuestionCard";
import { ReusableHeader } from "../../components/headers/ReusableHeader";
import { Feather } from "@expo/vector-icons";
import { trpc } from "../../utils/trpc";
import { AppButton } from "../../components/buttons/AppButton";
import useGoBack from "../../hooks/useGoBack";

import type { FC } from "react";

type TestHistoryProps = RootStackScreenProps<"TestHistory">;

export const TestHistoryScreen: FC<TestHistoryProps> = ({
  navigation,
  route,
}) => {
  const { height, width } = Dimensions.get("window");
  const { historyId, testId } = route.params;
  const goBack = useGoBack();

  const { data: testHistory, isLoading: isFetchingUser } =
    trpc.testHistory.getUserHistoryById.useQuery({
      historyId,
    });

  const goToScoreBoard = () => {
    if (!testId) return;
    navigation.navigate("Scoreboard", {
      testId,
    });
  };

  const goToHome = () => {
    Alert.alert(
      "Skip Scoreboard",
      "Are you sure you want to skip the scoreboard?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            navigation.navigate("Home");
          },
        },
      ],
      { cancelable: false },
    );
  };

  const goToQuestionHistory = (questionId: string) => () => {
    navigation.navigate("QuestionHistory", {
      questionId: questionId,
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
        handleExit={testId ? goToHome : goBack}
      />
      <View className="mx-5 h-full flex-1">
        <FlashList
          estimatedItemSize={10}
          data={testHistory?.questions ?? []}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: question, index }) => {
            return (
              <QuestionCard
                question={question}
                index={index}
                type="history"
                goToQuestionHistory={goToQuestionHistory}
              />
            );
          }}
        />
      </View>
      {testId && (
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
      )}
    </SafeAreaView>
  );
};

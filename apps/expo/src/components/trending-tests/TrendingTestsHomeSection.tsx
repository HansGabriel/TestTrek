import * as React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import HomeTestDisplayCard from "../HomeTestDisplayCard";
import SectionHeader from "../headers/SectionHeader";
import { IMAGE_PLACEHOLDER } from "../../constants";
import type { FC } from "react";
import { trpc } from "../../utils/trpc";
import { useNavigation } from "@react-navigation/native";

const TrendingTestsHomeSection: FC = () => {
  const { data: trendingTests } = trpc.test.getTrendingTests.useQuery({
    amountOfTests: 5,
  });

  const navigation = useNavigation();

  const goToTestDetailsScreen = (testId: string) => () => {
    navigation.navigate("TestDetails", {
      testId,
    });
  };

  if (!trendingTests) {
    return <></>;
  }

  return (
    <View>
      <SectionHeader
        title="Trending Tests"
        hasViewAll={true}
        onViewAllPress={() => {
          navigation.navigate("ViewAll", { fetchedData: "trendingTests" });
        }}
      />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={trendingTests}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={goToTestDetailsScreen(item.id)}>
            <HomeTestDisplayCard
              imageSource={{ uri: item.imageUrl }}
              title={item.title}
              questions={item.questions.length}
              date={new Date(item.createdAt)}
              plays={0}
              userImageSource={{
                uri: item.user.imageUrl ?? IMAGE_PLACEHOLDER,
              }}
              userName={`${item.user.firstName} ${item.user.lastName}`}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TrendingTestsHomeSection;

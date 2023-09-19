import * as React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import HomeTestDisplayCard from "../HomeTestDisplayCard";
import SectionHeader from "../headers/SectionHeader";
import { getFullName } from "@acme/utils/src/strings";
import { IMAGE_PLACEHOLDER } from "../../constants";
import type { FC } from "react";
import { trpc } from "../../utils/trpc";
import { useNavigation } from "@react-navigation/native";

const TrendingTestsHomeSection: FC = () => {
  const { data: trendingTests } = trpc.test.getTrendingTests.useQuery();

  const navigation = useNavigation();

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
        data={trendingTests.map((test) => ({
          imageSource: test.imageUrl,
          title: test.title,
          date: test.createdAt,
          plays: test.title.length,
          userImageSource: test.user.imageUrl,
          userName: getFullName(test.user.firstName, test.user.lastName),
        }))}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <HomeTestDisplayCard
              imageSource={{ uri: item.imageSource }}
              title={item.title}
              questions={item.title.length}
              date={new Date(item.date)}
              plays={item.plays}
              userImageSource={{
                uri: item.userImageSource ?? IMAGE_PLACEHOLDER,
              }}
              userName={item.userName}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TrendingTestsHomeSection;

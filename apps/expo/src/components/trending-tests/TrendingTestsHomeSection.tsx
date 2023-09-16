import * as React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import TrendingTestsHomeCard from "./TrendingTestsHomeCard";
import TrendingTestsHomeHeader from "../headers/TrendingTestsHomeHeader";
import { getFullName } from "@acme/utils/src/strings";
import { IMAGE_PLACEHOLDER } from "../../constants";
import type { FC } from "react";
import { trpc } from "../../utils/trpc";

const TrendingTestsHomeSection: FC = () => {
  const { data: trendingTests } = trpc.test.getTrendingTests.useQuery();

  if (!trendingTests) {
    return <></>;
  }

  return (
    <View>
      <TrendingTestsHomeHeader />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={trendingTests.map((test) => ({
          imageSource: test.imageUrl,
          title: test.title,
          q: test.title.length,
          date: test.createdAt,
          plays: test.title.length,
          userImageSource: test.user.imageUrl,
          userName: getFullName(test.user.firstName, test.user.lastName),
        }))}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <TrendingTestsHomeCard
              imageSource={item.imageSource}
              title={item.title}
              q={item.q}
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

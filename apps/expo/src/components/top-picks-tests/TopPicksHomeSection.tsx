import * as React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import HomeTestDisplayCard from "../HomeTestDisplayCard";
import SectionHeader from "../headers/SectionHeader";
import type { FC } from "react";
import { trpc } from "../../utils/trpc";
import { getFullName } from "@acme/utils/src/strings";
import { IMAGE_PLACEHOLDER } from "../../constants";

const TopPicksHomeSection: FC = () => {
  const { data: topPicksTest } = trpc.test.getTopPicks.useQuery();

  if (!topPicksTest) {
    return <></>;
  }

  return (
    <View>
      <SectionHeader title="Top Picks" hasViewAll={true} />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={topPicksTest.map((test) => ({
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
            <HomeTestDisplayCard
              imageSource={{ uri: item.imageSource }}
              title={item.title}
              questions={item.title.length}
              date={new Date(item.date)}
              plays={item.plays}
              userImageSource={{
                uri: "https://example.com/dummy-image.jpg" ?? IMAGE_PLACEHOLDER,
              }}
              userName={item.userName}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TopPicksHomeSection;

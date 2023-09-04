import * as React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import DiscoverHomeCard from "./DiscoverHomeCard";
import DiscoverHomeHeader from "../headers/DiscoverHomeHeader";

import type { FC } from "react";
import type { RouterOutputs } from "../../utils/trpc";
import type { Card } from "../../temp-data/discover/discoverCardList";

interface Props {
  tests: RouterOutputs["test"]["getAll"];
}

const DiscoverHomeSection: FC<Props> = ({ tests }) => {
  const discoverCardList: Card[] = tests.map((test) => ({
    imageSource: require(test.imageUrl),
    date: test.createdAt,
    plays: 10,
    q: 10,
    title: test.title,
    userImageSource: require("../../temp-data/discover/discover-images/user-image/user-image1.png"),
    userName: "user 1",
  }));

  return (
    <View>
      <DiscoverHomeHeader />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {discoverCardList.map((card, index) => (
          <TouchableOpacity key={index}>
            <DiscoverHomeCard {...card} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default DiscoverHomeSection;

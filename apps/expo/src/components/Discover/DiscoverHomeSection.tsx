import * as React from "react";
import { View, ScrollView } from "react-native";
import DiscoverHomeCard from "./DiscoverHomeCard";
import DiscoverHomeHeader from "../headers/DiscoverHomeHeader";
import discoverCardList from "../../temp-data/discover/discoverCardList";

import type { FC } from "react";
import type { RouterOutputs } from "../../utils/trpc";

interface Props {
  tests: RouterOutputs["test"]["getAll"];
}

const DiscoverHomeSection: FC<Props> = ({ tests }) => {
  console.log(tests);
  return (
    <View>
      <DiscoverHomeHeader />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {discoverCardList.map((card, index) => (
          <DiscoverHomeCard key={index} {...card} />
        ))}
      </ScrollView>
    </View>
  );
};

export default DiscoverHomeSection;

import * as React from "react";
import { View } from "react-native";
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
      {discoverCardList.map((card, index) => (
        <DiscoverHomeCard key={index} {...card} />
      ))}
    </View>
  );
};

export default DiscoverHomeSection;

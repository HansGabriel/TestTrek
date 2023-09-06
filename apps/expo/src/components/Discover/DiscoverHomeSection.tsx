import * as React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import DiscoverHomeCard from "./DiscoverHomeCard";
import DiscoverHomeHeader from "../headers/DiscoverHomeHeader";
import discoverCardList from "../../temp-data/discover/discoverCardList";

import type { FC } from "react";
import type { RouterOutputs } from "../../utils/trpc";

interface Props {
  tests?: RouterOutputs["test"]["getAll"];
}

const DiscoverHomeSection: FC<Props> = ({ tests }) => {
  return (
    <View>
      <DiscoverHomeHeader />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={discoverCardList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <DiscoverHomeCard {...item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DiscoverHomeSection;

import { View, FlatList, TouchableOpacity } from "react-native";
import TopCollectionsHomeHeader from "../headers/TopCollectionsHomeHeader";
import TopCollectionsHomeCard from "./TopCollectionsHomeCard";
import { collectionData } from "../../temp-data/library-tab-contents/collectionTestData";

import type { FC } from "react";

const TopCollectionsHomeSection: FC = () => {
  return (
    <View>
      <TopCollectionsHomeHeader />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={collectionData}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <TopCollectionsHomeCard imageSource={item.image} name={item.name} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TopCollectionsHomeSection;

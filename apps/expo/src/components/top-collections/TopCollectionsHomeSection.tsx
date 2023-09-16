import { View, FlatList, TouchableOpacity } from "react-native";
import TopCollectionsHomeHeader from "../headers/TopCollectionsHomeHeader";
import TopCollectionsHomeCard from "./TopCollectionsHomeCard";

import type { FC } from "react";
import { trpc } from "../../utils/trpc";

const TopCollectionsHomeSection: FC = () => {
  const { data: topCollections } = trpc.collection.getTopCollections.useQuery();

  if (!topCollections) {
    return <></>;
  }

  return (
    <View>
      <TopCollectionsHomeHeader />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={topCollections.map((collection) => ({
          id: collection.id,
          imageSource: collection.imageUrl,
          title: collection.title,
        }))}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <TopCollectionsHomeCard
              imageSource={item.imageSource}
              title={item.title}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TopCollectionsHomeSection;

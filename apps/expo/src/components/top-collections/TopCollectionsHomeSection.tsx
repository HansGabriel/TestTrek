import { View, FlatList, TouchableOpacity } from "react-native";
import TopCollectionsHomeHeader from "../headers/TopCollectionsHomeHeader";

import type { FC } from "react";

const TopTrekersHomeSection: FC = () => {
  return (
    <View>
      <TopCollectionsHomeHeader />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={topTrekersList}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <TopTrekersHomeCard
              imageSource={item.imageSource}
              name={item.name}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TopTrekersHomeSection;

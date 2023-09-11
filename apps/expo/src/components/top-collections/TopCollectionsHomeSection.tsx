import { View, FlatList, TouchableOpacity } from "react-native";
import TopCollectionsHomeHeader from "../headers/TopCollectionsHomeHeader";
import { LibraryTabs } from "../LibraryTabs";

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
            <LibraryTabs imageSource={item.imageSource} name={item.name} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TopTrekersHomeSection;

import { View, FlatList, TouchableOpacity } from "react-native";
import TopTrekersHomeHeader from "../headers/TopTrekersHomeHeader";
import TopTrekersHomeCard from "./TopTrekersHomeCard";
import topTrekersList from "../../temp-data/top-trekers/topTrekersList";
import type { FC } from "react";

const TopTrekersHomeSection: FC = () => {
  return (
    <View>
      <TopTrekersHomeHeader />
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

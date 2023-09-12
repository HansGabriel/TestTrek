import * as React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import TrendingTestsHomeCard from "./TrendingTestsHomeCard";
import TrendingTestsHomeHeader from "../headers/TrendingTestsHomeHeader";
import discoverCardList from "../../temp-data/discover/discoverCardList";
import type { FC } from "react";

const TrendingTestsHomeSection: FC = () => {
  return (
    <View>
      <TrendingTestsHomeHeader />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={discoverCardList}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <TrendingTestsHomeCard
              imageSource={item.imageSource}
              title={item.title}
              q={item.q}
              date={new Date(item.date)}
              plays={0}
              userImageSource={{ uri: "https://example.com/dummy-image.jpg" }}
              userName={item.userName}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TrendingTestsHomeSection;

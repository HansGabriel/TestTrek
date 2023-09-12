import * as React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import TopPicksHomeCards from "./TopPicksHomeCards";
import TopPicksHomeHeader from "../headers/TopPicksHomeHeader";
import discoverCardList from "../../temp-data/discover/discoverCardList";
import type { FC } from "react";

const TopPicksHomeSection: FC = () => {
  return (
    <View>
      <TopPicksHomeHeader />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={discoverCardList}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <TopPicksHomeCards
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

export default TopPicksHomeSection;

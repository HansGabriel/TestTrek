import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import DiscoverScreenHeader from "../components/headers/DiscoverScreenHeader";
import DiscoverScreenCard from "../components/Discover/DiscoverScreenCard";
import discoverCardList from "../temp-data/discover/discoverCardList";

export const DiscoverScreen = () => {
  return (
    <SafeAreaView className="flex-1 flex-col">
      <DiscoverScreenHeader />
      <FlashList
        showsVerticalScrollIndicator={false}
        data={discoverCardList}
        estimatedItemSize={100}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index}>
            <DiscoverScreenCard {...item} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

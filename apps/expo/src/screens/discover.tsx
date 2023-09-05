import React from "react";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import DiscoverScreenHeader from "../components/headers/DiscoverScreenHeader";
import DiscoverScreenCard from "../components/discover/DiscoverScreenCard";
import discoverCardList from "../temp-data/discover/discoverCardList";

export const DiscoverScreen = () => {
  return (
    <SafeAreaView className="flex-1 flex-col">
      <DiscoverScreenHeader />
      <ScrollView>
        {discoverCardList.map((card, index) => (
          <TouchableOpacity key={index}>
            <DiscoverScreenCard {...card} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

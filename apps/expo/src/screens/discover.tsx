import React from "react";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import DiscoverScreenHeader from "../components/headers/DiscoverScreenHeader";
import DiscoverScreenCard from "../components/discover/DiscoverScreenCard";
import { trpc } from "../utils/trpc";

export const DiscoverScreen = () => {
  const { data: tests } = trpc.test.getAll.useQuery();

  const discoverScreenCardList: Card[] = tests.map((test) => ({
    imageSource: test.imageUrl,
    date: test.createdAt,
    plays: 10,
    q: 10,
    title: test.title,
    userImageSource: require("../temp-data/discover/discover-images/user-image/user-image1.png"),
    userName: "user 1",
  }));

  return (
    <SafeAreaView className="flex-1 flex-col">
      <DiscoverScreenHeader />
      <ScrollView>
        {discoverScreenCardList.map((card, index) => (
          <TouchableOpacity key={index}>
            <DiscoverScreenCard {...card} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

import React, { useMemo } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import DiscoverScreenHeader from "../components/headers/DiscoverScreenHeader";
import DiscoverScreenCard from "../components/discover/DiscoverScreenCard";
import { trpc } from "../utils/trpc";

export const DiscoverScreen = () => {
  const { data } = trpc.test.getAll.useQuery();

  const sortedAndFilteredData = useMemo(() => {
    if (data) {
      return data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
    return [];
  }, [data]);

  return (
    <SafeAreaView className="flex-1 flex-col">
      <DiscoverScreenHeader />
      <FlashList
        showsVerticalScrollIndicator={false}
        data={sortedAndFilteredData}
        estimatedItemSize={100}
        renderItem={({ item, index }) => {
          const fullName = `${item.user.firstName} ${item.user.lastName}`;
          return (
            <TouchableOpacity key={index}>
              <DiscoverScreenCard
                imageSource={{ uri: item.imageUrl }}
                title={item.title}
                q={12}
                date={new Date(item.createdAt)}
                plays={0}
                userImageSource={{
                  uri:
                    item.user.imageUrl ?? "https://example.com/dummy-image.jpg",
                }}
                userName={fullName}
              />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

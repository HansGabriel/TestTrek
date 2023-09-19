import React, { FC } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import ViewAllScreenTestCard from "./ViewAllScreenTestCard";
import ViewAllScreenHeader from "../../headers/ViewAllScreenHeader";
import { FlashList } from "@shopify/flash-list";
import { trpc } from "../../../utils/trpc";

interface Props {
  testsFor: "discover" | "trending" | "topPicks";
}

export const ViewAllTestDisplay: FC<Props> = (props) => {
  const { data } = trpc.test.getAll.useQuery();
  let fetchedData = data;
  let headerTitle = "";

  if (props.testsFor == "discover") {
    const { data } = trpc.test.getDiscoverTests.useQuery();
    fetchedData = data;
    headerTitle = "Discover";
  } else if (props.testsFor == "trending") {
    const { data } = trpc.test.getTrendingTests.useQuery();
    fetchedData = data;
    headerTitle = "Trending";
  } else if (props.testsFor == "topPicks") {
    const { data } = trpc.test.getTopPicks.useQuery();
    fetchedData = data;
    headerTitle = "Top Picks";
  }

  return (
    <SafeAreaView className="flex-1 flex-col">
      <ViewAllScreenHeader title={headerTitle} />
      <FlashList
        showsVerticalScrollIndicator={false}
        data={fetchedData}
        estimatedItemSize={100}
        renderItem={({ item, index }) => {
          const fullName = `${item.user.firstName} ${item.user.lastName}`;
          return (
            <TouchableOpacity key={index}>
              <ViewAllScreenTestCard
                imageSource={{ uri: item.imageUrl }}
                title={item.title}
                questions={12}
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

export default ViewAllTestDisplay;

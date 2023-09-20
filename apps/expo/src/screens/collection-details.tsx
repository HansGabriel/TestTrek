import React from "react";
import { SafeAreaView, Image } from "react-native";
import { RootStackScreenProps } from "../types";
import { trpc } from "../utils/trpc";
import ViewAllScreenHeader from "../components/headers/ViewAllScreenHeader";
import { CollectionTestHeaderAndContent } from "../components/collection-details/CollectionTestHeaderAndContent";

export const CollectionDetailsScreen = ({
  route,
}: RootStackScreenProps<"CollectionDetails">) => {
  const { collectionId } = route.params;

  const { data: collectionDetails } =
    trpc.collection.getByCollectionId.useQuery({
      collectionId,
    });

  if (!collectionDetails) {
    return (
      <SafeAreaView>
        <ViewAllScreenHeader title="Loading..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 flex-col items-center">
      <ViewAllScreenHeader title={collectionDetails.title} />
      <Image
        className="h-[30%] w-[90%] rounded-2xl"
        source={{ uri: collectionDetails.imageUrl }}
      />
      <CollectionTestHeaderAndContent collectionId={collectionDetails.id} />
    </SafeAreaView>
  );
};

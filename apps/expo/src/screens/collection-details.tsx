import React from "react";
import { SafeAreaView, Image, View } from "react-native";
import { RootStackScreenProps } from "../types";
import { trpc } from "../utils/trpc";
import ViewAllScreenHeader from "../components/headers/ViewAllScreenHeader";
import { CollectionTestHeaderAndContent } from "../components/collection-details/CollectionTestHeaderAndContent";
import { SkeletonLoader } from "../components/loaders/SkeletonLoader";

export const CollectionDetailsScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"CollectionDetails">) => {
  const { collectionId } = route.params;

  const { data: collectionDetails } =
    trpc.collection.getByCollectionId.useQuery({
      collectionId,
    });

  const goToTestDetailsScreen = (testId: string) => () => {
    navigation.navigate("TestDetails", { testId });
  };

  if (!collectionDetails) {
    return (
      <SafeAreaView className="mt-28 flex-1">
        <View className="h-[90%] w-[90%] items-center space-y-10 self-center">
          <View className=" h-[50%] w-[100%] items-center justify-center">
            <SkeletonLoader isCircular={true} width={"100%"} height={"100%"} />
          </View>
          <View className="h-[25%] w-[100%] items-center justify-evenly">
            <SkeletonLoader isCircular={false} width={"100%"} height={25} />
          </View>
        </View>
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
      <CollectionTestHeaderAndContent
        collectionId={collectionDetails.id}
        goToTestDetailsScreen={goToTestDetailsScreen}
      />
    </SafeAreaView>
  );
};

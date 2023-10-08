import React, { FC } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import CollectionsCard from "./CollectionsCard";
import ViewAllScreenHeader from "../../headers/ViewAllScreenHeader";
import { FlashList } from "@shopify/flash-list";
import { trpc } from "../../../utils/trpc";
import { useNavigation } from "@react-navigation/native";
import { SkeletonLoader } from "../../loaders/SkeletonLoader";

interface Props {
  collectionsFor: "topCollections";
}

export const ViewAllCollectionsDisplay: FC<Props> = (props) => {
  const navigation = useNavigation();

  const { data: topCollections } = trpc.collection.getTopCollections.useQuery();

  const goToCollectionDetailsScreen = (collectionId: string) => () => {
    navigation.navigate("CollectionDetails", { collectionId });
  };

  const formatTitle = (title: string) => {
    let format = "";

    if (title === "topCollections") {
      format = "Top Collections";
    }

    return format;
  };

  if (!topCollections) {
    return (
      <>
        <SafeAreaView className="flex-1">
          <ViewAllScreenHeader title={formatTitle(props.collectionsFor)} />
          <View className="my-5 h-[50%] w-[90%] flex-col justify-between self-center">
            <View className="mt-7">
              <SkeletonLoader isCircular={true} width={"100%"} height={100} />
            </View>
            <View className="mt-7">
              <SkeletonLoader isCircular={true} width={"100%"} height={100} />
            </View>
            <View className="mt-7">
              <SkeletonLoader isCircular={true} width={"100%"} height={100} />
            </View>
            <View className="mt-7">
              <SkeletonLoader isCircular={true} width={"100%"} height={100} />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ViewAllScreenHeader title={formatTitle(props.collectionsFor)} />
      <FlashList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={topCollections}
        estimatedItemSize={200}
        renderItem={({ item, index }) => {
          return (
            <SafeAreaView className="flex-1">
              <TouchableOpacity onPress={goToCollectionDetailsScreen(item.id)}>
                <CollectionsCard
                  key={index}
                  userImage={{ uri: item.imageUrl }}
                  title={item.title}
                />
              </TouchableOpacity>
            </SafeAreaView>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ViewAllCollectionsDisplay;

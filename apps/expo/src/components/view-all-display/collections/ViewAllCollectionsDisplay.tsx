import React, { FC } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import CollectionsCard from "./CollectionsCard";
import ViewAllScreenHeader from "../../headers/ViewAllScreenHeader";
import { FlashList } from "@shopify/flash-list";
import { trpc } from "../../../utils/trpc";
import { useNavigation } from "@react-navigation/native";

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

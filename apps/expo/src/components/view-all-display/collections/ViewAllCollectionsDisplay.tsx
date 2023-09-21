import React, { FC } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import CollectionsCard from "./CollectionsCard";
import ViewAllScreenHeader from "../../headers/ViewAllScreenHeader";
import { FlashList } from "@shopify/flash-list";
import { trpc } from "../../../utils/trpc";
import { useNavigation } from "@react-navigation/native";

interface Props {
  collectionsFor: "topCollections";
}

export const ViewAllCollectionsDisplay: FC<Props> = (props) => {
  const { data } = trpc.collection.getTopCollections.useQuery();
  let fetchedData = data;
  let headerTitle = "";

  const navigation = useNavigation();

  if (props.collectionsFor == "topCollections") {
    const { data } = trpc.collection.getTopCollections.useQuery();
    fetchedData = data;
    headerTitle = "Top Collections";
  }

  const goToCollectionDetailsScreen = (collectionId: string) => () => {
    navigation.navigate("CollectionDetails", { collectionId });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ViewAllScreenHeader title={headerTitle} />
      <FlashList
        showsVerticalScrollIndicator={false}
        data={fetchedData}
        estimatedItemSize={200}
        renderItem={({ item, index }) => {
          if (!fetchedData) return <></>;

          if (index % 2 === 0) {
            const nextItem = fetchedData[index + 1];
            return (
              <View key={index} className="flex-row justify-between">
                <TouchableOpacity
                  onPress={goToCollectionDetailsScreen(item.id)}
                >
                  <CollectionsCard
                    userImage={{
                      uri:
                        item.imageUrl ?? "https://example.com/dummy-image.jpg",
                    }}
                    title={item.title}
                  />
                </TouchableOpacity>
                {nextItem && (
                  <TouchableOpacity
                    onPress={goToCollectionDetailsScreen(item.id)}
                  >
                    <CollectionsCard
                      userImage={{
                        uri:
                          nextItem.imageUrl ??
                          "https://example.com/dummy-image.jpg",
                      }}
                      title={nextItem.title}
                    />
                  </TouchableOpacity>
                )}
              </View>
            );
          } else {
            return <></>;
          }
        }}
      />
    </SafeAreaView>
  );
};

export default ViewAllCollectionsDisplay;

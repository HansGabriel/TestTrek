import React, { FC } from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";
import CollectionsCard from "./CollectionsCard";
import ViewAllScreenHeader from "../../headers/ViewAllScreenHeader";
import { FlashList } from "@shopify/flash-list";
import { trpc } from "../../../utils/trpc";
import { useNavigation } from "@react-navigation/native";
import { SkeletonLoader } from "../../loaders/SkeletonLoader";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  collectionsFor: "topCollections";
}

export const ViewAllCollectionsDisplay: FC<Props> = (props) => {
  const { height, width } = Dimensions.get("window");
  const navigation = useNavigation();

  const { data: topCollections } =
    trpc.collection.getDiscoverCollections.useQuery();

  const goToCollectionDetailsScreen = (collectionId: string) => () => {
    navigation.navigate("CollectionDetails", { collectionId });
  };

  const formatTitle = (title: string) => {
    let format = "";

    if (title === "topCollections") {
      format = "Discover Collections";
    }

    return format;
  };

  if (!topCollections) {
    return (
      <>
        <SafeAreaView
          className="flex-1"
          style={{
            height: height,
            width: width,
          }}
        >
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
    <SafeAreaView
      style={{
        height: height,
        width: width,
        flex: 1,
      }}
    >
      <ViewAllScreenHeader
        title={formatTitle(props.collectionsFor)}
        viewAllScreenType="collection"
      />
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

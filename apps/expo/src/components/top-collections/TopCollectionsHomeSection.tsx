import { View, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import CollectionsCard from "../view-all-display/collections/CollectionsCard";
import type { FC } from "react";
import { trpc } from "../../utils/trpc";
import SectionHeader from "../headers/SectionHeader";
import { useNavigation } from "@react-navigation/native";
import { SkeletonLoader } from "../loaders/SkeletonLoader";
import HomeEmptyCollection from "../home-empty-section/EmptyCollection";

const TopCollectionsHomeSection: FC = () => {
  const { data: topCollections } = trpc.collection.getTopCollections.useQuery({
    amountOfCollections: 5,
  });

  const navigation = useNavigation();

  const goToCollectionDetailsScreen = (collectionId: string) => () => {
    navigation.navigate("CollectionDetails", { collectionId });
  };

  if (!topCollections) {
    return (
      <SafeAreaView className="flex-1">
        <View className="h-[90%] w-[90%] items-center space-y-10 self-center py-4">
          <View className="h-[25%] w-[100%] items-center justify-evenly">
            <SkeletonLoader isCircular={true} width={"100%"} height={25} />
          </View>
          <View className="h-[1%] w-[100%] items-center justify-evenly">
            <SkeletonLoader isCircular={true} width={"100%"} height={50} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!topCollections.length) {
    return (
      <SafeAreaView className="flex-1">
        <HomeEmptyCollection />
      </SafeAreaView>
    );
  }

  return (
    <View>
      <SectionHeader
        title="Top Collections"
        hasViewAll={true}
        onViewAllPress={() => {
          navigation.navigate("ViewAll", { fetchedData: "topCollections" });
        }}
      />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={topCollections.map((collection) => ({
          id: collection.id,
          imageSource: collection.imageUrl,
          title: collection.title,
        }))}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={goToCollectionDetailsScreen(item.id)}>
            <CollectionsCard
              userImage={{
                uri: item.imageSource ?? "https://example.com/dummy-image.jpg",
              }}
              title={item.title}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TopCollectionsHomeSection;

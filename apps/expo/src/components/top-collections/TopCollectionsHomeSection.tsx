import { View, FlatList, TouchableOpacity } from "react-native";
import CollectionsCard from "../view-all-display/collections/CollectionsCard";
import type { FC } from "react";
import { trpc } from "../../utils/trpc";
import SectionHeader from "../headers/SectionHeader";
import { useNavigation } from "@react-navigation/native";

const TopCollectionsHomeSection: FC = () => {
  const { data: topCollections } = trpc.collection.getTopCollections.useQuery();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = useNavigation();

  if (!topCollections) {
    return <></>;
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
          <TouchableOpacity>
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

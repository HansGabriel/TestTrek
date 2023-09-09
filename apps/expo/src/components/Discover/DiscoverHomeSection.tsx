import * as React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import DiscoverHomeCard from "./DiscoverHomeCard";
import DiscoverHomeHeader from "../headers/DiscoverHomeHeader";
import { trpc } from "../../utils/trpc";

const DiscoverHomeSection: React.FC<Props> = () => {
  const { data } = trpc.test.getAll.useQuery();

  const sortedAndFilteredData = React.useMemo(() => {
    if (data) {
      return data
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 5);
    }
    return [];
  }, [data]);

  return (
    <View>
      <DiscoverHomeHeader />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={sortedAndFilteredData}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <DiscoverHomeCard
              imageSource={{ uri: item.imageUrl }}
              title={item.title}
              q={item.keywords.length}
              date={new Date(item.createdAt)}
              plays={0}
              userImageSource={{ uri: "https://example.com/dummy-image.jpg" }}
              userName={item.userId}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DiscoverHomeSection;

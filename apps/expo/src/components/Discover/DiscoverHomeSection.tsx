import * as React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import HomeTestDisplayCard from "../HomeTestDisplayCard";
import SectionHeader from "../headers/SectionHeader";
import { trpc } from "../../utils/trpc";
import type { FC } from "react";
import { useNavigation } from "@react-navigation/native";

const DiscoverHomeSection: FC = () => {
  const { data } = trpc.test.getAll.useQuery();

  const navigation = useNavigation();

  const goToTestDetailsScreen = (testId: string) => () => {
    navigation.navigate("TestDetails", {
      testId,
    });
  };

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
      <SectionHeader
        title={"Discover"}
        hasViewAll={true}
        onViewAllPress={() => navigation.navigate("Discover")}
      />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={sortedAndFilteredData}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => {
          const fullName = `${item.user.firstName} ${item.user.lastName}`;
          return (
            <TouchableOpacity onPress={goToTestDetailsScreen(item.id)}>
              <HomeTestDisplayCard
                imageSource={{ uri: item.imageUrl }}
                title={item.title}
                questions={item.keywords.length}
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
    </View>
  );
};

export default DiscoverHomeSection;

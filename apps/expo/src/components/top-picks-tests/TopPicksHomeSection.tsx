import * as React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import HomeTestDisplayCard from "../HomeTestDisplayCard";
import SectionHeader from "../headers/SectionHeader";
import type { FC } from "react";
import { trpc } from "../../utils/trpc";
import { getFullName } from "@acme/utils/src/strings";
import { IMAGE_PLACEHOLDER } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const TopPicksHomeSection: FC = () => {
  const { data: topPicksTest } = trpc.test.getTopPicks.useQuery();

  const navigation = useNavigation();

  if (!topPicksTest) {
    return <></>;
  }

  return (
    <View>
      <SectionHeader
        title="Top Picks"
        hasViewAll={true}
        onViewAllPress={() => {
          navigation.navigate("ViewAll", { fetchedData: "topPicksTest" });
        }}
      />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={topPicksTest}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <HomeTestDisplayCard
              imageSource={{ uri: item.imageUrl }}
              title={item.title}
              questions={item.questions.length}
              date={new Date(item.createdAt)}
              plays={0}
              userImageSource={{
                uri: "https://example.com/dummy-image.jpg" ?? IMAGE_PLACEHOLDER,
              }}
              userName={`${item.user.firstName} ${item.user.lastName}`}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TopPicksHomeSection;

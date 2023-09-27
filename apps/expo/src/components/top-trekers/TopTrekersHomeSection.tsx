import { View, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import TopTrekersHomeCard from "./TopTrekersHomeCard";
import SectionHeader from "../headers/SectionHeader";

import { getFullName } from "@acme/utils/src/strings";
import { IMAGE_PLACEHOLDER } from "../../constants";
import { trpc } from "../../utils/trpc";

import type { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { SkeletonLoader } from "../loaders/SkeletonLoader";

const TopTrekersHomeSection: FC = () => {
  const { data: topTrekers } = trpc.user.getTop.useQuery();

  const navigation = useNavigation();

  if (!topTrekers) {
    return (
      <SafeAreaView className="flex-1">
        <View className="h-[90%] w-[90%] items-center space-y-10 self-center py-4">
          <View className="h-[25%] w-[100%] items-center justify-evenly">
            <SkeletonLoader isCircular={false} width={"100%"} height={25} />
          </View>
          <View className="h-[1%] w-[100%] items-center justify-evenly">
            <SkeletonLoader isCircular={false} width={"100%"} height={50} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!topTrekers.length) {
    <></>;
  }

  return (
    <View>
      <SectionHeader
        title="Top Trekers"
        hasViewAll={true}
        onViewAllPress={() => {
          navigation.navigate("ViewAll", { fetchedData: "topTrekers" });
        }}
      />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={topTrekers.map((treker) => ({
          id: treker.id,
          name: getFullName(treker.firstName, treker.lastName),
          imageSource: treker.imageUrl,
        }))}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <TopTrekersHomeCard
              imageSource={{
                uri: item.imageSource ?? IMAGE_PLACEHOLDER,
              }}
              name={item.name}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TopTrekersHomeSection;

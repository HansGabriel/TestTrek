import * as React from "react";
import { View, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import SectionHeader from "../headers/SectionHeader";
import { trpc } from "../../utils/trpc";
import type { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { SkeletonLoader } from "../loaders/SkeletonLoader";
import DiscoverReviewersHomeDisplayCard from "./DiscoverReviewersHomeCard";
import HomeEmptyReviewer from "../home-empty-section/EmptyReviewer";

const DiscoverReviewersHomeSection: FC = () => {
  const { data } = trpc.reviewer.getDiscoverReviewers.useQuery({
    amountOfReviewers: 5,
  });

  const navigation = useNavigation();

  const goToReviewerDetailsScreen = (reviewerId: string) => () => {
    navigation.navigate("ReviewerDetails", {
      reviewerId,
    });
  };

  if (!data) {
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

  if (!data.length) {
    return (
      <SafeAreaView className="w-full flex-1 self-center">
        <HomeEmptyReviewer />
      </SafeAreaView>
    );
  }

  return (
    <View>
      <SectionHeader
        title={"Discover Reviewers"}
        hasViewAll={true}
        onViewAllPress={() =>
          navigation.navigate("ViewAll", { fetchedData: "discoverReviewers" })
        }
      />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => {
          const fullName = `${item.user.firstName} ${item.user.lastName}`;
          return (
            <TouchableOpacity onPress={goToReviewerDetailsScreen(item.id)}>
              <DiscoverReviewersHomeDisplayCard
                imageSource={{ uri: item.imageUrl }}
                title={item.title}
                date={new Date(item.createdAt)}
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

export default DiscoverReviewersHomeSection;

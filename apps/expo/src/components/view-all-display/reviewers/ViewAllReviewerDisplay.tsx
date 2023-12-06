import React, { FC } from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";
import ViewAllScreenHeader from "../../headers/ViewAllScreenHeader";
import { FlashList } from "@shopify/flash-list";
import { trpc } from "../../../utils/trpc";
import { useNavigation } from "@react-navigation/native";
import { SkeletonLoader } from "../../loaders/SkeletonLoader";
import { SafeAreaView } from "react-native-safe-area-context";
import ViewAllScreenReviewerCard from "./ViewAllScreenReviewerCard";

export const ViewAllReviewersDisplay: FC = () => {
  const { height, width } = Dimensions.get("window");
  const navigation = useNavigation();

  const { data: discoverReviewers } =
    trpc.reviewer.getDiscoverReviewers.useQuery();

  const goToCollectionDetailsScreen = (reviewerId: string) => () => {
    navigation.navigate("ReviewerDetails", {
      reviewerId,
    });
  };

  if (!discoverReviewers) {
    return (
      <>
        <SafeAreaView
          className="flex-1"
          style={{
            height: height,
            width: width,
          }}
        >
          <ViewAllScreenHeader title={"Discover Reviewers"} />
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
      className="flex-1 flex-col"
      style={{
        height: height,
        width: width,
      }}
    >
      <ViewAllScreenHeader title={"Discover Reviewers"} />
      <FlashList
        showsVerticalScrollIndicator={false}
        data={discoverReviewers}
        estimatedItemSize={200}
        renderItem={({ item, index }) => {
          return (
            <SafeAreaView className="flex-1">
              <TouchableOpacity onPress={goToCollectionDetailsScreen(item.id)}>
                <ViewAllScreenReviewerCard
                  key={index}
                  imageSource={{ uri: item.imageUrl }}
                  date={item.createdAt}
                  userImageSource={{
                    uri:
                      item.user.imageUrl ??
                      "https://example.com/dummy-image.jpg",
                  }}
                  title={item.title}
                  userName={`${item.user.firstName} ${item.user.lastName}`}
                />
              </TouchableOpacity>
            </SafeAreaView>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ViewAllReviewersDisplay;

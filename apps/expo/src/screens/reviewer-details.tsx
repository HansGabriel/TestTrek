import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReusableHeader } from "../components/headers/ReusableHeader";
import { SkeletonLoader } from "../components/loaders/SkeletonLoader";
import { ReviewerDetailsContent } from "../components/reviewer-details/ReviewerDetailsContent";
import { ReviewerDetailsHeader } from "../components/reviewer-details/ReviewerDetailsHeader";
import useGoBack from "../hooks/useGoBack";
import { RootStackScreenProps } from "../types";
import { trpc } from "../utils/trpc";

export const ReviewerDetailsScreen = ({
  route,
}: RootStackScreenProps<"ReviewerDetails">) => {
  const { height, width } = Dimensions.get("window");
  const goBack = useGoBack();
  const navigation = useNavigation();
  const { reviewerId } = route.params;
  const { data: reviewerData } = trpc.reviewer.getReviewerById.useQuery({
    reviewerId,
  });

  if (!reviewerData) {
    return (
      <>
        <SafeAreaView
          className="flex-1"
          style={{ height: height, width: width }}
        >
          <ReusableHeader screenName={"Reviewer Details"} handleExit={goBack} />

          <View className="h-[90%] w-[90%] items-center space-y-10 self-center">
            <View className=" h-[50%] w-[100%] items-center justify-center">
              <SkeletonLoader
                isCircular={true}
                width={"100%"}
                height={"100%"}
              />
            </View>
            <View className="h-[25%] w-[100%] items-center justify-evenly">
              <SkeletonLoader isCircular={true} width={"100%"} height={25} />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }

  const goToEditReviewer = () => {
    navigation.navigate("CreateReviewer", {
      reviewerId: reviewerData?.reviewer?.id,
      type: "edit",
    });
  };

  return (
    <SafeAreaView
      className="flex-1 flex-col"
      style={{ height: height, width: width }}
    >
      <ReviewerDetailsHeader
        showEditIcon={reviewerData?.isOwner}
        goToEditReviewer={goToEditReviewer}
      />
      <ReviewerDetailsContent reviewerDetails={reviewerData} />
    </SafeAreaView>
  );
};

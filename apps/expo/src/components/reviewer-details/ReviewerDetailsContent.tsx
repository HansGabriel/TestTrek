import { getFullName } from "@acme/utils/src/strings";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions } from "react-native";

import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import { SafeAreaView } from "react-native-safe-area-context";
import { IMAGE_PLACEHOLDER } from "../../constants";
import useGoBack from "../../hooks/useGoBack";
import { RouterOutputs, trpc } from "../../utils/trpc";
import { ReusableHeader } from "../headers/ReusableHeader";
import { SkeletonLoader } from "../loaders/SkeletonLoader";

interface ReviewerDetailsProps {
  reviewerDetails: RouterOutputs["reviewer"]["getReviewerById"];
}

export const ReviewerDetailsContent = ({
  reviewerDetails,
}: ReviewerDetailsProps) => {
  const { height, width } = Dimensions.get("window");
  const goBack = useGoBack();
  const navigation = useNavigation();
  const { data: reviewerOwner } = trpc.reviewer.getDetails.useQuery({
    reviewerId: reviewerDetails?.id ?? "",
  });

  if (!reviewerDetails || !reviewerOwner) {
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

  const { isOwner, notOwner } = reviewerOwner;

  const goToOthersProfileScreen = (userId: string) => () => {
    navigation.navigate("OthersProfile", { userId });
  };

  const goToMyProfileScreen = () => () => {
    navigation.navigate("Profile");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", height: height, width: width }}
    >
      <ScrollView className={"w-[90%] "} showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: height / 3,
            width: width * 0.9,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: 20,
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 20,
              resizeMode: "cover",
            }}
            source={{
              uri: reviewerDetails.imageUrl ?? IMAGE_PLACEHOLDER,
            }}
          />
        </View>

        <Text
          className="font-nunito mt-3 w-[87%] break-words text-2xl font-bold leading-[38.40px] text-[#212121]"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          <Text className="font-nunito-bold w-[382px] text-2xl font-bold leading-[38.40px] text-neutral-800">
            {reviewerDetails.title}
          </Text>
        </Text>

        <View className="mt-5 w-[87%] self-center border-b border-[#EEEEEE]"></View>

        <View className="w-[90%] flex-row items-center justify-evenly self-center py-3">
          <Image
            className="mr-3 h-[60px] w-[60px] rounded-full"
            source={{
              uri: reviewerDetails.user.imageUrl ?? IMAGE_PLACEHOLDER,
            }}
          />
          <View className="ml-3 w-[70%] flex-grow flex-col items-start justify-center">
            <Text
              className="font-nunito-bold w-[90%] text-lg leading-[32px] text-[#212121]"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {getFullName(
                reviewerDetails.user.firstName,
                reviewerDetails.user.lastName,
              )}
            </Text>
            <Text
              className="font-nunito-semibold w-[90%] text-[14px] leading-[19.6px] text-[#616161]"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              @{reviewerDetails.user.username}
            </Text>
          </View>
          <TouchableOpacity
            onPress={
              isOwner
                ? goToMyProfileScreen()
                : goToOthersProfileScreen(notOwner ?? "")
            }
            className=" mt-5 items-center justify-center self-center rounded-full bg-[#6949FF] px-5 py-1"
          >
            <Text className="font-nunito-semibold text-center text-xs leading-[19.6px] text-white">
              View
            </Text>
          </TouchableOpacity>
        </View>
        <View className="my-5 flex-1">
          <View>
            <Text className="font-nunito-bold break-words text-xl font-bold leading-[32px] text-[#212121]">
              Reviewer Content
            </Text>
          </View>
          <View className="my-5">
            <RichEditor
              disabled
              initialContentHTML={reviewerDetails.content}
              androidLayerType="software"
              className=" font-nunito-medium"
              useContainer={false}
              containerStyle={{
                minHeight: 500,
                maxHeight: Dimensions.get("window").height,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

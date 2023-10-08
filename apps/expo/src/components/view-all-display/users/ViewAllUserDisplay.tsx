import React, { FC } from "react";
import { SafeAreaView, View } from "react-native";
import ViewAllUserCard from "./ViewAllUserCard";
import ViewAllScreenHeader from "../../headers/ViewAllScreenHeader";
import { FlashList } from "@shopify/flash-list";
import { trpc } from "../../../utils/trpc";
import { SkeletonLoader } from "../../loaders/SkeletonLoader";

interface Props {
  usersFor: "topUsers";
}

export const ViewAllUserDisplay: FC<Props> = (props) => {
  const { data } = trpc.user.getTop.useQuery();
  let fetchedData = data;
  let headerTitle = "";

  if (props.usersFor == "topUsers") {
    const { data } = trpc.user.getTop.useQuery();
    fetchedData = data;
    headerTitle = "Top Trekers";
  }

  if (!fetchedData) {
    return (
      <>
        <SafeAreaView className="flex-1">
          <ViewAllScreenHeader title={headerTitle} />
          <View className="my-5 h-[50%] w-[90%] flex-col justify-between self-center">
            <View className="mt-7">
              <SkeletonLoader isCircular={true} width={"100%"} height={50} />
            </View>
            <View className="mt-7">
              <SkeletonLoader isCircular={true} width={"100%"} height={50} />
            </View>
            <View className="mt-7">
              <SkeletonLoader isCircular={true} width={"100%"} height={50} />
            </View>
            <View className="mt-7">
              <SkeletonLoader isCircular={true} width={"100%"} height={50} />
            </View>
            <View className="mt-7">
              <SkeletonLoader isCircular={true} width={"100%"} height={50} />
            </View>
            <View className="mt-7">
              <SkeletonLoader isCircular={true} width={"100%"} height={50} />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <SafeAreaView className="flex-1 flex-col">
      <ViewAllScreenHeader title={headerTitle} />
      <FlashList
        showsVerticalScrollIndicator={false}
        data={fetchedData}
        estimatedItemSize={100}
        renderItem={({ item }) => {
          const fullName = `${item.firstName} ${
            item.lastName ? item.lastName : ""
          }`;
          const userName = `@${item.firstName.toLowerCase()}${
            item.lastName ? "_" + item.lastName.toLowerCase() : ""
          }`;

          return (
            <ViewAllUserCard
              userId={item.userId}
              userImage={{
                uri: item.imageUrl ?? "https://example.com/dummy-image.jpg",
              }}
              name={fullName}
              userName={userName}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ViewAllUserDisplay;

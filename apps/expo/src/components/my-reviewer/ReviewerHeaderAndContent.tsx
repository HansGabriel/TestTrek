import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FC, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { trpc } from "../../utils/trpc";
import { ReviewerTabs } from "./ReviewerTab";
import { AddButton } from "../buttons/AddButton";
import { SkeletonLoader } from "../loaders/SkeletonLoader";
import { ReusablePlaceholder } from "../../placeholders/ReusablePlaceholder";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  tab: "user" | "other";
}

const sortObject = [
  {
    sortName: "newest",
    icon: (
      <FontAwesome5
        name="sort-amount-down-alt"
        size={24}
        color="rgba(105, 73, 255, 1)"
      />
    ),
  },
  {
    sortName: "oldest",
    icon: (
      <FontAwesome5
        name="sort-amount-up"
        size={24}
        color="rgba(105, 73, 255, 1)"
      />
    ),
  },
  {
    sortName: "alphabetical",
    icon: (
      <FontAwesome5
        name="sort-alpha-down"
        size={24}
        color="rgba(105, 73, 255, 1)"
      />
    ),
  },
];

export const ReviewerHeaderAndContent: FC<HeaderProps> = ({ tab }) => {
  const [sortType, setSortType] = useState<
    "newest" | "oldest" | "alphabetical"
  >("newest");

  const { data: reviewerData } = trpc.reviewer.getAllReviewers.useQuery({
    reviewerType: tab,
    sortBy: sortType,
  });

  const sortItems = () => {
    let nextSortType: "newest" | "oldest" | "alphabetical";

    switch (sortType) {
      case "newest":
        nextSortType = "oldest";
        break;
      case "oldest":
        nextSortType = "alphabetical";
        break;
      case "alphabetical":
        nextSortType = "newest";
        break;
      default:
        nextSortType = "newest";
    }

    setSortType(nextSortType);
  };

  if (!reviewerData) {
    return (
      <>
        <SafeAreaView className="flex-1">
          <View className="mb-4 w-full flex-row items-end justify-between">
            <View className="mx-4">
              <Text className=" font-nunito-bold text-xl">Reviewers</Text>
            </View>
            <View>
              <TouchableOpacity
                className="mx-2.5 flex-row gap-2"
                onPress={sortItems}
              >
                <Text className=" font-nunito-bold text-xl capitalize text-violet-600">
                  {sortType}
                </Text>
                {sortObject.map((item, index) => {
                  if (sortType === item.sortName) {
                    return <View key={index}>{item.icon}</View>;
                  }
                })}
              </TouchableOpacity>
            </View>
          </View>
          <View className="my-5 h-[50%] w-[90%] flex-col justify-between self-center">
            <View className="my-7">
              <SkeletonLoader isCircular={true} width={"100%"} height={100} />
            </View>
            <View className="my-7">
              <SkeletonLoader isCircular={true} width={"100%"} height={100} />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }

  if (reviewerData.length < 0) {
    return (
      <>
        <SafeAreaView className="flex-1">
          <View className="mb-4 w-full flex-row items-end justify-between">
            <View className="mx-4">
              <Text className=" font-nunito-bold text-xl">
                {reviewerData.length} Reviewers
              </Text>
            </View>
            <View>
              <TouchableOpacity
                className="mx-2.5 flex-row gap-2"
                onPress={sortItems}
              >
                <Text className=" font-nunito-bold text-xl capitalize text-violet-600">
                  {sortType}
                </Text>
                {sortObject.map((item, index) => {
                  if (sortType === item.sortName) {
                    return <View key={index}>{item.icon}</View>;
                  }
                })}
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <ReusablePlaceholder
              icon={<Ionicons name="newspaper" size={40} color="#7c3aed" />}
              text={`No reviewers shown`}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="mb-4 w-full flex-row items-end justify-between">
        <View className="mx-4">
          <Text className=" font-nunito-bold text-xl">
            {reviewerData?.length} Reviewers
          </Text>
        </View>
        <View>
          <TouchableOpacity
            className="mx-2.5 flex-row gap-2"
            onPress={sortItems}
          >
            <Text className=" font-nunito-bold text-xl capitalize text-violet-600">
              {sortType}
            </Text>
            {sortObject.map((item, index) => {
              if (sortType === item.sortName) {
                return <View key={index}>{item.icon}</View>;
              }
            })}
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-1 ">
        <ReviewerTabs tabData={reviewerData} />
        {tab === "user" ? (
          <View
            className={`z-50 ${
              reviewerData.length > 0 ? "-mt-24 mb-8" : "-mt-20"
            }  h-12 w-14 items-center self-end`}
          >
            <AddButton screen={"CreateReviewer"} />
          </View>
        ) : (
          ""
        )}
      </View>
    </SafeAreaView>
  );
};

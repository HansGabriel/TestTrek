import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FC, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ViewAllScreenTestCard from "../view-all-display/tests/ViewAllScreenTestCard";
import { FlashList } from "@shopify/flash-list";
import { trpc } from "../../utils/trpc";
import { ReusablePlaceholder } from "../../placeholders/ReusablePlaceholder";
import { Ionicons } from "@expo/vector-icons";
import { SkeletonLoader } from "../loaders/SkeletonLoader";

interface Props {
  collectionId: string;
  goToTestDetailsScreen: (testId: string) => () => void;
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

export const CollectionTestHeaderAndContent: FC<Props> = (props) => {
  const { goToTestDetailsScreen } = props;
  const [sortType, setSortType] = useState<
    "newest" | "oldest" | "alphabetical"
  >("newest");

  const { data: testCollection } =
    trpc.collection.getTestsInCollection.useQuery({
      collectionId: props.collectionId,
      sortType: sortType,
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

  if (!testCollection) {
    return (
      <SafeAreaView className="w-[100%] flex-1">
        <View className="mb-4 w-[97.5%] flex-row items-end justify-between">
          <View className="mx-5 flex-1">
            <Text className=" font-nunito-bold text-xl">Tests</Text>
          </View>
          <View className="mx-4 flex-row">
            <TouchableOpacity className="flex-row gap-2" onPress={sortItems}>
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
            <SkeletonLoader isCircular={true} width={"100%"} height={50} />
          </View>
          <View className="my-7">
            <SkeletonLoader isCircular={true} width={"100%"} height={50} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (testCollection.length <= 0) {
    return (
      <SafeAreaView className="flex-1">
        <View className="mb-4 w-[97.5%] flex-row items-end justify-between">
          <View className="mx-5 flex-1">
            <Text className=" font-nunito-bold text-xl">
              {testCollection?.length} Tests
            </Text>
          </View>
          <View className="mx-4 flex-row">
            <TouchableOpacity className="flex-row gap-2" onPress={sortItems}>
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
            text={`No tests shown`}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 flex-col">
      <View className="mb-4 w-[97.5%] flex-row items-end justify-between">
        <View className="mx-5 flex-1">
          <Text className=" font-nunito-bold text-xl">
            {testCollection?.length} Tests
          </Text>
        </View>
        <View className="mx-4 flex-row">
          <TouchableOpacity className="flex-row gap-2" onPress={sortItems}>
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
      <View className="flex-1 flex-col">
        <FlashList
          showsVerticalScrollIndicator={false}
          data={testCollection}
          estimatedItemSize={100}
          renderItem={({ item, index }) => {
            const fullName = `${item.test.user.firstName} ${item.test.user.lastName}`;

            if (!item.test) {
              return (
                <SafeAreaView className="flex-1">
                  <View className="my-5 h-[50%] w-[90%] flex-col justify-between self-center">
                    <View className="my-7">
                      <SkeletonLoader
                        isCircular={true}
                        width={"100%"}
                        height={50}
                      />
                    </View>
                    <View className="my-7">
                      <SkeletonLoader
                        isCircular={true}
                        width={"100%"}
                        height={50}
                      />
                    </View>
                  </View>
                </SafeAreaView>
              );
            }

            return (
              <TouchableOpacity
                key={index}
                onPress={goToTestDetailsScreen(item.test.id)}
              >
                <ViewAllScreenTestCard
                  imageSource={{ uri: item.test.imageUrl }}
                  title={item.test.title}
                  questions={item.test.questions.length}
                  date={new Date(item.test.createdAt)}
                  plays={0}
                  userImageSource={{
                    uri:
                      item.test.user.imageUrl ??
                      "https://example.com/dummy-image.jpg",
                  }}
                  userName={fullName}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

import * as React from "react";
import { View, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import HomeTestDisplayCard from "../HomeTestDisplayCard";
import SectionHeader from "../headers/SectionHeader";
import { trpc } from "../../utils/trpc";
import type { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { SkeletonLoader } from "../loaders/SkeletonLoader";
import HomeEmptyTest from "../home-empty-section/EmptyTest";

const DiscoverHomeSection: FC = () => {
  const { data } = trpc.test.getDiscoverTests.useQuery({ amountOfTests: 5 });

  const navigation = useNavigation();

  const goToTestDetailsScreen = (testId: string) => () => {
    navigation.navigate("TestDetails", {
      testId,
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
        <HomeEmptyTest />
      </SafeAreaView>
    );
  }

  return (
    <View>
      <SectionHeader
        title={"Discover Tests"}
        hasViewAll={true}
        onViewAllPress={() =>
          navigation.navigate("ViewAll", { fetchedData: "discoverTests" })
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
            <TouchableOpacity onPress={goToTestDetailsScreen(item.id)}>
              <HomeTestDisplayCard
                imageSource={{ uri: item.imageUrl }}
                title={item.title}
                questions={item.questions.length}
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

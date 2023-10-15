import React from "react";
import { Image, View, Dimensions } from "react-native";
import { RootStackScreenProps } from "../types";
import { trpc } from "../utils/trpc";
import ViewAllScreenHeader from "../components/headers/ViewAllScreenHeader";
import { CollectionTestHeaderAndContent } from "../components/collection-details/CollectionTestHeaderAndContent";
import { SkeletonLoader } from "../components/loaders/SkeletonLoader";
import { ReusableHeader } from "../components/headers/ReusableHeader";
import SearchIcon from "../icons/SearchIcon";
import useGoBack from "../hooks/useGoBack";
import { SafeAreaView } from "react-native-safe-area-context";

export const CollectionDetailsScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"CollectionDetails">) => {
  const { height, width } = Dimensions.get("window");
  const goBack = useGoBack();
  const { collectionId } = route.params;

  const { data: collectionDetails } =
    trpc.collection.getByCollectionId.useQuery({
      collectionId,
    });

  const goToTestDetailsScreen = (testId: string) => () => {
    navigation.navigate("TestDetails", { testId });
  };

  if (!collectionDetails) {
    return (
      <>
        <SafeAreaView
          className="flex-1"
          style={{ height: height, width: width }}
        >
          <ReusableHeader
            screenName={""}
            optionIcon={<SearchIcon />}
            handleExit={goBack}
          />
          <SafeAreaView className="flex-1">
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
        </SafeAreaView>
      </>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 flex-col items-center"
      style={{ height: height, width: width }}
    >
      <ViewAllScreenHeader title={collectionDetails.title} />
      <Image
        className="h-[30%] w-[90%] rounded-2xl"
        source={{ uri: collectionDetails.imageUrl }}
      />
      <CollectionTestHeaderAndContent
        collectionId={collectionDetails.id}
        goToTestDetailsScreen={goToTestDetailsScreen}
      />
    </SafeAreaView>
  );
};

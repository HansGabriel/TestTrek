import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import useGoBack from "../hooks/useGoBack";
import { RootStackScreenProps } from "../types";
import SearchComponent from "../components/search/SearchComponent";
import { trpc } from "../utils/trpc";
import useImageStore from "../stores/useImageStore";

import type { FC } from "react";
import { SkeletonLoader } from "../components/loaders/SkeletonLoader";
import { ReusableHeader } from "../components/headers/ReusableHeader";

export const AddCoverImageScreen: FC<RootStackScreenProps<"AddCoverImage">> = ({
  route,
}) => {
  const { query, type } = route.params;
  const goBack = useGoBack();
  const setImage = useImageStore((state) => state.setImage);
  const setQuestionImage = useImageStore((state) => state.setQuestionImage);
  const setReviewerImage = useImageStore((state) => state.setReviewerImage);
  const setCollectionImage = useImageStore((state) => state.setCollectionImage);
  const setEditCollectionImage = useImageStore(
    (state) => state.setEditCollectionImage,
  );

  const [searchTerm, setSearchTerm] = useState<string>(query);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const { data: imagesQuery } = trpc.image.getImagesQuery.useQuery({
    query: searchTerm,
  });

  const handleImageSelect = (image: string) => {
    Alert.alert(
      "Set Cover Image",
      "Are you sure you want to set this image as your cover image?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Set",
          onPress: () => {
            const settingFunction =
              type === "test"
                ? setImage
                : type === "collection"
                ? setCollectionImage
                : type === "editCollection"
                ? setEditCollectionImage
                : type === "reviewer"
                ? setReviewerImage
                : setQuestionImage;
            settingFunction(image);
            goBack();
          },
        },
      ],
    );
  };

  if (!imagesQuery) {
    return (
      <SafeAreaView className="flex-1">
        <ReusableHeader
          screenName={"Add Cover Image"}
          backIcon={<Feather name="x" size={24} color="#BDBDBD" />}
          handleExit={goBack}
        />
        <View className="self-center">
          <SearchComponent handleSearch={handleSearch} />
        </View>
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
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ReusableHeader
        screenName={"Add Cover Image"}
        backIcon={<Feather name="x" size={24} color="#BDBDBD" />}
        handleExit={goBack}
      />
      <View className="self-center">
        <SearchComponent handleSearch={handleSearch} />
      </View>

      <ScrollView className="mx-6 mt-6 " showsVerticalScrollIndicator={false}>
        <View className="flex flex-row flex-wrap">
          {imagesQuery.map((image, idx) => (
            <TouchableOpacity
              key={`${image.id}-${idx}`}
              className="mb-4 w-1/2 px-2"
              onPress={() => handleImageSelect(image.assetUrl)}
            >
              <Image
                source={{ uri: image.assetUrl }}
                className="h-32 w-full rounded-3xl border border-neutral-100"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

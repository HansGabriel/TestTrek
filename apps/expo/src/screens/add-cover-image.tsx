import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import useGoBack from "../hooks/useGoBack";
import { RootStackScreenProps } from "../types";
import SearchComponent from "../components/search/SearchComponent";
import { trpc } from "../utils/trpc";

import type { FC } from "react";

export const AddCoverImageScreen: FC<RootStackScreenProps<"AddCoverImage">> = ({
  route,
}) => {
  const { query } = route.params;
  const goBack = useGoBack();

  const [searchTerm, setSearchTerm] = useState<string>(query);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const { data: imagesQuery } = trpc.image.getImagesQuery.useQuery({
    query: searchTerm,
  });

  if (!imagesQuery) {
    return <></>;
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="mt-12">
        <View className="mx-6 flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2">
            <TouchableOpacity onPress={goBack}>
              <Feather name="x" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <Text className="font-nunito-bold text-2xl">Add Cover Image</Text>
          </View>
        </View>

        <SearchComponent handleSearch={handleSearch} />
        <ScrollView className="mx-6 mt-6" showsVerticalScrollIndicator={false}>
          <View className="flex flex-row flex-wrap">
            {imagesQuery.map((image, idx) => (
              <TouchableOpacity
                key={`${image.id}-${idx}`}
                className="mb-4 w-1/2 px-2" // Adjusted styling for two columns
              >
                <Image
                  source={{ uri: image.assetUrl }}
                  className="h-32 w-full rounded-3xl"
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

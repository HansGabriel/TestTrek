import { FontAwesome, Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import useGoBack from "../hooks/useGoBack";
import Footer from "../components/Footer";

import type { FC } from "react";

interface Props {}

export const CreateTestScreen: FC<Props> = ({}) => {
  const goBack = useGoBack();

  return (
    <>
      <View className="my-12 mx-6 flex-1">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2">
            <TouchableOpacity onPress={goBack}>
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
            <Text className="font-nunito-bold text-2xl">Create Test</Text>
          </View>
        </View>
        <ScrollView
          contentInset={{ bottom: 20 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View className="h-56 w-80 items-center justify-center rounded-3xl border-2 border-violet-600 bg-neutral-50">
            <FontAwesome name="image" size={48} color="rgba(105, 73, 255, 1)" />
            <Text className="font-nunito-bold mt-4 text-violet-600">
              Add Cover Image
            </Text>
          </View>
        </ScrollView>
      </View>
      <Footer />
    </>
  );
};
